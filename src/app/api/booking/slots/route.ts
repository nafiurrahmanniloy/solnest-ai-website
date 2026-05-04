import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID!;
const GHL_BUILD_SESSION_CALENDAR_ID = process.env.GHL_BUILD_SESSION_CALENDAR_ID;
const RYAN_USER_ID = "pmvjtEanFSvXlw008HKt";
const TIMEZONE = "America/Los_Angeles";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const calendar = searchParams.get("calendar"); // "build" for paid Build Session

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "startDate and endDate required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const calendarId =
    calendar === "build" && GHL_BUILD_SESSION_CALENDAR_ID
      ? GHL_BUILD_SESSION_CALENDAR_ID
      : GHL_CALENDAR_ID;

  try {
    const startMs = new Date(startDate + "T00:00:00.000Z").getTime();
    const endMs = new Date(endDate + "T23:59:59.000Z").getTime();

    const url = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startMs}&endDate=${endMs}&timezone=${encodeURIComponent(TIMEZONE)}&userId=${RYAN_USER_ID}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: "2021-04-15",
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("GHL free-slots error:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to fetch available slots" },
        { status: 500 }
      );
    }

    const data = await res.json();

    // GHL returns: { "YYYY-MM-DD": { slots: ["ISO", ...] }, traceId, ... }
    const slots: Record<string, string[]> = {};
    const minBookTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    for (const [key, value] of Object.entries(data)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) continue;
      const daySlots = (value as { slots?: string[] }).slots || [];
      const filtered = daySlots.filter((s) => new Date(s) > minBookTime);
      if (filtered.length > 0) slots[key] = filtered;
    }

    return NextResponse.json({ slots, timezone: TIMEZONE });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
