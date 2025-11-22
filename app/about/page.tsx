// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="bg-yellow-50 min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Top Intro */}
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600">
              About 4Dogs Grooming
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              A small grooming studio with a big heart.
            </h1>
            <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
              4Dogs Grooming is a cozy, family-run grooming studio in Fort
              Worth, TX, created for pet parents who want their dogs to feel
              safe, loved, and genuinely cared for. Every pup that walks through
              our doors is treated like part of the family — with patience,
              kindness, and lots of wag-worthy pampering.
            </p>
            <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
              Instead of a crowded, rushed environment, we focus on quality over
              quantity: fewer dogs at a time, personalized attention, and a calm
              grooming experience from start to finish.
            </p>
          </div>

          {/* Side Card – Groomer Highlight */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-7 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              Meet Your Groomer
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Hi, my name is Adrian and I&apos;m the groomer behind 4Dogs! I
              started this studio because I wanted to create a grooming space
              where dogs aren&apos;t just “another appointment” — they&apos;re
              individuals with their own personality, quirks, and comforts.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              I&apos;m always learning, improving my skills, and staying
              up-to-date with safe grooming practices so your dog leaves not
              only looking great, but feeling relaxed and confident too.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-800">
                🐾 Fear-free inspired handling
              </span>
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-800">
                ✂️ Focus on gentle grooming
              </span>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Story
            </h2>
            <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
              4Dogs began with a simple idea: grooming shouldn&apos;t be
              stressful. After seeing how anxious many dogs were in busy, loud
              salons, the dream was to build a smaller, calmer space where each
              dog could be given time, patience, and respect.
            </p>
            <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
              Starting as a one-groomer studio meant a lot of long days,
              hands-on work, and a huge learning curve — but also real
              relationships with clients and their pups. Today, 4Dogs is growing
              one happy dog at a time, built on trust, word-of-mouth, and a
              genuine love for animals.
            </p>
          </div>

          {/* Values / Pillars */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-7 flex flex-col gap-5">
            <h3 className="text-xl font-bold text-gray-900">
              What We Believe In
            </h3>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="mt-1 text-lg">💛</span>
                <div>
                  <p className="font-semibold">Kindness First</p>
                  <p>
                    Every dog is handled with patience and compassion — no rush,
                    no force.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-lg">🧼</span>
                <div>
                  <p className="font-semibold">Clean & Calm Environment</p>
                  <p>
                    A tidy, quiet studio that helps dogs feel safe and
                    comfortable while they&apos;re being groomed.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-lg">🤝</span>
                <div>
                  <p className="font-semibold">Honest Communication</p>
                  <p>
                    We&apos;ll always be transparent about your dog&apos;s coat,
                    comfort, and what&apos;s realistic for each visit.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Little Stats / Highlights */}
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl shadow-sm px-5 py-6">
            <p className="text-3xl font-extrabold text-yellow-500">1-on-1</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
              Attention for Your Dog
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm px-5 py-6">
            <p className="text-3xl font-extrabold text-yellow-500">Local</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
              Family-Owned in Fort Worth
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm px-5 py-6">
            <p className="text-3xl font-extrabold text-yellow-500">Happy</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
              Dogs, Parents &amp; Tails
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ready to book your dog&apos;s next groom?
          </h2>
          <p className="mt-3 text-gray-700 text-sm md:text-base max-w-xl mx-auto">
            Whether it&apos;s a full makeover or just a tidy-up, we&apos;re here
            to make your pup look and feel their best.
          </p>
          <a
            href="/booking"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-3 text-sm md:text-base font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 transition-colors"
          >
            Book an Appointment
          </a>
        </section>
      </section>
    </main>
  );
}
