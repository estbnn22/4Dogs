import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookingForm from "./bookingForm";

type PageProps = {
  searchParams: Promise<{
    ownerName?: string;
    dogName?: string;
    dogBreed?: string;
    notes?: string;
    dogSize?: string;
    baseService?: string;
    addOns?: string | string[];
  }>;
};

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
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Book an Appointment
          </h1>
          <p className="mt-3 text-gray-700 md:text-lg">
            Tell us about your pup, pick a time, and choose any add-ons
            you&apos;d like.
          </p>
        </div>

        <BookingForm
          initialOwnerName={prefillOwnerName}
          initialDogName={prefillDogName}
          initialDogBreed={prefillDogBreed}
          initialNotes={prefillNotes}
          initialDogSize={prefillDogSize}
          initialBaseService={prefillBaseService}
          addons={addons}
          preselectedAddOnIds={preselectedAddOnIds}
        />
      </div>
    </main>
  );
}
