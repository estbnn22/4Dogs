// app/contact/page.tsx
import { sendContactMessage } from "./actions";
import { ContactForm } from "./contactForm";

export default function ContactPage() {
  return (
    <main className="bg-yellow-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-700 md:text-lg">
            Have questions? Want to book? We’re here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>

            <ContactForm />
          </div>

          {/* Info Card */}
          <div className="flex flex-col gap-8">
            {/* Hours & Location */}
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Studio</h2>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-700 text-sm">
                  3409 Conway St
                  <br />
                  Fort Worth, TX 76111
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                <p className="text-gray-700 text-sm">
                  Tuesday – Friday: 9am – 6pm
                </p>
                <p className="text-gray-700 text-sm">Saturday: 10am – 4pm</p>
                <p className="text-gray-700 text-sm text-red-500">
                  Sunday – Monday: Closed
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-700 text-sm">(817) 555-1234</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                <p className="text-gray-700 text-sm">4Dogsgrooming@gmail.com</p>
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-64 overflow-hidden rounded-2xl shadow-sm">
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
        </div>
      </div>
    </main>
  );
}
