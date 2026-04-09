import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const TIMEZONE = "America/Los_Angeles";

// Calendar rules matching GHL config
const SLOT_DURATION_MIN = 30;
const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon-Fri
const START_HOUR = 8; // 8 AM PT
const END_HOUR = 17; // 5 PM PT

// PDT = UTC-7, PST = UTC-8. Use -7 for PDT (current as of April)
const PT_OFFSET_HOURS = -7;

interface GHLEvent {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
}

function generateSlotsForDate(dateStr: string): string[] {
  const slots: string[] = [];

  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    for (let min = 0; min < 60; min += SLOT_DURATION_MIN) {
      // Create time in UTC that corresponds to the PT hour
      const utcHour = hour - PT_OFFSET_HOURS; // e.g., 8 AM PDT = 15:00 UTC
      const iso = `${dateStr}T${String(utcHour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00.000Z`;
      slots.push(iso);
    }
  }

  return slots;
}

function isSlotBooked(slotStart: string, events: GHLEvent[]): boolean {
  const slotStartMs = new Date(slotStart).getTime();
  const slotEndMs = slotStartMs + SLOT_DURATION_MIN * 60 * 1000;

  return events.some((event) => {
    if (event.status === "cancelled") return false;
    const eventStart = new Date(event.startTime).getTime();
    const eventEnd = new Date(event.endTime).getTime();
    return slotStartMs < eventEnd && slotEndMs > eventStart;
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "startDate and endDate required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    // Fetch existing events from GHL (wide range to catch edge cases)
    const startMs = new Date(startDate + "T00:00:00.000Z").getTime();
    const endMs = new Date(endDate + "T23:59:59.000Z").getTime();

    const eventsRes = await fetch(
      `https://services.leadconnectorhq.com/calendars/events?locationId=${GHL_LOCATION_ID}&calendarId=${GHL_CALENDAR_ID}&startTime=${startMs}&endTime=${endMs}`,
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          Version: "2021-04-15",
        },
      }
    );

    const eventsData = await eventsRes.json();
    const events: GHLEvent[] = eventsData.events || [];

    // Generate available slots for each day in the range
    const slots: Record<string, string[]> = {};
    const now = new Date();
    const minBookTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Iterate through each date in the range
    const currentDate = new Date(startDate + "T12:00:00.000Z"); // noon UTC to avoid date shift
    const endDateObj = new Date(endDate + "T12:00:00.000Z");

    while (currentDate <= endDateObj) {
      const dayOfWeek = currentDate.getUTCDay();
      const dateKey = currentDate.toISOString().split("T")[0];

      if (AVAILABLE_DAYS.includes(dayOfWeek)) {
        const daySlots = generateSlotsForDate(dateKey);

        const availableSlots = daySlots.filter((slot) => {
          const slotTime = new Date(slot);
          if (slotTime <= minBookTime) return false;
          return !isSlotBooked(slot, events);
        });

        if (availableSlots.length > 0) {
          slots[dateKey] = availableSlots;
        }
      }

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
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
