const benefits = [
  { emoji: "🥬", title: "Bahan Segar Organik", desc: "Bahan baku segar dari petani lokal terpercaya" },
  { emoji: "👨‍🍳", title: "Chef Profesional", desc: "Dimasak oleh chef berpengalaman" },
  { emoji: "⚡", title: "Pelayanan Cepat", desc: "Pre-order memudahkan persiapan" },
  { emoji: "💰", title: "Harga Terjangkau", desc: "Kualitas premium harga bersahabat" },
];

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Benefits */}
          <div className="space-y-6">
            <span className="text-red font-semibold text-sm tracking-widest uppercase">Mengapa Kami</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark leading-tight">
              Mengapa Memilih <span className="text-red">SajiIn</span>?
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-3xl">{b.emoji}</span>
                  <h4 className="font-bold text-dark mt-3">{b.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="rounded-3xl overflow-hidden h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&h=700&q=80"
              alt="Hidangan Nasi Goreng Spesial SajiIn"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
