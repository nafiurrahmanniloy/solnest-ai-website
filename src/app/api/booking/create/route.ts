import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID!;
const GHL_BUILD_SESSION_CALENDAR_ID = process.env.GHL_BUILD_SESSION_CALENDAR_ID;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      notes,
      selectedSlot,
      calendar, // "build" for paid Build Session
      durationMinutes,
      stripeSessionId,
    } = body;

    if (!firstName || !lastName || !email || !selectedSlot) {
      return NextResponse.json(
        { error: "firstName, lastName, email, and selectedSlot are required" },
        { status: 400 }
      );
    }

    const isBuildSession = calendar === "build";
    const calendarId =
      isBuildSession && GHL_BUILD_SESSION_CALENDAR_ID
        ? GHL_BUILD_SESSION_CALENDAR_ID
        : GHL_CALENDAR_ID;
    const slotMinutes = durationMinutes || (isBuildSession ? 60 : 30);

    const contactBody: Record<string, string> = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      source: isBuildSession ? "Website Build Session (paid)" : "Website Booking",
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
    console.log("[booking] contact search", {
      status: searchRes.status,
      found: searchData.contacts?.length || 0,
    });

    if (searchRes.ok && searchData.contacts?.length > 0) {
      contactId = searchData.contacts[0].id;
      // Update existing contact with latest details
      const updateRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/${contactId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone: phone || undefined,
          }),
        }
      );
      if (!updateRes.ok) {
        const updateErr = await updateRes.text();
        console.warn("[booking] contact update failed (non-fatal)", updateRes.status, updateErr);
      }
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
        console.error("[booking] contact create failed", contactRes.status, contactData);
        return NextResponse.json(
          { error: "Failed to create contact", status: contactRes.status, details: contactData },
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
    const endTime = new Date(startTime.getTime() + slotMinutes * 60 * 1000);
    const titlePrefix = isBuildSession ? "Build Session" : "Strategy Call";

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
          calendarId,
          locationId: GHL_LOCATION_ID,
          contactId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          title: `${titlePrefix} — ${firstName} ${lastName}`,
          appointmentStatus: "confirmed",
          assignedUserId: "pmvjtEanFSvXlw008HKt",
        }),
      }
    );

    const appointmentData = await appointmentRes.json();

    if (!appointmentRes.ok) {
      console.error("[booking] appointment create failed", appointmentRes.status, appointmentData);
      return NextResponse.json(
        { error: "Failed to create appointment", status: appointmentRes.status, details: appointmentData },
        { status: 500 }
      );
    }

    const appointmentId = appointmentData.id || appointmentData.event?.id;

    // Tag based on calendar type (non-fatal)
    if (contactId) {
      const tagsToAdd = isBuildSession
        ? ["paid-build-session"]
        : ["booked-discovery-call"];
      if (stripeSessionId) tagsToAdd.push(`stripe-${stripeSessionId.slice(0, 14)}`);
      try {
        await fetch(
          `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GHL_API_KEY}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tags: tagsToAdd }),
          }
        );
      } catch (tagErr) {
        console.warn("[booking] tag add failed (non-fatal)", tagErr);
      }
    }

    // Attach the bottleneck note to the contact (non-fatal if it fails)
    if (notes && contactId) {
      try {
        await fetch(
          `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GHL_API_KEY}`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              body: `Biggest operational bottleneck:\n\n${notes}`,
              userId: "pmvjtEanFSvXlw008HKt",
            }),
          }
        );
      } catch (noteErr) {
        console.warn("[booking] contact note attach failed (non-fatal)", noteErr);
      }
    }

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointmentId,
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
