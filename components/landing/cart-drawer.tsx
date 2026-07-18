"use client";

import { useSajiin } from "@/lib/context";
import { formatPrice } from "@/lib/data";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { cart, setShowCart, showCart, updateQty, removeFromCart, totalCartItems, totalCartPrice, setIsCheckoutOpen } = useSajiin();

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg text-dark">
            Keranjang {totalCartItems > 0 && <span className="text-sm text-gray-400">({totalCartItems})</span>}
          </h3>
          <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p className="font-medium">Keranjang kosong</p>
              <p className="text-sm mt-1">Mulai pesan menu favorit Anda</p>
              <button
                onClick={() => { setShowCart(false); }}
                className="mt-4 px-6 py-2 bg-dark text-white rounded-xl text-sm font-medium hover:bg-dark/80 transition-colors"
              >
                Kembali ke Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.food_id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-dark truncate">{item.name}</h4>
                  <p className="text-red font-bold text-sm mt-0.5">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.food_id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.food_id, item.quantity + 1)}
                      disabled={item.quantity >= item.max_stock}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.food_id)}
                      className="ml-auto text-xs text-red hover:text-red/80 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-dark">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-red">{formatPrice(totalCartPrice)}</span>
            </div>
            <p className="text-xs text-gray-400">*Belum termasuk biaya layanan Rp 2.000</p>
            <button
              onClick={() => { setShowCart(false); setIsCheckoutOpen(true); }}
              className="w-full py-3 bg-dark hover:bg-dark/80 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Lanjutkan Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
