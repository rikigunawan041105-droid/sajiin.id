"use client";

import { useSajiin } from "@/lib/context";

export default function Toasts() {
  const { toasts } = useSajiin();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${
            t.type === "success" ? "bg-green-500" : t.type === "error" ? "bg-red-500" : "bg-dark"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
