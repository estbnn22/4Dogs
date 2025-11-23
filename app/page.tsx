"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bubbles,
  Wind,
  PawPrint,
  Dog,
  Scissors,
  ScissorsLineDashed,
} from "lucide-react";

export default function Home() {
  const services = [
    {
      name: "Warm Bath",
      icon: <Bubbles size={64} />,
      desc: "Cozy warm bath using gentle, dog-safe shampoo to leave coats clean and soft.",
    },
    {
      name: "Gentle Blowdry & Brushing",
      icon: <Wind size={64} />,
      desc: "Low-noise blowdry and thorough brushing to remove loose fur and tangles.",
    },
    {
      name: "Nail Trimming & Filing",
      icon: <PawPrint size={64} />,
      desc: "Careful nail trim and smooth filing to keep paws comfortable and safe.",
    },
    {
      name: "Teeth & Ear Cleaning",
      icon: <Dog size={64} />,
      desc: "Freshen breath and gently clean ears to support your pup’s overall health.",
    },
    {
      name: "Full Breed-Specific Grooming",
      icon: <Scissors size={64} />,
      desc: "Customized haircut and styling tailored to your dog’s breed and coat type.",
    },
    {
      name: "Basic Trim",
      icon: <ScissorsLineDashed size={64} />,
      desc: "Quick tidy-up around face, paws and sanitary areas between full grooms.",
    },
  ];

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  const packages = [
    {
      name: "Basic Bath & Brush",
      price: "$55",
      desc: "Bath, conditioner, blow-dry, brush-out, nail trim, ear cleaning",
      best: false,
    },
    {
      name: "Full Service",
      price: "$85",
      desc: "Everything in Tidy & Trim + full haircut/styling, de-shedding (if needed)",
      best: true,
    },
    {
      name: "Tidy & Trim",
      price: "$60",
      desc: "Everything from Basic + feet/face/sanitary area tidying + light body trim",
      best: false,
    },
  ];

  return (
    <div>
      {/* Hero section */}

      <section className="bg-yellow-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:py-16 lg:py-20">
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700">
              4Dogs Grooming
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Professional Dog Grooming
              <br className="hidden sm:block" /> in Fort Worth
            </h1>

            <p className="mt-4 max-w-xl text-sml md:text-xl text-slate-700 sm:text-base md:mt-5">
              Easy online booking · Friendly care · Stress-free grooming for
              every breed and size.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-start">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full btn btn-primary  shadow-md text-lg "
              >
                Book Now
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full btn btn-accent btn-soft  shadow-md text-lg"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative mx-auto flex max-w-xs items-end justify-center sm:max-w-sm md:max-w-md">
              <Image
                src="/DOG.png"
                alt="Happy freshly groomed dog"
                width={480}
                height={480}
                priority
                className="h-auto w-full object-contain drop-shadow-xl hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center px-6">
          <div className="flex flex-col items-center gap-5 mb-10">
            <h1 className="text-5xl font-bold text-center">
              4Dogs Premium Services
            </h1>
            <p className="text-md md:text-xl text-center text-gray-600">
              We make every dog’s grooming experience easy, comfortable, and
              stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {services.map((service, index) => {
              const isFlipped = flippedIndex === index;

              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => handleFlip(index)}
                  className="group relative h-64 w-full [perspective:1000px] focus:outline-none"
                >
                  <div
                    className={`relative h-full w-full rounded-2xl bg-yellow-50 shadow-sm border border-yellow-200 transition-transform duration-500 [transform-style:preserve-3d] ${
                      isFlipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 [backface-visibility:hidden]">
                      <div className="text-yellow-600">{service.icon}</div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Tap to see details
                      </p>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-yellow-100 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-700">{service.desc}</p>
                      <span className="text-xs font-medium uppercase tracking-wide text-yellow-700">
                        Tap to flip back
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Link
            href="/services"
            className="btn btn-accent btn-soft text-lg px-10 py-5 mt-12"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Packages Section */}
      <section>
        <div className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-center gap-3 text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Packages
              </h1>
              <p className="text-base md:text-xl text-slate-600 max-w-2xl">
                Here is a quick overview of our grooming packages. Choose the
                one that fits your pup best.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((packageItem, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    packageItem.best
                      ? "border-yellow-400 ring-2 ring-yellow-300"
                      : "border-slate-200"
                  }`}
                >
                  {packageItem.best && (
                    <span className="absolute -top-3 rounded-full bg-yellow-400 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-md">
                      Best Value
                    </span>
                  )}

                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {packageItem.name}
                  </h3>

                  <p className="mt-3 text-4xl font-extrabold text-slate-900">
                    {packageItem.price}
                  </p>

                  <p className="mt-3 text-sm md:text-base md:font-semibold text-slate-600">
                    {packageItem.desc}
                  </p>

                  <Link
                    href="/booking"
                    className="mt-6 btn btn-primary rounded-full text-lg px-8"
                  >
                    Book
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/services"
              className="btn btn-soft btn-accent text-lg p-7 m-10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Hours / Location Section */}
      <section className="bg-yellow-100 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hours &amp; Location
            </h1>
            <p className="mt-3 text-base md:text-lg text-gray-700">
              Conveniently located in Fort Worth with flexible hours for busy
              pet parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white rounded-2xl shadow-sm md:hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <h2 className="text-2xl font-bold tracking-tight">Location</h2>
              </div>
              <p className="text-sm text-gray-700">
                3409 Conway St
                <br />
                Fort Worth, TX 761xx
              </p>
              <div className="mt-2 w-full h-64 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d226.06285678478764!2d-97.29912609187008!3d32.76828582664612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1763434300617!5m2!1sen!2sus"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm md:hover:shadow-md transition-shadow p-6 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                <h2 className="text-2xl font-bold tracking-tight">Hours</h2>
              </div>

              <div className="space-y-3 text-gray-800 w-full">
                <div className="flex items-center justify-between border-b border-yellow-100 pb-2">
                  <span className="font-medium">Tuesday – Friday</span>
                  <span className="text-sm md:text-base">
                    9:00 AM – 6:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-yellow-100 pb-2">
                  <span className="font-medium">Saturday</span>
                  <span className="text-sm md:text-base">
                    10:00 AM – 4:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Sunday &amp; Monday</span>
                  <span className="text-sm md:text-base text-red-500">
                    Closed
                  </span>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <p>📅 By appointment only.</p>
                <p>📞 Call or book online to reserve your spot.</p>
              </div>

              <div className="mt-2">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 transition-colors"
                >
                  Book an Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}

      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 mt-3 md:text-lg max-w-2xl mx-auto">
              At 4Dogs Grooming, we treat every dog like family. Here’s why pet
              owners love booking with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">✨</span>
              <h3 className="text-xl font-semibold mb-2">
                Gentle & Safe Grooming
              </h3>
              <p className="text-gray-700 text-sm">
                Using calm handling techniques and safe equipment to ensure your
                dog feels comfortable at all times.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🛁</span>
              <h3 className="text-xl font-semibold mb-2">
                Premium Bathing Products
              </h3>
              <p className="text-gray-700 text-sm">
                We use high-quality shampoos and conditioners tailored for
                sensitive skin, shedding, and coat health.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🐶</span>
              <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-700 text-sm">
                Every dog is unique — we tailor services specifically to your
                pup’s breed, coat type, and temperament.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">⏱️</span>
              <h3 className="text-xl font-semibold mb-2">
                Quick & Easy Booking
              </h3>
              <p className="text-gray-700 text-sm">
                Book appointments in minutes with our simple online scheduling
                system — no calls needed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🏡</span>
              <h3 className="text-xl font-semibold mb-2">Family-Owned</h3>
              <p className="text-gray-700 text-sm">
                We’re local, small, and care deeply about our community — your
                dog will always feel like part of the family.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <span className="text-4xl mb-4">⭐</span>
              <h3 className="text-xl font-semibold mb-2">
                Trusted by Pet Owners
              </h3>
              <p className="text-gray-700 text-sm">
                Our clients love us for our consistency, kindness, and
                high-quality grooming results every time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
