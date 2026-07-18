export default function About() {
  const benefits = [
    { emoji: "✅", text: "Sanitasi Higienis" },
    { emoji: "🌱", text: "Bahan Organik" },
    { emoji: "👨‍🍳", text: "Pengolahan Presisi" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <span className="text-red font-semibold text-sm tracking-widest uppercase">Tentang Kami</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-dark leading-tight">
              Dapur Kami — <br />
              <span className="text-red">Cita Rasa</span> Otentik
            </h2>
            <p className="text-gray-500 leading-relaxed">
              SajiIn hadir untuk membawa cita rasa Nusantara autentik ke meja Anda.
              Kami percaya bahwa makanan berkualitas dimulai dari bahan terbaik.
              Setiap hidangan dimasak dengan resep turun-temurun dan teknik modern.
            </p>

            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <span className="text-lg">{b.emoji}</span>
                  <span className="text-dark font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-40 sm:h-48">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=450&q=80"
                  alt="Proses memasak SajiIn — pengolahan hidangan presisi"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-56 sm:h-64">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&h=700&q=80"
                  alt="Suasana restoran SajiIn"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="rounded-2xl overflow-hidden h-64 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&h=700&q=80"
                  alt="Chef SajiIn memasak hidangan"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
