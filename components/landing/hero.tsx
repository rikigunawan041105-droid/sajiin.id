"use client";

import { useSajiin } from "@/lib/context";
import { foods, formatPrice } from "@/lib/data";
import { Star } from "lucide-react";

export default function Hero() {
  const { addToCart, scrollToSection } = useSajiin();
  const featured = foods.filter((f) => f.available);

  return (
    <section id="hero" className="relative min-h-screen bg-dark pt-20 overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 right-0 w-96 h-96 text-white/5" viewBox="0 0 200 200">
          <path d="M0 100 Q50 20 100 100 T200 100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
        <svg className="absolute bottom-40 left-0 w-72 h-72 text-white/5" viewBox="0 0 200 200">
          <path d="M0 0 Q50 80 100 0 T200 80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/80">Restoran Terbaik di Indonesia</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Cita Rasa
              <span className="text-red"> Nusantara</span>
              <br />
              dalam Setiap Gigitan
            </h1>

            <p className="text-white/60 text-base sm:text-lg max-w-lg leading-relaxed">
              Nikmati hidangan Nusantara autentik dari bahan organik pilihan.
              Pre-order sekarang dan rasakan kelezatan yang tiada tara.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("menu")}
                className="px-8 py-3 bg-red hover:bg-red-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-red/25 active:scale-95"
              >
                Pesan Sekarang
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="px-8 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
              >
                Pelajari Lebih
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-white/10">
              {[
                { value: "350K+", label: "Ratings" },
                { value: "150K+", label: "Pecinta" },
                { value: "250K+", label: "Ulasan" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Floating Cards */}
          <div className="relative hidden lg:block">
            {featured.slice(0, 3).map((food, i) => (
              <div
                key={food.food_id}
                className={`absolute w-64 rounded-2xl overflow-hidden shadow-2xl bg-white cursor-pointer hover:scale-105 transition-transform ${
                  i === 0 ? "top-0 right-10 z-20 floating" : i === 1 ? "top-24 right-40 z-10 floating-delay opacity-85" : "top-48 right-20 z-0 opacity-75"
                }`}
                onClick={() => addToCart(food.food_id)}
              >
                <div className="h-32 overflow-hidden">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-dark">{food.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Star size={12} fill="currentColor" /> {food.rating}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatPrice(food.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
