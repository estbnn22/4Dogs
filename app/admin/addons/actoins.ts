// app/admin/addons/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";

async function requireAdmin() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  return user;
}

function parsePriceToCents(raw: FormDataEntryValue | null): number {
  if (!raw || typeof raw !== "string") {
    throw new Error("Missing price");
  }
  const value = parseFloat(raw);
  if (Number.isNaN(value) || value < 0) {
    throw new Error("Invalid price");
  }
  return Math.round(value * 100);
}

export async function createAddon(formData: FormData) {
  await requireAdmin();

  const nameRaw = formData.get("name");
  const descriptionRaw = formData.get("description");
  const priceCents = parsePriceToCents(formData.get("price"));
  const active = formData.get("active") === "on";

  if (!nameRaw || typeof nameRaw !== "string") {
    throw new Error("Name is required");
  }

  const name = nameRaw.trim();
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0
      ? descriptionRaw.trim()
      : null;

  await prisma.addon.create({
    data: {
      name,
      description,
      priceCents,
      active,
    },
  });

  redirect("/admin/addons");
}

export async function updateAddon(formData: FormData) {
  await requireAdmin();

  const idRaw = formData.get("addonId");
  const nameRaw = formData.get("name");
  const descriptionRaw = formData.get("description");
  const priceCents = parsePriceToCents(formData.get("price"));
  const active = formData.get("active") === "on";

  if (!idRaw || typeof idRaw !== "string") {
    throw new Error("Missing add-on ID");
  }
  if (!nameRaw || typeof nameRaw !== "string") {
    throw new Error("Name is required");
  }

  const name = nameRaw.trim();
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0
      ? descriptionRaw.trim()
      : null;

  await prisma.addon.update({
    where: { id: idRaw },
    data: {
      name,
      description,
      priceCents,
      active,
    },
  });

  redirect("/admin/addons");
}

export async function deleteAddon(formData: FormData) {
  await requireAdmin();

  const idRaw = formData.get("addonId");
  if (!idRaw || typeof idRaw !== "string") {
    throw new Error("Missing add-on ID");
  }

  const addonId = idRaw;

  // If you have AppointmentAddon rows, remove them first
  await prisma.appointmentAddon.deleteMany({
    where: { addOnId: addonId },
  });

  await prisma.addon.delete({
    where: { id: addonId },
  });

  redirect("/admin/addons");
}
