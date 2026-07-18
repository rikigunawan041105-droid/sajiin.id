"use client";

import { useSajiin } from "@/lib/context";
import { formatPrice } from "@/lib/data";
import { X, Package } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Cooking: "bg-purple-100 text-purple-700",
  Ready: "bg-green-100 text-green-700",
  Completed: "bg-emerald-500 text-white",
  Cancelled: "bg-red-100 text-red-700",
};

export default function History() {
  const { orders, showHistory, setShowHistory } = useSajiin();

  if (!showHistory) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" onClick={() => setShowHistory(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-3xl z-10">
          <h3 className="font-bold text-lg text-dark">Riwayat Pesanan</h3>
          <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium">Belum ada pesanan</p>
              <p className="text-sm mt-1">Pesan menu favorit Anda sekarang!</p>
            </div>
          ) : (
            [...orders].reverse().map((order) => (
              <div key={order.order_number} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-dark">#PR-{order.order_number}</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {order.date} • {order.time} • {order.payment_method}
                </p>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-xs text-gray-600">
                      • {item.quantity}x {item.name} — Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-400">{order.customer_name}</span>
                  <span className="font-bold text-sm text-red">{formatPrice(order.total_price)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
