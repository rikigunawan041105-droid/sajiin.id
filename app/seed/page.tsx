"use client";

import { useEffect, useState } from "react";
import { seedFoods } from "@/lib/firestore";
import { foods } from "@/lib/data";

export default function SeedPage() {
  const [status, setStatus] = useState("Menunggu...");

  useEffect(() => {
    const run = async () => {
      try {
        await seedFoods(foods);
        setStatus("✅ Seed berhasil! Data menu sudah masuk ke Firestore.");
      } catch (e: any) {
        setStatus("❌ Error: " + e.message);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Seed Firestore</h1>
        <p className="text-lg">{status}</p>
        <a href="/" className="mt-6 inline-block text-red-500 underline">Kembali ke Home</a>
      </div>
    </div>
  );
}
