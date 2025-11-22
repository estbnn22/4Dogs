import Link from "next/link";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num);
}

export default async function AdminHomePage() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  // Basic stats
  const [totalAppointments, pendingAppointments, upcomingConfirmed] =
    await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({
        where: { status: "PENDING" },
      }),
      prisma.appointment.count({
        where: {
          status: "CONFIRMED",
          scheduledAt: {
            gte: new Date(),
          },
        },
      }),
    ]);

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-700">
              Manage appointments, view stats, and keep your grooming shop
              running smoothly.
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Logged in as <span className="font-semibold">{email}</span>
          </p>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Total Appointments
            </span>
            <span className="mt-2 text-2xl font-extrabold text-gray-900">
              {formatNumber(totalAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              All-time bookings in the system.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pending Approvals
            </span>
            <span className="mt-2 text-2xl font-extrabold text-yellow-500">
              {formatNumber(pendingAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              New requests waiting for confirmation.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Upcoming Confirmed
            </span>
            <span className="mt-2 text-2xl font-extrabold text-green-600">
              {formatNumber(upcomingConfirmed)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              Future appointments that are already confirmed.
            </span>
          </div>
        </section>

        {/* Navigation cards */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Manage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Appointments */}
            <Link
              href="/admin/appointments"
              className="group rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between border border-transparent hover:border-yellow-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Appointments
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    View, confirm, cancel, and edit all customer bookings in a
                    simple table.
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                  📅
                </span>
              </div>
              <span className="mt-3 text-xs font-semibold text-yellow-700 group-hover:underline inline-flex items-center gap-1">
                Go to appointments
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            {/* Dashboard / Analytics (placeholder) */}

            <Link
              href="/admin/analytics"
              className="group rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between border border-transparent hover:border-yellow-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Analytics
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Daily/weekly trends, most popular add-ons, and busy times of
                    day.
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                  📊
                </span>
              </div>
              <span className="mt-3 text-xs font-semibold text-yellow-700 group-hover:underline inline-flex items-center gap-1">
                Go to analytics
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            {/* Add-ons manager*/}
            <Link
              href="/admin/addons"
              className="group rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between border border-transparent hover:border-yellow-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Add-Ons
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Manage nail trims, teeth brushing, and other extras that
                    customers can choose.
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                  ✂️
                </span>
              </div>
              <span className="mt-3 text-xs font-semibold text-yellow-700 group-hover:underline inline-flex items-center gap-1">
                Manage add-ons
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            {/* Settings */}
            <Link
              href="/admin/settings"
              className="group rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between border border-transparent hover:border-yellow-300 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Account Settings
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    Manage your account details, such as email and password.
                  </p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                  ⚙️
                </span>
              </div>
              <span className="mt-3 text-xs font-semibold text-yellow-700 group-hover:underline inline-flex items-center gap-1">
                Go to settings
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
