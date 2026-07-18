import { businessHours } from "@/lib/data";

export default function Hours() {
  return (
    <section className="py-16 sm:py-24 bg-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">Jam Buka SajiIn</h2>
          <p className="text-white/40 mt-2">Kami siap melayani Anda</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {businessHours.map((h) => (
            <div key={h.id} className="bg-white/5 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{h.day_group === "weekday" ? "Hari Kerja" : "Akhir Pekan"}</p>
              <h3 className="text-white font-semibold mb-3">{h.label}</h3>
              <p className="text-2xl font-mono font-bold text-red">
                {h.open_time} — {h.close_time} <span className="text-xs text-white/40">WIB</span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl overflow-hidden max-w-3xl mx-auto h-64">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&h=400&q=80"
            alt="Interior restoran SajiIn"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
