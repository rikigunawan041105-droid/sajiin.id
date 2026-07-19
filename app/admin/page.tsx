"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { SajiinProvider, useSajiin } from "@/lib/context";
import { formatPrice } from "@/lib/data";
import { Lock, LayoutDashboard, LogOut, UtensilsCrossed, ClipboardList, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPageWrapper() {
  return (
    <SajiinProvider>
      <AdminPage />
    </SajiinProvider>
  );
}

function AdminPage() {
  const { isAdminLoggedIn, adminLogin, adminLogout, orders, foods, updateOrderStatusFn } = useSajiin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const stats = {
    totalRevenue: orders
      .filter((o) => !["Pending", "Cancelled"].includes(o.status))
      .reduce((sum, o) => sum + o.total_price, 0),
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => ["Confirmed", "Cooking", "Ready"].includes(o.status)).length,
    completed: orders.filter((o) => o.status === "Completed").length,
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-dark">Admin SajiIn</h1>
            <p className="text-xs text-gray-400 mt-1">Masuk untuk mengelola pesanan</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-dark uppercase tracking-wider">Email</label>
              <input
                type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red/20 text-sm"
                placeholder="admin@sajiin.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-dark uppercase tracking-wider">Password</label>
              <input
                type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red/20 text-sm"
                placeholder="***"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            {error && <p className="text-red text-xs text-center">{error}</p>}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-dark hover:bg-dark/80 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
            <Link href="/" className="block text-center text-xs text-gray-400 hover:text-dark transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="sticky top-0 bg-dark border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={20} className="text-white" />
            <h1 className="font-bold text-lg text-white">SajiIn Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm transition-colors flex items-center gap-2">
              <ArrowLeft size={14} /> Beranda
            </Link>
            <button onClick={() => { adminLogout(); router.push("/admin"); }} className="px-4 py-2 bg-red/20 hover:bg-red/30 text-red rounded-xl text-sm transition-colors flex items-center gap-2">
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-4 text-sm">
          {[
            { key: "overview", label: "Ringkasan", icon: "📊" },
            { key: "orders", label: "Pesanan", icon: "📋" },
            { key: "menu", label: "Menu", icon: "🍽️" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`pb-3 border-b-2 transition-colors ${activeTab === tab.key ? "border-red text-white" : "border-transparent text-white/40 hover:text-white/60"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <>
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
            {orders.filter((o) => o.status === "Pending").length > 0 && (
              <div>
                <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Pesanan Baru ({stats.pending})
                </h2>
                <div className="space-y-3">
                  {orders.filter((o) => o.status === "Pending").slice(0, 5).map((o) => (
                    <div key={o.order_number} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">#{o.order_number} — {o.customer_name}</p>
                        <p className="text-white/40 text-xs mt-1">{o.date} {o.time} • {formatPrice(o.total_price)}</p>
                      </div>
                      <button onClick={() => updateOrderStatusFn(o.order_number, "Confirmed")}
                        className="px-4 py-2 bg-red hover:bg-red-light text-white text-xs font-semibold rounded-lg transition-colors"
                      >Konfirmasi</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-white font-bold mb-4">Semua Pesanan</h2>
            {orders.length === 0 ? (
              <p className="text-white/30 text-sm">Belum ada pesanan.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-white/30 text-xs uppercase border-b border-white/10">
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2 pr-4">Pelanggan</th>
                      <th className="py-2 pr-4">WA</th>
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
                        <td className="py-3 pr-4 text-white/50 text-xs">{o.customer_whatsapp}</td>
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
                          <select value={o.status} onChange={(e) => updateOrderStatusFn(o.order_number, e.target.value)}
                            className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1">
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
        )}

        {activeTab === "menu" && (
          <div>
            <h2 className="text-white font-bold mb-4">Menu Makanan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foods.map((f) => (
                <div key={f.food_id} className="bg-white/5 rounded-xl p-4 flex gap-4">
                  <img src={f.image} alt={f.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <p className="text-white font-medium">{f.name}</p>
                    <p className="text-white/60 text-sm">{formatPrice(f.price)}</p>
                    <p className={`text-xs mt-1 ${f.stock < 5 && f.stock > 0 ? "text-amber-400" : f.stock === 0 ? "text-red-400" : "text-white/40"}`}>
                      Stok: {f.stock} • {f.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  async function handleLogin() {
    if (!email || !password) { setError("Email dan password wajib diisi"); return; }
    setLoading(true);
    const success = await adminLogin(email, password);
    setLoading(false);
    if (!success) setError("Email atau password salah");
  }
}
