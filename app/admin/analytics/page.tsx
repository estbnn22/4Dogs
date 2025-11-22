// app/admin/analytics/page.tsx
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";

function formatCurrency(cents: number | null | undefined) {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

function formatNumber(n: number | null | undefined) {
  return (n ?? 0).toLocaleString("en-US");
}

export default async function AdminAnalyticsPage() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  // --- Date helpers for "this month" ---
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  // --- DB queries in parallel ---
  const [
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    completedAppointments,
    cancelledAppointments,
    revenueAllTime,
    revenueThisMonth,
    todayAppointments,
    addonWithUsage,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: "PENDING" } }),
    prisma.appointment.count({ where: { status: "CONFIRMED" } }),
    prisma.appointment.count({ where: { status: "COMPLETED" } }),
    prisma.appointment.count({ where: { status: "CANCELLED" } }),

    prisma.appointment.aggregate({
      _sum: { totalPriceCents: true },
    }),

    prisma.appointment.aggregate({
      _sum: { totalPriceCents: true },
      where: {
        scheduledAt: {
          gte: startOfMonth,
        },
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
    }),

    prisma.appointment.count({
      where: {
        scheduledAt: {
          gte: startOfToday,
          lt: new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    }),

    // Add-ons usage: get all addons and their appointment pivot rows
    prisma.addon.findMany({
      include: {
        appointments: true, // AppointmentAddon[]
      },
    }),
  ]);

  // Compute top add-ons by total quantity
  const addonUsage = addonWithUsage
    .map((addon) => {
      const totalQuantity = addon.appointments.reduce(
        (sum, aa) => sum + aa.quantity,
        0
      );
      return {
        id: addon.id,
        name: addon.name,
        totalQuantity,
      };
    })
    .filter((a) => a.totalQuantity > 0)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  const totalRevenueAllTime = revenueAllTime._sum.totalPriceCents ?? 0;
  const totalRevenueThisMonth = revenueThisMonth._sum.totalPriceCents ?? 0;

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Analytics
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-700">
              High-level overview of your bookings, revenue, and add-ons.
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Logged in as <span className="font-semibold">{email}</span>
          </p>
        </header>

        {/* Summary row */}
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Total Appointments
            </span>
            <span className="mt-2 text-2xl font-extrabold text-gray-900">
              {formatNumber(totalAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              All-time bookings.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pending
            </span>
            <span className="mt-2 text-2xl font-extrabold text-yellow-500">
              {formatNumber(pendingAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              Waiting for your review.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Completed
            </span>
            <span className="mt-2 text-2xl font-extrabold text-green-600">
              {formatNumber(completedAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              Successfully finished grooms.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex flex-col">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Today&apos;s Appointments
            </span>
            <span className="mt-2 text-2xl font-extrabold text-blue-600">
              {formatNumber(todayAppointments)}
            </span>
            <span className="mt-1 text-xs text-gray-500">
              Bookings scheduled for today.
            </span>
          </div>
        </section>

        {/* Revenue + Status distribution */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Revenue all-time */}
          <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Revenue (All Time)
              </span>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                {formatCurrency(totalRevenueAllTime)}
              </p>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Sum of all appointment totals (any status).
            </p>
          </div>

          {/* Revenue this month */}
          <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Revenue (This Month)
              </span>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                {formatCurrency(totalRevenueThisMonth)}
              </p>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Confirmed & completed appointments since the 1st.
            </p>
          </div>

          {/* Status distribution */}
          <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Status Breakdown
              </span>
              <div className="mt-3 space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span className="font-semibold">
                    {formatNumber(pendingAppointments)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmed</span>
                  <span className="font-semibold">
                    {formatNumber(confirmedAppointments)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-semibold">
                    {formatNumber(completedAppointments)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cancelled</span>
                  <span className="font-semibold">
                    {formatNumber(cancelledAppointments)}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-gray-400">
              Use this to quickly see how busy you are vs what needs attention.
            </p>
          </div>
        </section>

        {/* Top add-ons */}
        <section className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Top Add-Ons
            </h2>
            <span className="text-[11px] text-gray-400">
              Based on how many times each add-on has been used.
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            {addonUsage.length === 0 ? (
              <div className="px-5 py-4 text-xs text-gray-500">
                No add-on usage data yet. Once appointments with add-ons are
                created, they&apos;ll show up here.
              </div>
            ) : (
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase tracking-wide">
                      Add-On
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-500 uppercase tracking-wide">
                      Times Used
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {addonUsage.map((addon) => (
                    <tr key={addon.id} className="hover:bg-gray-50/60">
                      <td className="px-4 py-3 text-gray-900">{addon.name}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">
                        {formatNumber(addon.totalQuantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Link back to main admin home */}
        <div className="flex justify-end">
          <a href="/admin" className="text-xs text-gray-500 hover:underline">
            ← Back to admin home
          </a>
        </div>
      </div>
    </main>
  );
}
