import type { Metadata } from "next";
import "./globals.css";

const fontUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap";

export const metadata: Metadata = {
  title: "SajiIn — Restoran Indonesia Premium dengan Pre-Order Online",
  description:
    "SajiIn — restoran Indonesia premium dengan sistem pre-order online. Pesan Nasi Box Rendang, Ayam Bakar, Nasi Kuning & menu favorit lainnya. Outlet di Jakarta & Bandung.",
  keywords:
    "restoran Indonesia, pre-order makanan, nasi box, catering, nasi rendang, ayam bakar, pesan makanan online, catering Jakarta, sajiin",
  authors: [{ name: "SajiIn" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SajiIn",
    title: "SajiIn — Restoran Indonesia Premium dengan Pre-Order Online",
    description:
      "Pesan menu favorit restoran Indonesia dengan sistem pre-order online. Nasi Box Rendang, Ayam Bakar, Nasi Kuning & banyak lagi!",
    images: [
      {
        url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SajiIn — Restoran Indonesia Premium",
    description: "Pesan menu favorit restoran Indonesia dengan pre-order online.",
    images: ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
        <meta name="google-site-verification" content="L2emkQq1TC3ltHweiy_0SBxCeOYuq6xGpDrtI46LM4k" />
        {/* Schema.org Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "@id": "https://sajiin.vercel.app/#restaurant",
              name: "SajiIn",
              description: "Restoran Indonesia premium dengan sistem pre-order online. Hidangan Nusantara dengan bahan organik pilihan.",
              url: "https://sajiin.vercel.app",
              telephone: "+62-831-5667-4586",
              servesCuisine: "Indonesian",
              priceRange: "$$",
              image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&h=630&q=80",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jakarta Selatan",
                addressRegion: "DKI Jakarta",
                addressCountry: "ID",
                streetAddress: "Senopati Raya No. 45, Kebayoran Baru",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "21:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "22:00" },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
