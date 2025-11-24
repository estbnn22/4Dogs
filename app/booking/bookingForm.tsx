"use client";

import { useMemo, useState } from "react";
import { createAppointment } from "../actions/appointments";
import { TimeSection } from "./timeSelection";

type Addon = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
};

type Props = {
  initialOwnerName: string;
  initialDogName: string;
  initialDogBreed: string;
  initialNotes: string;
  initialDogSize: string;
  initialBaseService: string;
  addons: Addon[];
  preselectedAddOnIds: string[];
};

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDogSize(size: string | null | undefined) {
  switch (size) {
    case "SMALL":
      return "Small (up to ~20 lbs)";
    case "MEDIUM":
      return "Medium (20–50 lbs)";
    case "LARGE":
      return "Large (50–80 lbs)";
    case "EXTRA_LARGE":
      return "Extra Large (80+ lbs)";
    default:
      return "Not selected";
  }
}

function formatBaseService(service: string | null | undefined) {
  switch (service) {
    case "FULL_GROOM":
      return "Full Groom";
    case "BATH_BRUSH":
      return "Bath & Brush";
    case "TIDY_TRIM":
      return "Tidy & Trim";
    case "PUPPY_INTRO":
      return "Puppy Intro Groom";
    default:
      return "Not selected";
  }
}

// Optional: rough display prices for base services (for an "estimated total")
const baseServiceDisplayPrices: Record<string, number> = {
  FULL_GROOM: 6000,
  BATH_BRUSH: 4000,
  TIDY_TRIM: 5000,
  PUPPY_INTRO: 3500,
};

export default function BookingForm({
  initialOwnerName,
  initialDogName,
  initialDogBreed,
  initialNotes,
  initialDogSize,
  initialBaseService,
  addons,
  preselectedAddOnIds,
}: Props) {
  const [ownerName, setOwnerName] = useState(initialOwnerName);
  const [dogName, setDogName] = useState(initialDogName);
  const [dogBreed, setDogBreed] = useState(initialDogBreed);
  const [notes, setNotes] = useState(initialNotes);
  const [dogSize, setDogSize] = useState(initialDogSize);
  const [baseService, setBaseService] = useState(initialBaseService);
  const [selectedAddOnIds, setSelectedAddOnIds] =
    useState<string[]>(preselectedAddOnIds);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedAddons = useMemo(
    () => addons.filter((a) => selectedAddOnIds.includes(a.id)),
    [addons, selectedAddOnIds]
  );

  const addOnsSubtotalCents = useMemo(
    () => selectedAddons.reduce((sum, a) => sum + a.priceCents, 0),
    [selectedAddons]
  );

  const baseServicePriceCents = baseServiceDisplayPrices[baseService] ?? 0;
  const estimatedTotalCents = baseServicePriceCents + addOnsSubtotalCents;

  return (
    <form
      action={createAppointment}
      className="bg-white rounded-2xl shadow-sm p-8 space-y-8"
    >
      {/* Grid: left = form sections, right = summary on desktop */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] items-start">
        {/* LEFT: FORM FIELDS */}
        <div className="space-y-8">
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
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
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
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
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
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
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
                value={dogSize}
                onChange={(e) => setDogSize(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                value={baseService}
                onChange={(e) => setBaseService(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

            {/* Date + time picker */}
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
                      checked={selectedAddOnIds.includes(addon.id)}
                      onChange={() => toggleAddOn(addon.id)}
                      className="mt-1 h-4 w-4 accent-yellow-500"
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
        </div>

        {/* RIGHT: LIVE ORDER SUMMARY */}
        <aside className="bg-white rounded-2xl shadow-sm p-6 h-fit lg:sticky lg:top-24 border border-yellow-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-800">
            <div className="flex justify-between">
              <span className="font-medium">Base Service</span>
              <span>{formatBaseService(baseService)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Dog Size</span>
              <span>{formatDogSize(dogSize)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Dog&apos;s Name</span>
              <span className="truncate max-w-[140px]">{dogName || "—"}</span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="font-medium mb-1">Add-Ons</p>
              {selectedAddons.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No add-ons selected yet.
                </p>
              ) : (
                <ul className="space-y-1 text-xs">
                  {selectedAddons.map((addon) => (
                    <li key={addon.id} className="flex justify-between gap-2">
                      <span>{addon.name}</span>
                      <span className="font-semibold">
                        {formatPrice(addon.priceCents)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Base Service (est.)</span>
                <span>
                  {baseServicePriceCents
                    ? formatPrice(baseServicePriceCents)
                    : "TBD"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Add-ons Subtotal</span>
                <span>{formatPrice(addOnsSubtotalCents)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Estimated Total</span>
                <span>
                  {estimatedTotalCents
                    ? formatPrice(estimatedTotalCents)
                    : "TBD"}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Final total will depend on your dog&apos;s coat, condition, and
              any add-ons you select. You&apos;ll see full details in your
              confirmation email.
            </p>
          </div>
        </aside>
      </div>

      {/* SUBMIT BUTTON — under everything on mobile & desktop */}
      <section className="space-y-2 pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full rounded-full bg-yellow-400 py-3 text-gray-900 font-semibold shadow-sm hover:bg-yellow-300 transition"
        >
          Confirm Booking
        </button>
        <p className="text-xs text-gray-500 text-center">
          By booking, you agree to our grooming policies. Final pricing may vary
          after an in-person coat assessment.
        </p>
      </section>
    </form>
  );
}
