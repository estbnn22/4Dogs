// app/api/availability/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date"); // e.g. "2025-11-21"

  if (!date) {
    return NextResponse.json({ taken: [] });
  }

  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);

  const appts = await prisma.appointment.findMany({
    where: {
      scheduledAt: {
        gte: start,
        lt: end,
      },
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    select: { scheduledAt: true },
  });

  const taken = appts.map((a) => {
    const d = a.scheduledAt;
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`; // "09:00", "11:00", etc.
  });

  return NextResponse.json({ taken });
}
