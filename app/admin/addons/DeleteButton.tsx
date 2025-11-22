// app/admin/addons/DeleteAddonButton.tsx
"use client";

type Props = {
  addonId: string;
  action: (formData: FormData) => void;
};

export function DeleteAddonButton({ addonId, action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (
          !window.confirm(
            "Delete this add-on? This cannot be undone and will remove it from future use."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="addonId" value={addonId} />
      <button
        type="submit"
        className="inline-flex items-center rounded-full border border-red-200 px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-50 hover:cursor-pointer"
      >
        Delete
      </button>
    </form>
  );
}
