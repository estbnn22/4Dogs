// app/myAppts/page.tsx
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cancelAppointment } from "../actions/appointments";
import { CancelAppointmentButton } from "./cancelButton";

function formatDateTime(date: Date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function MyAppointmentsPage() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/logIn");
  }

  const now = new Date();

  const appointments = await prisma.appointment.findMany({
    where: { stackUserId: user.id },
    orderBy: { scheduledAt: "asc" },
    include: {
      addons: {
        include: { addon: true },
      },
    },
  });

  // Upcoming = in the future AND not cancelled/completed
  const upcoming = appointments.filter(
    (appt) =>
      appt.scheduledAt >= now &&
      (appt.status === "PENDING" || appt.status === "CONFIRMED")
  );

  // Past = already happened OR completed/cancelled
  const past = appointments.filter(
    (appt) =>
      appt.scheduledAt < now ||
      appt.status === "COMPLETED" ||
      appt.status === "CANCELLED"
  );

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My Appointments
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-700">
            See your upcoming visits and past grooms. You can cancel or rebook
            easily.
          </p>
        </header>

        {/* Upcoming */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Upcoming Appointments
          </h2>

          {upcoming.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600">
              You don&apos;t have any upcoming appointments yet.
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {appt.dogName}
                        {appt.dogBreed && (
                          <span className="text-xs font-normal text-gray-500">
                            {" "}
                            · {appt.dogBreed}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDateTime(appt.scheduledAt)}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>
                        Total:{" "}
                        <span className="font-semibold text-gray-900">
                          {formatPrice(appt.totalPriceCents)}
                        </span>
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Status:{" "}
                        {appt.status.charAt(0) +
                          appt.status.slice(1).toLowerCase()}
                      </p>
                    </div>
                  </div>

                  {appt.addons.length > 0 && (
                    <div className="border-t border-yellow-100 pt-2">
                      <p className="text-[11px] font-semibold text-gray-700 mb-1">
                        Add-Ons
                      </p>
                      <ul className="flex flex-wrap gap-2 text-[11px] text-gray-700">
                        {appt.addons.map((aa) => (
                          <li
                            key={aa.addOnId}
                            className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1"
                          >
                            {aa.addon.name}
                            {aa.quantity > 1 && ` × ${aa.quantity}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cancel button */}
                  <div className="pt-2 border-t border-gray-50 flex justify-end">
                    <CancelAppointmentButton
                      appointmentId={appt.id}
                      action={cancelAppointment}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Past Appointments
          </h2>

          {past.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600">
              Once you complete an appointment, it will show up here so you can
              rebook easily.
            </div>
          ) : (
            <div className="space-y-4">
              {past
                .slice()
                .reverse() // show most recent first
                .map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {appt.dogName}
                          {appt.dogBreed && (
                            <span className="text-xs font-normal text-gray-500">
                              {" "}
                              · {appt.dogBreed}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDateTime(appt.scheduledAt)}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Status:{" "}
                          {appt.status.charAt(0) +
                            appt.status.slice(1).toLowerCase()}
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <p>
                          Total:{" "}
                          <span className="font-semibold text-gray-900">
                            {formatPrice(appt.totalPriceCents)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {appt.addons.length > 0 && (
                      <div className="border-t border-yellow-100 pt-2">
                        <p className="text-[11px] font-semibold text-gray-700 mb-1">
                          Add-Ons
                        </p>
                        <ul className="flex flex-wrap gap-2 text-[11px] text-gray-700">
                          {appt.addons.map((aa) => (
                            <li
                              key={aa.addOnId}
                              className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1"
                            >
                              {aa.addon.name}
                              {aa.quantity > 1 && ` × ${aa.quantity}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rebook button */}
                    <div className="pt-2 border-t border-gray-50 flex justify-end">
                      <Link
                        href={{
                          pathname: "/booking",
                          query: {
                            ownerName: appt.ownerName,
                            dogName: appt.dogName,
                            dogBreed: appt.dogBreed ?? "",
                            notes: appt.notes ?? "",
                            dogSize: appt.dogSize,
                            addOns: appt.addons.map((aa) => aa.addOnId),
                          },
                        }}
                        className="inline-flex items-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-yellow-300"
                      >
                        Rebook this service
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
