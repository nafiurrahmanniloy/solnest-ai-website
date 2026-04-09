import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, notes, selectedSlot } = body;

    if (!firstName || !lastName || !email || !selectedSlot) {
      return NextResponse.json(
        { error: "firstName, lastName, email, and selectedSlot are required" },
        { status: 400 }
      );
    }

    const contactBody: Record<string, string> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      source: "Website Booking",
    };
    if (phone) contactBody.phone = phone;

    // Try to find existing contact by email
    let contactId: string | undefined;

    const searchRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(email)}&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
        },
      }
    );
    const searchData = await searchRes.json();

    if (searchRes.ok && searchData.contacts?.length > 0) {
      contactId = searchData.contacts[0].id;
    } else {
      // Create new contact
      const contactRes = await fetch(
        "https://services.leadconnectorhq.com/contacts/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactBody),
        }
      );

      const contactData = await contactRes.json();

      if (!contactRes.ok) {
        return NextResponse.json(
          {
            error: "Failed to create contact",
            searchStatus: searchRes.status,
            searchResult: searchData,
            createStatus: contactRes.status,
            createResult: contactData,
            keyPrefix: GHL_API_KEY?.substring(0, 10),
            locationId: GHL_LOCATION_ID,
          },
          { status: 500 }
        );
      }

      contactId = contactData.contact?.id;
    }

    if (!contactId) {
      return NextResponse.json(
        { error: "No contact ID obtained" },
        { status: 500 }
      );
    }

    // Create appointment
    const startTime = new Date(selectedSlot);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    const appointmentRes = await fetch(
      "https://services.leadconnectorhq.com/calendars/events/appointments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-04-15",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calendarId: GHL_CALENDAR_ID,
          locationId: GHL_LOCATION_ID,
          contactId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          title: `Strategy Call — ${firstName} ${lastName}`,
          appointmentStatus: "confirmed",
          assignedUserId: "pmvjtEanFSvXlw008HKt",
          address: "Google Meet (link will be sent via email)",
          notes: notes || "",
        }),
      }
    );

    const appointmentData = await appointmentRes.json();

    if (!appointmentRes.ok) {
      return NextResponse.json(
        { error: "Failed to create appointment", details: appointmentData },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointmentData.id || appointmentData.event?.id,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking", message: String(error) },
      { status: 500 }
    );
  }
}
