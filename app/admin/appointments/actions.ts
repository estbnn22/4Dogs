// app/admin/appointments/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";

async function requireAdmin() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/"); // or "/logIn" if you prefer
  }

  return user;
}

export async function updateAppointmentStatus(formData: FormData) {
  await requireAdmin();

  const id = formData.get("appointmentId");
  const status = formData.get("status");

  if (!id || typeof id !== "string" || !status || typeof status !== "string") {
    throw new Error("Invalid form data");
  }

  // status should be one of: PENDING | CONFIRMED | COMPLETED | CANCELLED
  await prisma.appointment.update({
    where: { id },
    data: { status: status as any },
  });

  redirect("/admin/appointments");
}

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
