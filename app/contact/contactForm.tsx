"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage } from "./actions";

export function ContactForm() {
  const [status, setStatus] = useState<{ ok?: boolean; error?: string }>({});
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    const result = await sendContactMessage(formData);
    setStatus(result);
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="rounded-lg border px-4 py-2"
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={pending}
        className="w-full rounded-full bg-yellow-400 py-3 font-semibold shadow-sm hover:bg-yellow-300 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>

      {/* Success */}
      {status.ok && (
        <p className="text-green-600 text-center text-sm font-semibold">
          Message sent! We’ll get back to you soon.
        </p>
      )}

      {/* Error */}
      {status.error && (
        <p className="text-red-600 text-center text-sm font-semibold">
          {status.error}
        </p>
      )}
    </form>
  );
}
