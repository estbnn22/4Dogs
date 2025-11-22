"use client";

type Props = {
  appointmentId: string;
  action: (formData: FormData) => void;
};

export function DeleteButton({ appointmentId, action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("Permanently delete this appointment?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="appointmentId" value={appointmentId} />

      <button
        type="submit"
        className="inline-flex items-center rounded-full border border-red-200 px-3 py-1 font-semibold text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
