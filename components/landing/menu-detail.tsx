"use client";

import { useSajiin } from "@/lib/context";
import { X, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/data";

export default function MenuDetail() {
  const { selectedFood, setSelectedFood, addToCart } = useSajiin();
  if (!selectedFood) return null;

  const ingredients = selectedFood.composition.split(", ");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedFood(null)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedFood(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="h-64 md:h-full min-h-[300px]">
            <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs text-red font-semibold uppercase tracking-wider">{selectedFood.category}</span>
              <h3 className="font-serif text-2xl font-bold text-dark mt-1">{selectedFood.name}</h3>
              <p className="text-3xl font-bold text-red mt-2">{formatPrice(selectedFood.price)}</p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">{selectedFood.description}</p>

            {/* Ingredients */}
            <div>
              <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2">Bahan-bahan</h4>
              <div className="flex flex-wrap gap-1.5">
                {ingredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">{ing}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              {selectedFood.pre_order_time && <span>⏱️ Pre-order: {selectedFood.pre_order_time}</span>}
              {selectedFood.spiciness > 0 && <span>🌶️ Level {selectedFood.spiciness}</span>}
            </div>

            <button
              onClick={() => { addToCart(selectedFood.food_id); setSelectedFood(null); }}
              disabled={!selectedFood.available || selectedFood.stock === 0}
              className="w-full py-3 bg-red hover:bg-red-light text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={18} />
              {selectedFood.available && selectedFood.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
