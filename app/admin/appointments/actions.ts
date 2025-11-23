// app/admin/appointments/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import {
  sendAppointmentStatusEmail,
  sendAdminAppointmentCancelledEmail,
} from "@/lib/email";

type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

async function requireAdmin() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  return user;
}

// ✅ Called from the status buttons in the table
export async function updateAppointmentStatus(formData: FormData) {
  await requireAdmin();

  const id = formData.get("appointmentId");
  const statusRaw = formData.get("status");

  if (!id || typeof id !== "string") {
    throw new Error("Missing appointment ID");
  }

  if (!statusRaw || typeof statusRaw !== "string") {
    throw new Error("Missing status");
  }

  const validStatuses: AppointmentStatus[] = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ];

  if (!validStatuses.includes(statusRaw as AppointmentStatus)) {
    throw new Error("Invalid status value");
  }

  const newStatus = statusRaw as AppointmentStatus;

  const existing = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Appointment not found");
  }

  // If nothing changed, just go back
  if (existing.status === newStatus) {
    redirect("/admin/appointments");
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status: newStatus },
  });

  const userEmail = updated.stackUserEmail; // stored at booking time

  // 📧 Email to user (for CONFIRMED / COMPLETED / CANCELLED)
  if (userEmail && newStatus !== "PENDING") {
    const emailStatus =
      newStatus === "CONFIRMED" || newStatus === "COMPLETED"
        ? newStatus
        : "CANCELLED";

    await sendAppointmentStatusEmail({
      to: userEmail,
      status: emailStatus,
      ownerName: updated.ownerName,
      dogName: updated.dogName,
      scheduledAt: updated.scheduledAt,
      totalPriceCents: updated.totalPriceCents,
    });
  }

  // 📧 Email to admin if cancelled
  if (newStatus === "CANCELLED") {
    await sendAdminAppointmentCancelledEmail({
      ownerName: updated.ownerName,
      dogName: updated.dogName,
      scheduledAt: updated.scheduledAt,
      appointmentId: updated.id,
    });
  }

  redirect("/admin/appointments");
}

// ✅ Edit details page (/admin/appointments/[id]) – no status/email here
export async function updateAppointment(formData: FormData) {
  await requireAdmin();

  const id = formData.get("appointmentId");
  const ownerName = formData.get("ownerName");
  const dogName = formData.get("dogName");
  const dogBreed = formData.get("dogBreed");
  const notes = formData.get("notes");
  const date = formData.get("date");
  const time = formData.get("time");

  if (
    !id ||
    typeof id !== "string" ||
    !ownerName ||
    typeof ownerName !== "string" ||
    !dogName ||
    typeof dogName !== "string" ||
    !date ||
    typeof date !== "string" ||
    !time ||
    typeof time !== "string"
  ) {
    throw new Error("Missing required fields");
  }

  const scheduledAt = new Date(`${date}T${time}:00`);

  await prisma.appointment.update({
    where: { id },
    data: {
      ownerName: ownerName.trim(),
      dogName: dogName.trim(),
      dogBreed:
        typeof dogBreed === "string" && dogBreed.trim().length > 0
          ? dogBreed.trim()
          : null,
      notes:
        typeof notes === "string" && notes.trim().length > 0
          ? notes.trim()
          : null,
      scheduledAt,
    },
  });

  redirect("/admin/appointments");
}

export async function deleteAppointment(formData: FormData) {
  await requireAdmin();

  const id = formData.get("appointmentId");

  if (!id || typeof id !== "string") {
    throw new Error("Missing appointment ID");
  }

  await prisma.appointment.delete({
    where: { id },
  });

  redirect("/admin/appointments");
}
