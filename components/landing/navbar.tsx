"use client";

import { useSajiin } from "@/lib/context";
import { ShoppingBag, Clock, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const {
    totalCartItems,
    setShowCart,
    setShowHistory,
    scrollToSection,
  } = useSajiin();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-0.5">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white">S</span>
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-red" />
              <span className="relative font-serif text-2xl sm:text-3xl font-bold text-white px-1">a</span>
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white">jiIn</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Beranda", "Menu", "Tentang Kami", "Kontak"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "Beranda" ? "hero" : item === "Menu" ? "menu" : item === "Tentang Kami" ? "about" : "footer")}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHistory(true)} className="relative p-2 text-white/70 hover:text-white transition-colors">
              <Clock size={20} />
            </button>

            <button onClick={() => setShowCart(true)} className="relative p-2 text-white/70 hover:text-white transition-colors">
              <ShoppingBag size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red text-white text-xs font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors"
            >
              <User size={14} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
