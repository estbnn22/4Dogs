// app/booking/TimeSection.tsx
"use client";

import { useEffect, useState } from "react";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function TimeSection() {
  const [date, setDate] = useState("");
  const [takenTimes, setTakenTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setTakenTimes([]);
      return;
    }

    setLoading(true);
    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setTakenTimes(Array.isArray(data.taken) ? data.taken : []);
      })
      .catch((err) => {
        console.error("Failed to load availability", err);
        setTakenTimes([]);
      })
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Date controls which times are disabled */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Date *</label>
        <input
          type="date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {loading && (
          <p className="text-xs text-gray-500 mt-1">Checking availability…</p>
        )}
      </div>

      {/* Time select with disabled booked slots */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Time *</label>
        <select
          name="time"
          required
          disabled={!date}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">
            {date ? "Select a time" : "Select a date first"}
          </option>
          {TIME_SLOTS.map((time) => {
            const isTaken = takenTimes.includes(time);
            return (
              <option key={time} value={time} disabled={isTaken}>
                {formatTimeLabel(time)} {isTaken ? " (Booked)" : ""}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

function formatTimeLabel(time: string) {
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${mStr} ${ampm}`;
}
