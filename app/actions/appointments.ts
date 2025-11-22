"use server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { DogSize } from "@prisma/client";
import {
  sendAdminNewAppointmentEmail,
  sendAppointmentConfirmationEmail,
} from "@/lib/email";

export async function createAppointment(formData: FormData) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/logIn");
  }

  // ✅ Narrow required fields first
  const ownerNameRaw = formData.get("ownerName");
  const dogNameRaw = formData.get("dogName");
  const dateRaw = formData.get("date");
  const timeRaw = formData.get("time");
  const dogSizeRaw = formData.get("dogSize"); // 👈 NEW

  if (
    !ownerNameRaw ||
    typeof ownerNameRaw !== "string" ||
    !dogNameRaw ||
    typeof dogNameRaw !== "string" ||
    !dateRaw ||
    typeof dateRaw !== "string" ||
    !timeRaw ||
    typeof timeRaw !== "string" ||
    !dogSizeRaw ||
    typeof dogSizeRaw !== "string"
  ) {
    throw new Error("Missing required fields");
  }

  const ownerName = ownerNameRaw.trim();
  const dogName = dogNameRaw.trim();
  const dogBreed = (formData.get("dogBreed") as string | null)?.trim() || null;
  const notes = (formData.get("notes") as string | null)?.trim() || null;

  const dogSizeValue = dogSizeRaw.trim() as DogSize;
  if (!Object.values(DogSize).includes(dogSizeValue)) {
    throw new Error("Invalid dog size");
  }

  const baseService =
    (formData.get("baseService") as string | null) || "FULL_GROOM";

  const selectedAddOnIds = formData.getAll("addOns") as string[];

  const scheduledAt = new Date(`${dateRaw}T${timeRaw}:00`);

  const existing = await prisma.appointment.findFirst({
    where: {
      scheduledAt,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
  });

  if (existing) {
    throw new Error(
      "That time is no longer available. Please pick another slot."
    );
  }

  let basePriceCents = 6500; // Full Groom
  if (baseService === "BATH_BRUSH") basePriceCents = 4500;
  if (baseService === "PUPPY_INTRO") basePriceCents = 5500;
  if (baseService === "TIDY_TRIM") basePriceCents = 6000;

  // Get addons chosen on the booking page
  const addons = selectedAddOnIds.length
    ? await prisma.addon.findMany({
        where: { id: { in: selectedAddOnIds } },
      })
    : [];

  const addOnsTotalCents = addons.reduce(
    (sum, addon) => sum + addon.priceCents,
    0
  );

  const totalPriceCents = basePriceCents + addOnsTotalCents;

  const created = await prisma.appointment.create({
    data: {
      stackUserId: user.id,
      stackUserEmail: user.primaryEmail ?? null,
      ownerName,
      dogName,
      dogBreed,
      notes,
      dogSize: dogSizeValue, // 👈 NEW – saved to DB
      scheduledAt,
      status: "PENDING",
      basePriceCents,
      totalPriceCents,
      addons: {
        create: addons.map((addon) => ({
          addon: { connect: { id: addon.id } },
          quantity: 1,
        })),
      },
    },
  });

  const customerEmail = user.primaryEmail || null;
  if (customerEmail) {
    await sendAppointmentConfirmationEmail({
      to: customerEmail,
      ownerName,
      dogName,
      scheduledAt,
      totalPriceCents,
    });
  }

  await sendAdminNewAppointmentEmail({
    ownerName,
    dogName,
    dogBreed,
    scheduledAt,
    totalPriceCents,
    appointmentId: created.id,
    userEmail: customerEmail,
  });

  // redirect throws; no need to await
  redirect("/booking/success");
}

export async function cancelAppointment(formData: FormData) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/logIn");
  }

  const appointmentId = formData.get("appointmentId");
  if (!appointmentId || typeof appointmentId !== "string") {
    throw new Error("Missing appointment ID");
  }

  // Make sure this appointment belongs to the logged-in user
  const appt = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      stackUserId: user.id,
    },
    select: { id: true },
  });

  if (!appt) {
    throw new Error("Appointment not found");
  }

  // ✅ Just mark it as CANCELLED – don't delete it
  await prisma.appointment.update({
    where: { id: appt.id },
    data: {
      status: "CANCELLED",
    },
  });

  redirect("/myAppts");
}
