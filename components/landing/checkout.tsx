"use client";

import { useState } from "react";
import { useSajiin } from "@/lib/context";
import { formatPrice, WA_NUMBER, formatWhatsAppMessage } from "@/lib/data";
import { X, Check, Send } from "lucide-react";

export default function Checkout() {
  const { cart, totalCartPrice, isCheckoutOpen, setIsCheckoutOpen, isConfirmed, setIsConfirmed, submitOrder, lastOrder } = useSajiin();

  const [form, setForm] = useState({
    customer_name: "",
    customer_whatsapp: "",
    date: "",
    time: "",
    notes: "",
    payment_method: "COD",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customer_name.trim()) errs.customer_name = "Nama wajib diisi";
    if (!form.customer_whatsapp.trim()) errs.customer_whatsapp = "Nomor WA wajib diisi";
    else if (!/^62\d{8,}$/.test(form.customer_whatsapp.trim().replace(/\s/g, "")))
      errs.customer_whatsapp = "Gunakan format 62xxx (contoh: 6281234567890)";
    if (!form.date) errs.date = "Tanggal wajib diisi";
    if (!form.time) errs.time = "Jam wajib diisi";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    submitOrder({
      customer_name: form.customer_name,
      customer_whatsapp: form.customer_whatsapp,
      date: form.date,
      time: form.time,
      notes: form.notes,
      payment_method: form.payment_method,
    });
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsConfirmed(false);
  };

  const totalWithFee = totalCartPrice + 2000;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow hover:bg-white transition-colors">
          <X size={20} />
        </button>

        {!isConfirmed ? (
          <div className="p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-bold text-dark mb-6">Checkout Pre-Order</h3>

            <div className="grid md:grid-cols-5 gap-8">
              {/* Form */}
              <div className="md:col-span-3 space-y-4">
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${errors.customer_name ? "border-red" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-red/20 text-sm`}
                    placeholder="Masukkan nama Anda"
                  />
                  {errors.customer_name && <p className="text-red text-xs mt-1">{errors.customer_name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={form.customer_whatsapp}
                    onChange={(e) => setForm({ ...form, customer_whatsapp: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${errors.customer_whatsapp ? "border-red" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-red/20 text-sm`}
                    placeholder="6281234567890"
                  />
                  {errors.customer_whatsapp && <p className="text-red text-xs mt-1">{errors.customer_whatsapp}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-dark uppercase tracking-wider">Tanggal</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${errors.date ? "border-red" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-red/20 text-sm`}
                    />
                    {errors.date && <p className="text-red text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-dark uppercase tracking-wider">Jam Pengambilan</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className={`w-full mt-1 px-4 py-2.5 rounded-xl border ${errors.time ? "border-red" : "border-gray-200"} focus:outline-none focus:ring-2 focus:ring-red/20 text-sm`}
                    />
                    {errors.time && <p className="text-red text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider">Catatan (opsional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red/20 text-sm resize-none"
                    rows={3}
                    placeholder="Catatan untuk pesanan..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider mb-2 block">Metode Pembayaran</label>
                  <div className="flex gap-2">
                    {["COD", "Transfer Bank", "QRIS"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setForm({ ...form, payment_method: method })}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                          form.payment_method === method
                            ? "bg-dark text-white border-dark"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="md:col-span-2 bg-gray-50 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-dark mb-3">Ringkasan Pesanan</h4>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.food_id} className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-dark truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.quantity}x {formatPrice(item.price)}</p>
                      </div>
                      <span className="text-xs font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <hr className="my-3 border-gray-200" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span><span>{formatPrice(totalCartPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Biaya Layanan</span><span>Rp 2.000</span>
                  </div>
                  <div className="flex justify-between font-bold text-dark text-base pt-2 border-t">
                    <span>Total</span><span className="text-red">{formatPrice(totalWithFee)}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-3 bg-dark hover:bg-dark/80 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} /> Konfirmasi Pre-Order
            </button>
          </div>
        ) : (
          /* Confirmation */
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-green-500" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-dark mb-2">Pesanan Berhasil! 🎉</h3>
            <p className="text-gray-500 mb-6">
              Pesanan Anda #PR-{lastOrder?.order_number} telah diterima. Silakan kirim detail melalui WhatsApp untuk konfirmasi.
            </p>

            {lastOrder && (
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left max-w-sm mx-auto space-y-2 text-sm">
                <p><strong>Pesanan:</strong> #{lastOrder.order_number}</p>
                <p><strong>Nama:</strong> {lastOrder.customer_name}</p>
                <p><strong>Tanggal:</strong> {lastOrder.date} {lastOrder.time}</p>
                <p><strong>Bayar:</strong> {lastOrder.payment_method}</p>
                <p><strong>Total:</strong> {formatPrice(lastOrder.total_price)}</p>
              </div>
            )}

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${lastOrder ? formatWhatsAppMessage(lastOrder) : ""}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
            >
              <Send size={18} /> Kirim Pesanan via WhatsApp
            </a>

            <button
              onClick={handleClose}
              className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Kembali ke Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
