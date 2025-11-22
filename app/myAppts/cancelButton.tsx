"use client";

type Props = {
  appointmentId: string;
  action: (formData: FormData) => void;
};

export function CancelAppointmentButton({ appointmentId, action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm(
          "Are you sure you want to cancel this appointment?"
        );
        if (!ok) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="appointmentId" value={appointmentId} />
      <button
        type="submit"
        className="inline-flex items-center rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
      >
        Cancel appointment
      </button>
    </form>
  );
}
