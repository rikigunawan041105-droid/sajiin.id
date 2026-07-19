"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const menuData = [
  { food_id: "nasi-box-rendang", name: "Nasi Box Rendang", price: 55000, category: "makanan", image: "/images/rendang.jpg", rating: 4.9, description: "Nasi box premium dengan rendang daging sapi khas.", composition: "Nasi Putih Premium, Daging Sapi, Santan, Cabai", spiciness: 3, stock: 25, available: true, pre_order_time: "2 Jam" },
  { food_id: "ayam-bakar", name: "Ayam Bakar", price: 45000, category: "makanan", image: "/images/ayam-bakar.jpg", rating: 4.8, description: "Ayam bakar bumbu kecap dengan sambal terasi.", composition: "Ayam Negeri, Kecap Manis, Bawang Merah, Jahe", spiciness: 2, stock: 30, available: true, pre_order_time: "1.5 Jam" },
  { food_id: "nasi-kuning", name: "Nasi Kuning", price: 50000, category: "makanan", image: "/images/nasi-kuning.jpg", rating: 4.7, description: "Nasi Kuning komplit dengan ayam goreng.", composition: "Nasi Kuning, Ayam Kampung, Telur, Kentang", spiciness: 1, stock: 20, available: true, pre_order_time: "3 Jam" },
  { food_id: "nasi-kebuli", name: "Nasi Kebuli", price: 60000, category: "makanan", image: "/images/kebuli.jpg", rating: 4.6, description: "Nasi kebuli ayam dengan rempah khas.", composition: "Nasi Basmati, Ayam Negeri, Kapulaga, Kayu Manis", spiciness: 1, stock: 15, available: true, pre_order_time: "3 Jam" },
  { food_id: "ayam-geprek", name: "Ayam Geprek", price: 40000, category: "makanan", image: "/images/ayam-geprek.jpg", rating: 4.5, description: "Ayam geprek pedas dengan sambal bawang.", composition: "Ayam Negeri, Tepung Beras, Cabai Rawit, Kemangi", spiciness: 4, stock: 30, available: true, pre_order_time: "1 Jam" },
  { food_id: "nasi-goreng", name: "Nasi Goreng Spesial", price: 45000, category: "makanan", image: "/images/nasi-goreng.jpg", rating: 4.5, description: "Nasi goreng spesial dengan telur dan ayam.", composition: "Nasi Putih, Telur, Ayam, Kecap Manis, Cabai", spiciness: 2, stock: 25, available: true, pre_order_time: "20 Menit" },
  { food_id: "salmon-sushi", name: "Salmon Sushi", price: 35000, category: "makanan", image: "/images/sate.jpg", rating: 4.7, description: "Salmon sushi segar dengan nasi Jepang.", composition: "Salmon, Nasi Sushi, Wasabi, Kecap Asin", spiciness: 0, stock: 40, available: true, pre_order_time: "30 Menit" },
  { food_id: "mie-ayam", name: "Mie Ayam", price: 25000, category: "makanan", image: "/images/mie-ayam.jpg", rating: 4.8, description: "Mie ayam topping ayam cincang bumbu kecap.", composition: "Mie Telur, Daging Ayam, Pangsit, Sayuran", spiciness: 1, stock: 35, available: true, pre_order_time: "15 Menit" },
  { food_id: "soto-ayam", name: "Soto Ayam", price: 30000, category: "makanan", image: "/images/soto.jpg", rating: 4.6, description: "Soto ayam kuah kuning segar.", composition: "Ayam Kampung, Kunyit, Bihun, Telur, Krupuk", spiciness: 1, stock: 30, available: true, pre_order_time: "30 Menit" },
  { food_id: "rendang-sapi", name: "Rendang Sapi", price: 45000, category: "makanan", image: "/images/nasi-padang.jpg", rating: 4.7, description: "Rendang daging sapi bumbu rempah.", composition: "Daging Sapi, Santan, Cabai, Serai, Daun Jeruk", spiciness: 3, stock: 20, available: true, pre_order_time: "2 Jam" },
  { food_id: "nasi-campur", name: "Nasi Ikan Kari", price: 30000, category: "makanan", image: "/images/capcay.jpg", rating: 4.4, description: "Nasi dengan ikan kari dan sayuran.", composition: "Nasi, Ikan Kari, Sayuran, Bumbu Rempah", spiciness: 1, stock: 30, available: true, pre_order_time: "15 Menit" },
  { food_id: "dimsum", name: "Dimsum", price: 25000, category: "cemilan", image: "/images/dimsum.jpg", rating: 4.9, description: "Dimsum ayam udang pilihan.", composition: "Ayam, Udang, Tepung Tapioka, Jahe, Kecap Asin", spiciness: 1, stock: 50, available: true, pre_order_time: "30 Menit" },
  { food_id: "coklat-lumer", name: "Coklat Lumer", price: 25000, category: "cemilan", image: "/images/pisang-coklat.jpg", rating: 4.6, description: "Coklat lumer dengan buah segar.", composition: "Coklat Bubuk, Susu, Gula, Buah Segar", spiciness: 0, stock: 40, available: true, pre_order_time: "15 Menit" },
  { food_id: "salad-segar", name: "Salad Segar", price: 20000, category: "cemilan", image: "/images/risol.jpg", rating: 4.5, description: "Salad sayuran segar.", composition: "Sayuran Segar, Saus, Mayonaise", spiciness: 0, stock: 25, available: true, pre_order_time: "10 Menit" },
  { food_id: "mie-kuah", name: "Mie Kuah", price: 25000, category: "makanan", image: "/images/kentang-goreng.jpg", rating: 4.3, description: "Mie kuah topping ayam.", composition: "Mie Telur, Ayam, Pangsit, Bawang Goreng", spiciness: 1, stock: 50, available: true, pre_order_time: "15 Menit" },
  { food_id: "pancake-manis", name: "Pancake Manis", price: 22000, category: "cemilan", image: "/images/lumpia.jpg", rating: 4.4, description: "Pancake lembut dengan topping manis.", composition: "Tepung, Telur, Susu, Gula, Mentega", spiciness: 0, stock: 30, available: true, pre_order_time: "15 Menit" },
  { food_id: "pizza-roti", name: "Pizza Roti", price: 25000, category: "cemilan", image: "/images/bakwan-jagung.jpg", rating: 4.3, description: "Pizza roti topping keju.", composition: "Roti, Keju, Saus Tomat", spiciness: 0, stock: 35, available: true, pre_order_time: "15 Menit" },
  { food_id: "coklat-susu", name: "Coklat Susu", price: 12000, category: "minuman", image: "/images/es-cendol.jpg", rating: 4.7, description: "Coklat susu segar.", composition: "Coklat, Susu, Gula, Es Batu", spiciness: 0, stock: 60, available: true, pre_order_time: "10 Menit" },
  { food_id: "es-jeruk", name: "Es Jeruk", price: 10000, category: "minuman", image: "/images/es-jeruk.jpg", rating: 4.5, description: "Es jeruk peras asli.", composition: "Jeruk Peras, Gula, Es Batu", spiciness: 0, stock: 80, available: true, pre_order_time: "5 Menit" },
  { food_id: "es-teh", name: "Es Teh Manis", price: 8000, category: "minuman", image: "/images/es-teh.jpg", rating: 4.3, description: "Es teh manis segar.", composition: "Teh, Gula, Es Batu", spiciness: 0, stock: 100, available: true, pre_order_time: "5 Menit" },
  { food_id: "jus-alpukat", name: "Jus Alpukat", price: 15000, category: "minuman", image: "/images/jus-alpukat.jpg", rating: 4.6, description: "Jus alpukat kental.", composition: "Alpukat, Susu Coklat, Kental Manis, Es Batu", spiciness: 0, stock: 40, available: true, pre_order_time: "10 Menit" },
];

export default function SeedPage() {
  const [status, setStatus] = useState("Menunggu...");

  useEffect(() => {
    const run = async () => {
      try {
        for (const item of menuData) {
          await setDoc(doc(db, "foods", item.food_id), item);
        }
        setStatus("✅ Seed berhasil! " + menuData.length + " menu masuk Firestore.");
      } catch (e: any) {
        setStatus("❌ Error: " + e.message);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Seed Firestore</h1>
        <p>{status}</p>
        <a href="/" className="mt-6 inline-block text-red-500 underline">Kembali</a>
      </div>
    </div>
  );
}
