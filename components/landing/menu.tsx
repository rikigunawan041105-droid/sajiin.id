"use client";

import { useSajiin } from "@/lib/context";
import { formatPrice } from "@/lib/data";
import { Star, Flame, Clock, AlertCircle } from "lucide-react";

export default function Menu() {
  const { selectedCategory, setSelectedCategory, filteredFoods, setSelectedFood, addToCart } = useSajiin();

  const categories = [
    { id: "semua", label: "Semua" },
    { id: "makanan", label: "🍽️ Makanan Utama" },
    { id: "cemilan", label: "🍿 Cemilan" },
    { id: "minuman", label: "🥤 Minuman" },
  ];

  return (
    <section id="menu" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red font-semibold text-sm tracking-widest uppercase">Menu Kami</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark mt-2">
            Hidangan <span className="text-red">Terbaik</span> SajiIn
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Berbagai pilihan hidangan Nusantara siap memanjakan lidah Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-dark text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        {filteredFoods.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Tidak ada menu di kategori ini</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <div
                key={food.food_id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => setSelectedFood(food)}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {food.rating > 0 && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-amber-600">
                        <Star size={12} fill="currentColor" /> {food.rating}
                      </span>
                    )}
                    {food.spiciness > 0 && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-red">
                        <Flame size={12} /> {"🌶️".repeat(food.spiciness)}
                      </span>
                    )}
                  </div>

                  {/* Sold Out */}
                  {!food.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-xl">Habis Terjual</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    className="font-bold text-dark text-lg cursor-pointer hover:text-red transition-colors"
                    onClick={() => setSelectedFood(food)}
                  >
                    {food.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{food.description}</p>

                  <div className="flex items-center gap-2 mt-3">
                    {food.pre_order_time && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} /> {food.pre_order_time}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-red">{formatPrice(food.price)}</span>
                    <button
                      onClick={() => addToCart(food.food_id)}
                      disabled={!food.available}
                      className="px-4 py-2 bg-dark text-white text-sm font-semibold rounded-xl hover:bg-dark/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {!food.available ? "Habis" : "Tambah"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
