import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { createAppointment } from "../actions/appointments";
import { prisma } from "@/lib/prisma";
import { TimeSection } from "./timeSelection";

type PageProps = {
  searchParams: Promise<{
    ownerName?: string;
    dogName?: string;
    dogBreed?: string;
    notes?: string;
    // if later you add these to Appointment model, you can also prefill:
    dogSize?: string;
    baseService?: string;
    addOns?: string | string[]; // from query ?addOns=a&addOns=b
  }>;
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function BookingPage(props: PageProps) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/logIn");
  }

  const search = await props.searchParams;

  const prefillOwnerName = search.ownerName ?? "";
  const prefillDogName = search.dogName ?? "";
  const prefillDogBreed = search.dogBreed ?? "";
  const prefillNotes = search.notes ?? "";
  const prefillDogSize = search.dogSize ?? "";
  const prefillBaseService = search.baseService ?? "FULL_GROOM";

  const preselectedAddOnIds = Array.isArray(search.addOns)
    ? search.addOns
    : search.addOns
    ? [search.addOns]
    : [];

  const addons = await prisma.addon.findMany({
    where: { active: true },
    orderBy: { priceCents: "asc" },
  });

  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Book an Appointment
          </h1>
          <p className="mt-3 text-gray-700 md:text-lg">
            Tell us about your pup, pick a time, and choose any add-ons
            you&apos;d like.
          </p>
        </div>

        <form
          action={createAppointment}
          className="bg-white rounded-2xl shadow-sm p-8 space-y-8"
        >
          {/* Your Info */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Info</h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                name="ownerName"
                required
                defaultValue={prefillOwnerName}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your full name"
              />
            </div>
          </section>

          {/* Dog info */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              About Your Dog
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Dog&apos;s Name *
                </label>
                <input
                  name="dogName"
                  required
                  defaultValue={prefillDogName}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Bella"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Breed (optional)
                </label>
                <input
                  name="dogBreed"
                  defaultValue={prefillDogBreed}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Golden Retriever"
                />
              </div>
            </div>

            {/* Dog size */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Dog Size *
              </label>
              <select
                name="dogSize"
                required
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                defaultValue={prefillDogSize || ""}
              >
                <option value="" disabled>
                  Select a size
                </option>
                <option value="SMALL">Small (up to ~20 lbs)</option>
                <option value="MEDIUM">Medium (20–50 lbs)</option>
                <option value="LARGE">Large (50–80 lbs)</option>
                <option value="EXTRA_LARGE">Extra Large (80+ lbs)</option>
              </select>
              <p className="text-xs text-gray-500">
                Size helps us estimate grooming time and pricing.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                rows={3}
                defaultValue={prefillNotes}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Tell us about temperament, special needs, or coat condition."
              />
            </div>
          </section>

          {/* Service + date/time */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Service &amp; Time
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Base Service
              </label>
              <select
                name="baseService"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                defaultValue={prefillBaseService}
              >
                <option value="FULL_GROOM">Full Groom</option>
                <option value="BATH_BRUSH">Bath &amp; Brush</option>
                <option value="TIDY_TRIM">Tidy & Trim</option>
                <option value="PUPPY_INTRO">Puppy Intro Groom</option>
              </select>
              <p className="text-xs text-gray-500">
                Final pricing may vary by size and coat condition.
              </p>
            </div>

            {/* NEW: date + time with disabled booked slots */}
            <TimeSection />
          </section>

          {/* Add-ons */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Optional Add-Ons
            </h2>
            {addons.length === 0 ? (
              <p className="text-sm text-gray-500">
                No add-ons available yet. You can add them later from your
                admin.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-start gap-3 rounded-xl border border-gray-200 px-3 py-3 hover:border-yellow-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="addOns"
                      value={addon.id}
                      className="mt-1 h-4 w-4 accent-yellow-500"
                      defaultChecked={preselectedAddOnIds.includes(addon.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {addon.name}
                        </span>
                        <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                          {formatPrice(addon.priceCents)}
                        </span>
                      </div>
                      {addon.description && (
                        <p className="mt-1 text-xs text-gray-600">
                          {addon.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Submit */}
          <section className="space-y-2">
            <button
              type="submit"
              className="w-full rounded-full bg-yellow-400 py-3 text-gray-900 font-semibold shadow-sm hover:bg-yellow-300 transition"
            >
              Confirm Booking
            </button>
            <p className="text-xs text-gray-500 text-center">
              By booking, you agree to our grooming policies. Final pricing may
              vary after an in-person coat assessment.
            </p>
          </section>
        </form>
      </div>
    </main>
  );
}
