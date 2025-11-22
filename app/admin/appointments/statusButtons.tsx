// app/admin/appointments/AdminStatusButtons.tsx
"use client";

import { useFormStatus } from "react-dom";

type Props = {
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
};

export function AdminStatusButtons({ status }: Props) {
  const { pending } = useFormStatus();

  const disabled = pending;

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {/* Confirm */}
      <button
        type="submit"
        name="status"
        value="CONFIRMED"
        disabled={disabled || status === "CONFIRMED"}
        className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800 hover:bg-green-200 disabled:opacity-50"
        onClick={(e) => {
          if (!window.confirm("Confirm this appointment?")) {
            e.preventDefault();
          }
        }}
      >
        {pending ? "Saving..." : "Confirm"}
      </button>

      {/* Complete */}
      <button
        type="submit"
        name="status"
        value="COMPLETED"
        disabled={disabled || status === "COMPLETED"}
        className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800 hover:bg-blue-200 disabled:opacity-50"
        onClick={(e) => {
          if (!window.confirm("Mark this appointment as completed?")) {
            e.preventDefault();
          }
        }}
      >
        {pending ? "Saving..." : "Mark Completed"}
      </button>

      {/* Reject / Cancel */}
      <button
        type="submit"
        name="status"
        value="CANCELLED"
        disabled={disabled || status === "CANCELLED"}
        className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-800 hover:bg-red-200 disabled:opacity-50"
        onClick={(e) => {
          if (
            !window.confirm(
              "Cancel this appointment? The customer will no longer see it as active."
            )
          ) {
            e.preventDefault();
          }
        }}
      >
        {pending ? "Saving..." : "Cancel"}
      </button>
    </div>
  );
}
