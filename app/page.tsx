"use client";

import { SajiinProvider } from "@/lib/context";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Menu from "@/components/landing/menu";
import About from "@/components/landing/about";
import WhyUs from "@/components/landing/whyus";
import Hours from "@/components/landing/hours";
import Footer from "@/components/landing/footer";
import WhatsApp from "@/components/landing/whatsapp";
import CartDrawer from "@/components/landing/cart-drawer";
import Checkout from "@/components/landing/checkout";
import History from "@/components/landing/history";
import MenuDetail from "@/components/landing/menu-detail";
import AdminLogin from "@/components/landing/admin-login";
import AdminDashboard from "@/components/landing/admin-dashboard";
import Toasts from "@/components/ui/toast";

export default function Home() {
  return (
    <SajiinProvider>
      {/* Global UI */}
      <Toasts />
      <WhatsApp />
      <CartDrawer />
      <Checkout />
      <History />
      <MenuDetail />
      <AdminLogin />
      <AdminDashboard />

      {/* Sections */}
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <WhyUs />
      <Hours />
      <Footer />
    </SajiinProvider>
  );
}
