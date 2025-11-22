// app/admin/addons/page.tsx
import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin";
import { createAddon, updateAddon, deleteAddon } from "./actoins";
import { DeleteAddonButton } from "./DeleteButton";

function formatPriceInput(cents: number) {
  return (cents / 100).toFixed(2);
}

export default async function AdminAddonsPage() {
  const user = await stackServerApp.getUser();
  const email = user?.primaryEmail ?? null;

  if (!user || !email || !isAdminEmail(email)) {
    redirect("/");
  }

  const addons = await prisma.addon.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Manage Add-Ons
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-700">
              Create, update, or remove optional services like nail trims, teeth
              brushing, and more.
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Logged in as <span className="font-semibold">{email}</span>
          </p>
        </header>

        {/* Create new add-on */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            New Add-On
          </h2>
          <form
            action={createAddon}
            className="bg-white rounded-2xl shadow-sm px-5 py-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="Nail Trim"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-700">
                  Price (USD)
                </label>
                <input
                  name="price"
                  required
                  placeholder="10.00"
                  inputMode="decimal"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col justify-center gap-1">
                <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="active"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 accent-yellow-500"
                  />
                  Active (available for customers)
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">
                Description (optional)
              </label>
              <textarea
                name="description"
                rows={2}
                placeholder="Quick nail trim to keep paws tidy."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300"
              >
                Create Add-On
              </button>
            </div>
          </form>
        </section>

        {/* Existing add-ons */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Existing Add-Ons
            </h2>
            <span className="text-[11px] text-gray-400">
              {addons.length} add-on{addons.length === 1 ? "" : "s"} total
            </span>
          </div>

          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            {addons.length === 0 ? (
              <div className="px-5 py-4 text-xs text-gray-500">
                No add-ons created yet. Use the form above to add your first
                one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase tracking-wide">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500 uppercase tracking-wide">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-500 uppercase tracking-wide">
                        Price
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-500 uppercase tracking-wide">
                        Active
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-500 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {addons.map((addon) => (
                      <tr key={addon.id} className="hover:bg-gray-50/60">
                        <td className="px-4 py-3 align-top">
                          <form
                            action={updateAddon}
                            className="flex flex-col gap-1"
                          >
                            <input
                              type="hidden"
                              name="addonId"
                              value={addon.id}
                            />
                            <input
                              name="name"
                              defaultValue={addon.name}
                              className="rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                          </form>
                        </td>

                        <td className="px-4 py-3 align-top">
                          <form action={updateAddon}>
                            <input
                              type="hidden"
                              name="addonId"
                              value={addon.id}
                            />
                            <textarea
                              name="description"
                              defaultValue={addon.description ?? ""}
                              rows={2}
                              className="w-full rounded-lg border border-gray-200 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                          </form>
                        </td>

                        <td className="px-4 py-3 align-top text-right">
                          <form action={updateAddon} className="inline-flex">
                            <input
                              type="hidden"
                              name="addonId"
                              value={addon.id}
                            />
                            <input
                              name="price"
                              defaultValue={formatPriceInput(addon.priceCents)}
                              inputMode="decimal"
                              className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-xs text-right focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            />
                          </form>
                        </td>

                        <td className="px-4 py-3 align-top text-center">
                          <form
                            action={updateAddon}
                            className="inline-flex items-center justify-center"
                          >
                            <input
                              type="hidden"
                              name="addonId"
                              value={addon.id}
                            />
                            <input
                              type="checkbox"
                              name="active"
                              defaultChecked={addon.active}
                              className="h-4 w-4 rounded border-gray-300 accent-yellow-500"
                            />
                            {/* Hidden inputs to make sure name/price/description don't get wiped when just toggling active */}
                            <input
                              type="hidden"
                              name="name"
                              defaultValue={addon.name}
                            />
                            <input
                              type="hidden"
                              name="description"
                              defaultValue={addon.description ?? ""}
                            />
                            <input
                              type="hidden"
                              name="price"
                              defaultValue={formatPriceInput(addon.priceCents)}
                            />
                            <button
                              type="submit"
                              className="ml-2 text-[11px] text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline"
                            >
                              Save
                            </button>
                          </form>
                        </td>

                        <td className="px-4 py-3 align-top text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Combined edit/save form for main fields */}
                            <form
                              action={updateAddon}
                              className="hidden md:inline-flex items-center gap-1"
                            >
                              <input
                                type="hidden"
                                name="addonId"
                                value={addon.id}
                              />
                              <input
                                type="hidden"
                                name="name"
                                defaultValue={addon.name}
                              />
                              <input
                                type="hidden"
                                name="description"
                                defaultValue={addon.description ?? ""}
                              />
                              <input
                                type="hidden"
                                name="price"
                                defaultValue={formatPriceInput(
                                  addon.priceCents
                                )}
                              />
                              <input
                                type="hidden"
                                name="active"
                                defaultValue={addon.active ? "on" : ""}
                              />
                              <button
                                type="submit"
                                className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                              >
                                Save
                              </button>
                            </form>

                            <DeleteAddonButton
                              addonId={addon.id}
                              action={deleteAddon}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <div className="mt-6 flex justify-end">
          <a href="/admin" className="text-xs text-gray-500 hover:underline">
            ← Back to admin home
          </a>
        </div>
      </div>
    </main>
  );
}
