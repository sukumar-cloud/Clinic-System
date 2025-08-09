"use client";

import React from "react";

type Status = "booked" | "waiting" | "with doctor" | "completed" | "canceled" | string;

const colorMap: Record<string, string> = {
  booked: "bg-blue-100 text-blue-700 border-blue-200",
  waiting: "bg-amber-100 text-amber-700 border-amber-200",
  "with doctor": "bg-indigo-100 text-indigo-700 border-indigo-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  canceled: "bg-rose-100 text-rose-700 border-rose-200",
};

export function StatusBadge({ status }: { status: Status }) {
  const key = String(status || "").toLowerCase();
  const cls = colorMap[key] || "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {String(status || "-")}
    </span>
  );
}
