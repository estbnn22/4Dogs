import Link from "next/link";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-yellow-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Grooming Policies
          </h1>
          <p className="mt-4 text-gray-700 md:text-lg">
            These policies help keep every visit safe, smooth, and stress-free
            for both pups and people.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-10 text-sm md:text-base text-gray-800">
          {/* General */}
          <section>
            <h2 className="text-xl font-semibold mb-3">1. General Policies</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All services are by appointment only.</li>
              <li>
                Please arrive on time for drop-off and pick-up so we can keep
                the day running smoothly for all clients.
              </li>
              <li>
                If you are unsure which service your dog needs, we&apos;re happy
                to help you choose at drop-off.
              </li>
            </ul>
          </section>

          {/* Vaccinations */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Vaccination Requirements
            </h2>
            <p className="mb-2">
              For the safety of all dogs in our care, we require that your dog
              be current on the following vaccinations:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Rabies</li>
              <li>Distemper / Parvo (DHPP or similar)</li>
              <li>Bordetella (Kennel Cough) – recommended</li>
            </ul>
            <p className="mt-2">
              We may request proof of vaccination. By booking, you confirm that
              your dog is up to date according to your veterinarian&apos;s
              recommendations.
            </p>
          </section>

          {/* Health & Safety */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Health &amp; Medical Conditions
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Please let us know about any medical conditions, allergies,
                recent surgeries, or injuries before your appointment.
              </li>
              <li>
                Dogs showing signs of illness (vomiting, diarrhea, coughing,
                lethargy, etc.) may be refused service and asked to see a
                veterinarian first.
              </li>
              <li>
                If your dog becomes stressed or unsafe to groom, we may stop the
                service early in your dog&apos;s best interest. Charges will
                reflect the work completed.
              </li>
            </ul>
          </section>

          {/* Fleas & Parasites */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Fleas &amp; Parasites
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                If live fleas or heavy infestation are found, we may be required
                to perform a flea bath and/or end the groom early.
              </li>
              <li>
                An additional sanitation fee may apply to cover extra cleaning
                and disinfecting time.
              </li>
              <li>
                We recommend keeping your dog on a regular flea and tick
                preventative as advised by your veterinarian.
              </li>
            </ul>
          </section>

          {/* Matting */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Matting &amp; Shaving Policies
            </h2>
            <p className="mb-2">
              Matted coats can be painful and dangerous to work on. Your dog’s
              comfort and safety always come first.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                In cases of severe matting, we may recommend a short shave-down
                instead of attempting to brush out the mats.
              </li>
              <li>
                Shaving a matted dog may reveal skin irritation, hot spots,
                abrasions, or parasites that were previously hidden.
              </li>
              <li>
                Extra fees may apply for de-matting time or shave-downs due to
                matting.
              </li>
            </ul>
            <p className="mt-2 text-xs text-gray-600">
              By booking, you understand that 4Dogs is not responsible for
              underlying skin issues revealed by removing mats.
            </p>
          </section>

          {/* Behavior */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Behavior &amp; Safety
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Please let us know in advance if your dog has a history of
                biting, fear aggression, or extreme anxiety during grooming.
              </li>
              <li>
                We reserve the right to stop a groom at any time if a dog
                becomes too stressed or unsafe for themselves or the groomer.
              </li>
              <li>
                A handling fee may apply for dogs that require extra time or
                assistance due to behavioral challenges.
              </li>
            </ul>
          </section>

          {/* Late, Cancellation & No-Show */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Late Arrivals, Cancellations &amp; No-Shows
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">Late Arrivals:</span> Arriving
                more than 10–15 minutes late may require shortening the service
                or rescheduling so we don&apos;t impact other appointments.
              </li>
              <li>
                <span className="font-medium">Cancellations:</span> Please give
                at least 24 hours&apos; notice if you need to cancel or
                reschedule.
              </li>
              <li>
                <span className="font-medium">No-Shows:</span> Repeated no-shows
                may require a non-refundable deposit for future bookings.
              </li>
            </ul>
          </section>

          {/* Pick-up */}
          <section>
            <h2 className="text-xl font-semibold mb-3">8. Pick-Up Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                We will contact you when your dog is ready for pick-up. Please
                pick up within 30 minutes whenever possible.
              </li>
              <li>
                Extended stays after the groom may incur a daycare/holding fee,
                as we have limited space.
              </li>
            </ul>
          </section>

          {/* Pricing & Payment */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Pricing &amp; Payment
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Prices shown online are estimates and may vary based on size,
                coat condition, temperament, and requested style.
              </li>
              <li>
                Final pricing will be confirmed at drop-off or at the end of the
                appointment once the groom is completed.
              </li>
              <li>
                Payment is due at pick-up. We currently accept the payment
                methods listed at the front desk which include cash, credit
                cards, apple pay etc.
              </li>
            </ul>
          </section>

          {/* Photos & Social Media */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              10. Photos &amp; Social Media
            </h2>
            <p className="mb-2">
              We love taking cute “after” photos of our guests!
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                By booking, you give permission for 4Dogs to take photos or
                short videos of your pet for our records, website, and social
                media.
              </li>
              <li>
                If you prefer your pet not be photographed or posted, please let
                us know at drop-off and we will happily respect your wishes.
              </li>
            </ul>
          </section>

          {/* Senior & Special Needs Dogs */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Senior &amp; Special Needs Dogs
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Older dogs or dogs with special needs may require shorter or
                modified grooming sessions for their comfort.
              </li>
              <li>
                We may break services into shorter visits or adjust the style to
                keep your dog safe and relaxed.
              </li>
              <li>
                In rare cases, we may recommend grooming be performed at a
                veterinary clinic if your dog&apos;s health requires it.
              </li>
            </ul>
          </section>

          {/* Agreement */}
          <section>
            <h2 className="text-xl font-semibold mb-3">12. Agreement</h2>
            <p>
              By booking an appointment with 4Dogs, you acknowledge that you
              have read, understood, and agree to these grooming policies. Our
              goal is always to provide a safe, kind, and positive grooming
              experience for every pup in our care.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Questions?</h2>
            <p>
              If you have any questions about these policies or your pet&apos;s
              specific needs, please{" "}
              <Link href="/contact" className="link hover:text-blue-500">
                contact
              </Link>{" "}
              us before your appointment. We&apos;re happy to talk through
              anything and make a plan that works best for your dog.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
