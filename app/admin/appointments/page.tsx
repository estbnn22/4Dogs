import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { updateAppointmentStatus, deleteAppointment } from "./actions";
import { AdminStatusButtons } from "./statusButtons";
import { DeleteButton } from "./DeleteButton";
import Link from "next/link";

type RawSearchParams = {
  page?: string;
  status?: string;
  sort?: string; // CREATED_ASC | CREATED_DESC
};

type PageProps = {
  searchParams: Promise<RawSearchParams>;
};

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

function statusClasses(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "PENDING":
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

export default async function AdminAppointmentsPage(props: PageProps) {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  // Next 16: searchParams is a Promise
  const sp = (await props.searchParams) ?? {};
  const pageSize = 10;

  const statusFilter = sp.status || "ALL";
  const sortOrder = sp.sort || "CREATED_DESC";

  const rawPage = sp.page ? parseInt(sp.page, 10) : 1;
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // Build where filter
  const where: any = {};
  if (statusFilter !== "ALL") {
    where.status = statusFilter;
  }

  // Build orderBy based on sort selection
  let orderBy: any;
  switch (sortOrder) {
    case "CREATED_ASC":
      orderBy = { createdAt: "asc" };
      break;
    case "CREATED_DESC":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const totalCount = await prisma.appointment.count({ where });
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const skip = (safePage - 1) * pageSize;

  const appointments = await prisma.appointment.findMany({
    where,
    orderBy,
    skip,
    take: pageSize,
    include: {
      addons: {
        include: { addon: true },
      },
    },
  });

  const hasPrev = safePage > 1;
  const hasNext = safePage < totalPages;

  // Keep filters when paginating
  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (statusFilter && statusFilter !== "ALL") {
      params.set("status", statusFilter);
    }
    if (sortOrder && sortOrder !== "CREATED_DESC") {
      // include non-default sort
      params.set("sort", sortOrder);
    }
    return `?${params.toString()}`;
  };

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Admin · Appointments
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-700">
              Manage all appointments in one place. Filter by status and sort by
              when the booking was created.
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Logged in as <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Filters (status + sort) */}
        <div className="mb-6 bg-white rounded-2xl shadow-sm px-5 py-4">
          <form
            className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
            method="get"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </label>
              <select
                name="status"
                defaultValue={statusFilter}
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs md:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Sort by
              </label>
              <select
                name="sort"
                defaultValue={sortOrder}
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs md:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="CREATED_DESC">Newest created first</option>
                <option value="CREATED_ASC">Oldest created first</option>
              </select>
            </div>

            {/* Always reset to page 1 when changing filters */}
            <input type="hidden" name="page" value="1" />

            <div className="flex gap-2 mt-1 md:mt-0">
              <button
                type="submit"
                className="rounded-full bg-yellow-400 px-4 py-2 text-xs md:text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300"
              >
                Apply
              </button>
              {(statusFilter !== "ALL" || sortOrder !== "CREATED_DESC") && (
                <Link
                  href="/admin/appointments"
                  className="rounded-full border border-gray-200 px-4 py-2 text-xs md:text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </Link>
              )}
            </div>
          </form>
        </div>

        {totalCount === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-sm text-gray-600">
            No appointments found with the current filters.
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="sticky left-0 bg-gray-50 z-10 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Dog / Owner
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date / Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Base
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Add-Ons
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-50/60">
                        {/* Dog / Owner */}
                        <td className="sticky left-0 bg-white px-4 py-3 align-top text-sm text-gray-900">
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {appt.dogName}
                              {appt.dogBreed && (
                                <span className="text-xs font-normal text-gray-500">
                                  {" "}
                                  · {appt.dogBreed}
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {appt.ownerName}
                            </span>
                            {appt.stackUserEmail && (
                              <span className="text-[11px] text-gray-400">
                                {appt.stackUserEmail}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Date / Time */}
                        <td className="px-4 py-3 align-top text-xs text-gray-700 whitespace-nowrap">
                          {formatDateTime(appt.scheduledAt)}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3 align-top">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                              appt.status
                            )}`}
                          >
                            {appt.status.charAt(0) +
                              appt.status.slice(1).toLowerCase()}
                          </span>
                        </td>

                        {/* Base */}
                        <td className="px-4 py-3 align-top text-right text-xs text-gray-700">
                          {formatPrice(appt.basePriceCents)}
                        </td>

                        {/* Total */}
                        <td className="px-4 py-3 align-top text-right text-xs font-semibold text-gray-900">
                          {formatPrice(appt.totalPriceCents)}
                        </td>

                        {/* Add-ons */}
                        <td className="px-4 py-3 align-top text-xs text-gray-700">
                          {appt.addons.length === 0 ? (
                            <span className="text-gray-400">None</span>
                          ) : (
                            <div className="flex flex-col gap-0.5">
                              {appt.addons.slice(0, 3).map((aa) => (
                                <span key={aa.addOnId}>
                                  {aa.addon.name}
                                  {aa.quantity > 1 && ` × ${aa.quantity}`}
                                </span>
                              ))}
                              {appt.addons.length > 3 && (
                                <span className="text-[11px] text-gray-400">
                                  +{appt.addons.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 align-top text-right">
                          <div className="flex flex-col items-end gap-1">
                            {/* Status buttons / confirm / complete / cancel */}
                            <form action={updateAppointmentStatus}>
                              <input
                                type="hidden"
                                name="appointmentId"
                                value={appt.id}
                              />
                              <AdminStatusButtons status={appt.status as any} />
                            </form>

                            {/* Edit + Delete */}
                            <div className="flex gap-2 mt-1">
                              <a
                                href={`/admin/appointments/${appt.id}`}
                                className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                Edit
                              </a>

                              <DeleteButton
                                appointmentId={appt.id}
                                action={deleteAppointment}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 text-xs text-gray-600">
              <div>
                Page{" "}
                <span className="font-semibold">
                  {safePage} / {totalPages}
                </span>{" "}
                · Showing{" "}
                <span className="font-semibold">{appointments.length}</span> of{" "}
                <span className="font-semibold">{totalCount}</span> appointments
              </div>

              <div className="flex gap-2">
                <a
                  href={buildPageHref(safePage - 1)}
                  aria-disabled={!hasPrev}
                  className={`rounded-full px-3 py-1 border text-xs font-semibold ${
                    hasPrev
                      ? "border-gray-300 text-gray-800 hover:bg-gray-50"
                      : "border-gray-200 text-gray-400 pointer-events-none opacity-50"
                  }`}
                >
                  Previous
                </a>
                <a
                  href={buildPageHref(safePage + 1)}
                  aria-disabled={!hasNext}
                  className={`rounded-full px-3 py-1 border text-xs font-semibold ${
                    hasNext
                      ? "border-gray-300 text-gray-800 hover:bg-gray-50"
                      : "border-gray-200 text-gray-400 pointer-events-none opacity-50"
                  }`}
                >
                  Next
                </a>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-end mt-5">
          <Link href="/admin" className="text-xs text-gray-500 hover:underline">
            ← Back to admin home
          </Link>
        </div>
      </div>
    </main>
  );
}
