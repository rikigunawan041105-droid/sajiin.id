"use client";

import { useState } from "react";
import { WA_NUMBER } from "@/lib/data";

export default function WhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center active:scale-95"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.16 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.588 1.972 14.12 1.042 11.5 1.042c-5.437 0-9.864 4.373-9.868 9.803-.001 1.93.51 3.5 1.479 5.097L2.12 21.872l6.59-1.718z"/>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-green-500 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold">S</div>
              <div>
                <p className="font-bold text-sm">SajiIn Chat</p>
                <p className="text-xs text-green-100">Online • Admin siap bantu</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-xs text-gray-500 text-center">👋 Halo! Ada yang bisa kami bantu?</p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Halo%20SajiIn!%20Saya%20mau%20tanya%20tentang%20menu`}
              target="_blank"
              className="block text-left text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 p-3 rounded-xl"
            >
              <span className="font-semibold">🍽️ Tanya Menu</span>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Halo%20SajiIn!%20Saya%20mau%20cek%20status%20pesanan`}
              target="_blank"
              className="block text-left text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 p-3 rounded-xl"
            >
              <span className="font-semibold">📦 Cek Status Pesanan</span>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center text-xs font-bold py-3 rounded-xl"
            >
              💬 Chat Langsung
            </a>
          </div>
        </div>
      )}
    </>
  );
}
