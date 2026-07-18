"use client";

import { ReactNode } from "react";
import { outlets, socialMedia } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function Footer() {
  const mainOutlet = outlets.find((o) => o.is_main) || outlets[0];

  const socialIcons: Record<string, ReactNode> = {
    instagram: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    facebook: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  };

  return (
    <footer id="footer" className="bg-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-serif text-2xl font-bold text-white">S</span>
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-red" />
                <span className="relative font-serif text-2xl font-bold text-white px-1">a</span>
              </span>
              <span className="font-serif text-2xl font-bold text-white">jiIn</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              SajiIn adalah restoran Indonesia premium yang menyajikan hidangan Nusantara autentik dengan bahan organik pilihan. Pre-order online untuk pengalaman bersantap terbaik.
            </p>
          </div>

          {/* Outlets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red mb-4">Outlet Utama</h4>
            <ul className="space-y-3">
              {outlets.map((o) => (
                <li key={o.id} className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-red" />
                  <span>
                    <strong className="text-white font-medium">{o.name}</strong>
                    <br />
                    {o.address}, {o.city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-red mb-4">Kontak</h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>📞 {mainOutlet.phone}</p>
              {mainOutlet.email && <p>✉️ {mainOutlet.email}</p>}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red mb-3">Ikuti Kami</h4>
              <div className="flex items-center gap-3">
                {socialMedia.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all"
                  >
                    {socialIcons[s.platform] || <span className="text-xs">{s.platform[0].toUpperCase()}</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-4">
        <p className="text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} SajiIn. All rights reserved. Designed &amp; Engineered with Craftsmanship.
        </p>
      </div>
    </footer>
  );
}
