"use client";

import { useSajiin } from "@/lib/context";
import { formatPrice } from "@/lib/data";
import { X, LayoutDashboard, ClipboardList, UtensilsCrossed, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const { showAdminDashboard, setShowAdminDashboard, orders, foods, updateOrderStatusFn } = useSajiin();

  if (!showAdminDashboard) return null;

  const stats = {
    totalRevenue: orders.filter((o) => ["Confirmed", "Cooking", "Ready", "Completed"].includes(o.status)).reduce((sum, o) => sum + o.total_price, 0),
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => ["Confirmed", "Cooking", "Ready"].includes(o.status)).length,
    completed: orders.filter((o) => o.status === "Completed").length,
  };

  return (
    <div className="fixed inset-0 z-[95] flex" onClick={() => setShowAdminDashboard(false)}>
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative w-full h-full bg-dark overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-dark border-b border-white/10 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard size={20} className="text-white" />
              <h2 className="font-bold text-lg text-white">SajiIn Admin</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">admin@sajiin.com</span>
              <button
                onClick={() => setShowAdminDashboard(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm transition-colors"
              >
                Kembali Ke Web
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Pendapatan", value: formatPrice(stats.totalRevenue), icon: "💰", color: "bg-green-500/10 text-green-400" },
              { label: "Pending", value: stats.pending, icon: "⏳", color: "bg-amber-500/10 text-amber-400" },
              { label: "Diproses", value: stats.processing, icon: "👨‍🍳", color: "bg-blue-500/10 text-blue-400" },
              { label: "Selesai", value: stats.completed, icon: "✅", color: "bg-emerald-500/10 text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
                <span className="text-2xl">{s.icon}</span>
                <p className="text-2xl font-bold mt-2">{s.value}</p>
                <p className="text-xs opacity-70 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Pending Orders Quick Action */}
          {orders.filter((o) => o.status === "Pending").length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Pesanan Baru ({stats.pending})
              </h3>
              <div className="space-y-3">
                {orders.filter((o) => o.status === "Pending").slice(0, 5).map((o) => (
                  <div key={o.order_number} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">#{o.order_number} — {o.customer_name}</p>
                      <p className="text-white/40 text-xs mt-1">{o.date} {o.time} • {formatPrice(o.total_price)}</p>
                    </div>
                    <button
                      onClick={() => updateOrderStatusFn(o.order_number, "Confirmed")}
                      className="px-4 py-2 bg-red hover:bg-red-light text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      Konfirmasi
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="mb-8">
            <h3 className="text-white font-bold mb-4">Semua Pre-Order</h3>
            {orders.length === 0 ? (
              <p className="text-white/30 text-sm">Belum ada pesanan.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-white/30 text-xs uppercase border-b border-white/10">
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Pelanggan</th>
                      <th className="py-2 pr-4">Tanggal</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Total</th>
                      <th className="py-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...orders].reverse().map((o) => (
                      <tr key={o.order_number} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pr-4 text-white font-medium">#{o.order_number}</td>
                        <td className="py-3 pr-4 text-white/70">{o.customer_name}</td>
                        <td className="py-3 pr-4 text-white/50 text-xs">{o.date} {o.time}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            o.status === "Pending" ? "bg-amber-500/20 text-amber-400" :
                            o.status === "Confirmed" ? "bg-blue-500/20 text-blue-400" :
                            o.status === "Cooking" ? "bg-purple-500/20 text-purple-400" :
                            o.status === "Ready" ? "bg-green-500/20 text-green-400" :
                            o.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>{o.status}</span>
                        </td>
                        <td className="py-3 pr-4 text-white font-medium">{formatPrice(o.total_price)}</td>
                        <td className="py-3">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatusFn(o.order_number, e.target.value)}
                            className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1"
                          >
                            {["Pending", "Confirmed", "Cooking", "Ready", "Completed", "Cancelled"].map((s) => (
                              <option key={s} value={s} className="bg-dark">{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Foods Table */}
          <div>
            <h3 className="text-white font-bold mb-4">Menu Makanan</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-white/30 text-xs uppercase border-b border-white/10">
                    <th className="py-2 pr-4">Nama</th>
                    <th className="py-2 pr-4">Harga</th>
                    <th className="py-2 pr-4">Stok</th>
                    <th className="py-2">Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((f) => (
                    <tr key={f.food_id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 text-white">{f.name}</td>
                      <td className="py-3 pr-4 text-white/70">{formatPrice(f.price)}</td>
                      <td className="py-3 pr-4">
                        <span className={`${f.stock < 5 && f.stock > 0 ? "text-amber-400 font-medium" : f.stock === 0 ? "text-red-400" : "text-white/70"}`}>
                          {f.stock}
                        </span>
                      </td>
                      <td className="py-3 text-white/50 text-xs">{f.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
