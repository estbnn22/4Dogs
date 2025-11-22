import { AccountSettings } from "@stackframe/stack";

export default function UserSettings() {
  return (
    <div>
      <div className="flex justify-end">
        <a href="/admin" className="text-xs text-gray-500 hover:underline">
          ← Back to admin home
        </a>
      </div>
      <AccountSettings fullPage />
    </div>
  );
}
