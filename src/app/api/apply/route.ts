import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

const CUSTOM_FIELD_IDS = {
  project: "H1IlPBPAsEZinVaiYmFK",
  whatTried: "fAJsWvBhwSqTWDlQ8BCg",
  budget: "RtcVHrV3vZo0Pxdx17fz",
  timeline: "hFh8kY5XyojVbDsmakhb",
  route: "vRhYFhhwHSvyRzu404BN",
  submittedAt: "rRuYgzXLv1PZf7GZfZD7",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      project,
      tried,
      budget,
      timeline,
      route,
    } = body;

    if (!firstName || !lastName || !email || !budget || !timeline || !route) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tags = [
      "source-apply-form",
      `route-${route}`,
      `budget-${budget.replace(/[^a-z0-9]/gi, "").toLowerCase()}`,
      `timeline-${timeline}`,
    ];

    const intakeNote = [
      `Intake Form Submission`,
      ``,
      `Project: ${project || "(not provided)"}`,
      `Tried: ${tried || "(not provided)"}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      `Routed to: ${route === "discovery" ? "Free Discovery Call" : "Paid Build Session"}`,
    ].join("\n");

    const customFields = [
      { id: CUSTOM_FIELD_IDS.project, value: project || "" },
      { id: CUSTOM_FIELD_IDS.whatTried, value: tried || "" },
      { id: CUSTOM_FIELD_IDS.budget, value: budget },
      { id: CUSTOM_FIELD_IDS.timeline, value: timeline },
      { id: CUSTOM_FIELD_IDS.route, value: route },
      { id: CUSTOM_FIELD_IDS.submittedAt, value: new Date().toISOString() },
    ];

    let contactId: string | undefined;

    // Search for existing contact by email
    const searchRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/?locationId=${GHL_LOCATION_ID}&query=${encodeURIComponent(
        email
      )}&limit=1`,
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
      // Update with latest details + custom fields
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
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
          customFields,
        }),
      });
    } else {
      // Create new
      const createBody: Record<string, unknown> = {
        locationId: GHL_LOCATION_ID,
        firstName,
        lastName,
        email,
        source: "Website Apply Form",
        customFields,
      };
      if (phone) createBody.phone = phone;

      const createRes = await fetch(
        "https://services.leadconnectorhq.com/contacts/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createBody),
        }
      );

      const createData = await createRes.json();
      if (!createRes.ok) {
        console.error("[apply] contact create failed", createRes.status, createData);
        return NextResponse.json(
          { error: "Failed to create contact", details: createData },
          { status: 500 }
        );
      }
      contactId = createData.contact?.id;
    }

    if (!contactId) {
      return NextResponse.json(
        { error: "No contact ID obtained" },
        { status: 500 }
      );
    }

    // Add tags
    await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      }
    );

    // Add intake note
    await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: intakeNote }),
      }
    );

    return NextResponse.json({ success: true, contactId, route });
  } catch (error) {
    console.error("[apply] error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
