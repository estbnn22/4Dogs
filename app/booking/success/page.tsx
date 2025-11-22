// app/booking/success/page.tsx
export default function BookingSuccessPage() {
  return (
    <main className="bg-yellow-50 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md text-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Booking Confirmed! 🐾
        </h1>
        <p className="text-gray-700 text-sm md:text-base">
          Thank you for booking with 4Dogs Grooming. We&apos;ll review your
          appointment and reach out if we have any questions.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
