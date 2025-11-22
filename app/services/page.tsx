// app/services/page.tsx
export default function ServicesPage() {
  const coreServices = [
    {
      name: "Bath & Brush",
      desc: "Warm bath, blow-dry, brush-out, and light tidy-up around face and feet.",
      price: "From $35",
      tag: "Great for maintenance",
    },
    {
      name: "Full Groom",
      desc: "Bath, brush, full-body haircut, nail trim, ear cleaning, and paw tidy.",
      price: "From $65",
      tag: "Most popular",
    },
    {
      name: "Puppy Intro Groom",
      desc: "Gentle, short session to introduce puppies to grooming in a calm way.",
      price: "From $45",
      tag: "For pups under 1 year",
    },
  ];

  const addOns = [
    {
      name: "Nail Trim & File",
      desc: "Shorter, smoother nails for safe cuddles and comfortable walks.",
      price: "$15",
    },
    {
      name: "Teeth Brushing",
      desc: "Quick freshen-up for better breath and oral hygiene support.",
      price: "$10",
    },
    {
      name: "Deshedding Treatment",
      desc: "Deep brush and deshedding shampoo/conditioner for heavy shedders.",
      price: "From $20",
    },
    {
      name: "Paw & Nose Balm",
      desc: "Moisturizing treatment for dry paw pads and noses.",
      price: "$8",
    },
  ];

  const packages = [
    {
      name: "Basic Bath & Brush",
      desc: "Bath, conditioner, blow-dry, brush-out, nail trim, ear cleaning",
      price: "From $55",
      highlight: "Perfect between full grooms",
    },
    {
      name: "Full Service",
      desc: "Everything in Tidy & Trim + full haircut/styling, de-shedding (if needed)",
      price: "From $85",
      highlight: "Head-to-tail makeover",
    },
    {
      name: "Tidy & Trim",
      desc: "Everything from Basic + feet/face/sanitary area tidying + light body trim",
      price: "From $60",
      highlight: "Add a touch of tidiness",
    },
  ];

  return (
    <main className="bg-yellow-50 min-h-screen">
      {/* Hero / Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-600">
              Our Services
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Grooming made calm, clean, and kind.
            </h1>
            <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
              At 4Dogs Grooming, every service is designed with your dog&apos;s
              comfort in mind. From quick tidy-ups to full makeovers, we focus
              on gentle handling, clean products, and a stress-free experience.
            </p>
            <p className="mt-3 text-sm text-gray-600">
              Pricing varies by size, coat type, and condition. We&apos;ll
              always be upfront about what your pup needs before we begin.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm md:text-base font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 transition-colors"
              >
                Book a Grooming Appointment
              </a>
              <span className="text-xs md:text-sm text-gray-600">
                🐾 New clients welcome! Ask about our puppy intro groom.
              </span>
            </div>
          </div>

          {/* Cute highlight card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              What&apos;s included?
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="mt-0.5 text-yellow-500">•</span>
                Gentle handling and one-on-one attention.
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-yellow-500">•</span>
                High-quality shampoos tailored to your dog&apos;s coat and skin.
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-yellow-500">•</span>
                Careful drying and brushing to avoid matting and discomfort.
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 text-yellow-500">•</span>
                Honest communication about what&apos;s best for your dog.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Core Grooming Services
          </h2>
          <p className="hidden md:block text-xs text-gray-600">
            * Final pricing confirmed after a quick in-person assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreServices.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
                <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                  {service.price}
                </span>
              </div>
              <p className="text-sm text-gray-700">{service.desc}</p>
              {service.tag && (
                <p className="mt-1 text-xs font-medium text-yellow-700">
                  {service.tag}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-600 md:hidden">
          * Final pricing confirmed after a quick in-person assessment.
        </p>
      </section>

      {/* Add-Ons */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Add-On Services
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              Customize any grooming appointment with these extra touches to
              keep your dog feeling and looking their best.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addOns.map((addOn) => (
                <div
                  key={addOn.name}
                  className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {addOn.name}
                    </h3>
                    <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                      {addOn.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{addOn.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-7 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Service Packages
            </h2>
            <p className="text-sm text-gray-700">
              Bundle services together and give your pup a little extra glow-up.
            </p>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-yellow-100 rounded-xl p-4 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900 text-sm">
                      {pkg.name}
                    </p>
                    <span className="text-xs font-semibold text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{pkg.desc}</p>
                  {pkg.highlight && (
                    <p className="text-[11px] font-medium text-yellow-700 mt-1">
                      {pkg.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Not sure which service your dog needs?
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
          Tell us a bit about your pup&apos;s coat, size, and last groom when
          you book. We&apos;ll help you choose the best option and walk you
          through the process.
        </p>
        <a
          href="/booking"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-3 text-sm md:text-base font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 transition-colors"
        >
          Book Online
        </a>
      </section>
    </main>
  );
}
