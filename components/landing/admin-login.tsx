"use client";

import { useState } from "react";
import { useSajiin } from "@/lib/context";
import { X, Lock } from "lucide-react";

export default function AdminLogin() {
  const { showAdminLogin, setShowAdminLogin, adminLogin } = useSajiin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!showAdminLogin) return null;

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }
    const success = adminLogin(email, password);
    if (!success) setError("Email atau password salah");
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4" onClick={() => setShowAdminLogin(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShowAdminLogin(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h3 className="font-serif text-xl font-bold text-dark">Portal Admin SajiIn</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-dark uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red/20 text-sm"
              placeholder="admin@sajiin.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-dark uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red/20 text-sm"
              placeholder="***"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {error && <p className="text-red text-xs text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-dark hover:bg-dark/80 text-white font-semibold rounded-xl transition-all"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
