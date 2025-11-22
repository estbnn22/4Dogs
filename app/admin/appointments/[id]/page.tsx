// app/admin/appointments/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect, notFound } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { updateAppointment } from "../actions";
import { TimeSection } from "@/app/booking/timeSelection";

type PageProps = {
  params: Promise<{ id: string }>;
};

function toLocalDateTimeParts(date: Date) {
  const iso = date.toISOString(); // e.g. 2025-11-19T20:00:00.000Z
  const [d, t] = iso.split("T");
  const time = t.slice(0, 5); // HH:MM
  return { date: d, time };
}

export default async function EditAppointmentPage(props: PageProps) {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  // ⬇️ Next 16: params is a Promise, so unwrap it
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const appt = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appt) {
    notFound();
  }

  const { date, time } = toLocalDateTimeParts(appt.scheduledAt);

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6">
          Edit Appointment
        </h1>

        <form
          action={updateAppointment}
          className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
        >
          <input type="hidden" name="appointmentId" value={appt.id} />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              name="ownerName"
              defaultValue={appt.ownerName}
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Dog Name
            </label>
            <input
              name="dogName"
              defaultValue={appt.dogName}
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Breed (optional)
            </label>
            <input
              name="dogBreed"
              defaultValue={appt.dogBreed ?? ""}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Notes (optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={appt.notes ?? ""}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <TimeSection />

          <div className="flex items-center justify-between pt-2">
            <a
              href="/admin/appointments"
              className="text-xs text-gray-500 hover:underline"
            >
              ← Back to all appointments
            </a>
            <button
              type="submit"
              className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
