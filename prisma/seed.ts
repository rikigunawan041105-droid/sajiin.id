import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const foods = [
    { food_id: "nasi-box-rendang", name: "Nasi Box Rendang", price: 55000, category: "makanan", image: "/images/rendang.jpg", rating: 4.9, description: "Nasi box premium dengan rendang daging sapi khas, dilengkapi sayur nangka dan kerupuk.", composition: "Nasi Putih Premium, Daging Sapi, Santan, Cabai, Serai, Lengkuas, Telur, Nangka Muda, Kerupuk Udang", spiciness: 3, stock: 25, available: true, pre_order_time: "2 Jam" },
    { food_id: "ayam-bakar", name: "Ayam Bakar", price: 45000, category: "makanan", image: "/images/ayam-bakar.jpg", rating: 4.8, description: "Ayam bakar bumbu kecap dengan sambal terasi dan lalapan segar.", composition: "Ayam Negeri, Kecap Manis, Bawang Merah, Bawang Putih, Jahe, Kunyit, Ketumbar, Terasi, Cabai", spiciness: 2, stock: 30, available: true, pre_order_time: "1.5 Jam" },
    { food_id: "nasi-kuning", name: "Nasi Kuning", price: 50000, category: "makanan", image: "/images/nasi-kuning.jpg", rating: 4.7, description: "Nasi Kuning komplit dengan ayam goreng, telur balado, perkedel, sambal goreng kentang, dan abon sapi.", composition: "Nasi Kuning, Ayam Kampung, Telur, Kentang, Kacang Panjang, Santan, Kunyit, Serai, Daun Salam", spiciness: 1, stock: 20, available: true, pre_order_time: "3 Jam" },
    { food_id: "nasi-kebuli", name: "Nasi Kebuli", price: 60000, category: "makanan", image: "/images/kebuli.jpg", rating: 4.6, description: "Nasi kebuli ayam dengan rempah khas Timur Tengah, ayam panggang, dan acar segar.", composition: "Nasi Basmati, Ayam Negeri, Susu Kambing, Bawang Merah, Bawang Putih, Kapulaga, Cengkeh, Kayu Manis", spiciness: 1, stock: 15, available: true, pre_order_time: "3 Jam" },
    { food_id: "ayam-geprek", name: "Ayam Geprek", price: 40000, category: "makanan", image: "/images/ayam-geprek.jpg", rating: 4.5, description: "Ayam geprek pedas dengan sambal bawang segar dan lalapan.", composition: "Nasi Putih, Ayam Negeri, Tepung Beras, Bawang Putih, Cabai Rawit, Terasi, Timun, Kemangi, Kol", spiciness: 4, stock: 30, available: true, pre_order_time: "1 Jam" },
    { food_id: "nasi-goreng", name: "Hidangan Prasmanan", price: 45000, category: "makanan", image: "/images/nasi-goreng.jpg", rating: 4.5, description: "Hidangan prasmanan istimewa dengan aneka lauk pilihan.", composition: "Nasi, Aneka Lauk, Sayur, Bumbu Spesial", spiciness: 1, stock: 25, available: true, pre_order_time: "20 Menit" },
    { food_id: "salmon-sushi", name: "Salmon Sushi", price: 35000, category: "makanan", image: "/images/sate.jpg", rating: 4.7, description: "Salmon sushi segar dengan nasi Jepang dan wasabi.", composition: "Salmon Segar, Nasi Sushi, Wasabi, Kecap Asin, Rumput Laut", spiciness: 0, stock: 40, available: true, pre_order_time: "30 Menit" },
    { food_id: "mie-ayam", name: "Mie Ayam", price: 25000, category: "makanan", image: "/images/mie-ayam.jpg", rating: 4.8, description: "Mie ayam topping ayam cincang bumbu kecap, pangsit, dilengkapi kuah kaldu.", composition: "Mie Telur, Daging Ayam, Kecap Manis, Bawang Putih, Daun Bawang, Pangsit, Sayuran Segar", spiciness: 1, stock: 35, available: true, pre_order_time: "15 Menit" },
    { food_id: "soto-ayam", name: "Soto Ayam", price: 30000, category: "makanan", image: "/images/soto.jpg", rating: 4.6, description: "Soto ayam kuah kuning segar dengan suwiran ayam, bihun, telur rebus, dan krupuk.", composition: "Ayam Kampung, Kunyit, Serai, Daun Jeruk, Bihun, Telur Rebus, Tauge, Krupuk, Bawang Goreng", spiciness: 1, stock: 30, available: true, pre_order_time: "30 Menit" },
    { food_id: "rendang-sapi", name: "Rendang Sapi", price: 45000, category: "makanan", image: "/images/nasi-padang.jpg", rating: 4.7, description: "Rendang daging sapi dengan bumbu rempah pilihan.", composition: "Nasi Putih, Daging Sapi, Santan, Cabai, Bumbu Rempah, Serai, Daun Jeruk", spiciness: 3, stock: 20, available: true, pre_order_time: "2 Jam" },
    { food_id: "nasi-campur", name: "Nasi Ikan Kari", price: 30000, category: "makanan", image: "/images/capcay.jpg", rating: 4.4, description: "Nasi dengan ikan kari dan sayuran segar.", composition: "Nasi, Ikan Kari, Sayuran, Bumbu Rempah", spiciness: 1, stock: 30, available: true, pre_order_time: "15 Menit" },
    { food_id: "dimsum", name: "Dimsum", price: 25000, category: "cemilan", image: "/images/dimsum.jpg", rating: 4.9, description: "Dimsum ayam udang pilihan, kulit tipis isi padat.", composition: "Daging Ayam, Udang, Tepung Tapioka, Wortel, Bawang Putih, Jahe, Kecap Asin", spiciness: 1, stock: 50, available: true, pre_order_time: "30 Menit" },
    { food_id: "coklat-lumer", name: "Coklat Lumer", price: 25000, category: "cemilan", image: "/images/pisang-coklat.jpg", rating: 4.6, description: "Coklat lumer dengan buah segar.", composition: "Coklat Bubuk, Susu, Gula, Buah Segar", spiciness: 0, stock: 40, available: true, pre_order_time: "15 Menit" },
    { food_id: "salad-segar", name: "Salad Segar", price: 20000, category: "cemilan", image: "/images/risol.jpg", rating: 4.5, description: "Salad sayuran segar dengan dressing spesial.", composition: "Sayuran Segar, Saus, Mayonaise, Bumbu", spiciness: 0, stock: 25, available: true, pre_order_time: "10 Menit" },
    { food_id: "mie-kuah", name: "Mie Kuah", price: 25000, category: "makanan", image: "/images/kentang-goreng.jpg", rating: 4.3, description: "Mie kuah dengan topping ayam, pangsit, dan sayuran segar.", composition: "Mie Telur, Ayam, Pangsit, Sayuran, Bawang Goreng", spiciness: 1, stock: 50, available: true, pre_order_time: "15 Menit" },
    { food_id: "pancake-manis", name: "Pancake Manis", price: 22000, category: "cemilan", image: "/images/lumpia.jpg", rating: 4.4, description: "Pancake lembut dengan topping manis.", composition: "Tepung Terigu, Telur, Susu, Gula, Mentega", spiciness: 0, stock: 30, available: true, pre_order_time: "15 Menit" },
    { food_id: "pizza-roti", name: "Pizza Roti", price: 25000, category: "cemilan", image: "/images/bakwan-jagung.jpg", rating: 4.3, description: "Pizza roti dengan topping keju meleleh.", composition: "Roti, Keju, Saus Tomat, Bumbu", spiciness: 0, stock: 35, available: true, pre_order_time: "15 Menit" },
    { food_id: "coklat-susu", name: "Coklat Susu", price: 12000, category: "minuman", image: "/images/es-cendol.jpg", rating: 4.7, description: "Coklat susu segar.", composition: "Coklat Bubuk, Susu, Gula, Es Batu", spiciness: 0, stock: 60, available: true, pre_order_time: "10 Menit" },
    { food_id: "es-jeruk", name: "Es Jeruk", price: 10000, category: "minuman", image: "/images/es-jeruk.jpg", rating: 4.5, description: "Es jeruk peras asli.", composition: "Jeruk Peras, Gula, Es Batu, Air Mineral", spiciness: 0, stock: 80, available: true, pre_order_time: "5 Menit" },
    { food_id: "es-teh", name: "Es Teh Manis", price: 8000, category: "minuman", image: "/images/es-teh.jpg", rating: 4.3, description: "Es teh manis segar.", composition: "Teh Hitam, Gula Pasir, Es Batu, Air Mineral", spiciness: 0, stock: 100, available: true, pre_order_time: "5 Menit" },
    { food_id: "jus-alpukat", name: "Jus Alpukat", price: 15000, category: "minuman", image: "/images/jus-alpukat.jpg", rating: 4.6, description: "Jus alpukat kental dengan susu.", composition: "Alpukat Matang, Susu Coklat, Susu Kental Manis, Es Batu", spiciness: 0, stock: 40, available: true, pre_order_time: "10 Menit" },
  ];

  for (const food of foods) {
    await prisma.food.upsert({
      where: { food_id: food.food_id },
      update: food,
      create: food,
    });
  }

  await prisma.outlet.createMany({ data: [
    { name: "SajiIn Senopati", address: "Senopati Raya No. 45, Kebayoran Baru", city: "Jakarta Selatan", phone: "+62-831-5667-4586", email: "hello@sajiin.com", google_maps_link: "https://goo.gl/maps/example1", is_main: true },
    { name: "SajiIn Kelapa Gading", address: "Boulevard Kelapa Gading Blok A1 No. 12", city: "Jakarta Utara", phone: "+62-831-5667-4587", email: "kelapagading@sajiin.com", google_maps_link: "https://goo.gl/maps/example2", is_main: false },
    { name: "SajiIn Dago", address: "Jl. Ir. H. Juanda No. 88, Dago", city: "Bandung", phone: "+62-831-5667-4588", email: "dago@sajiin.com", google_maps_link: "https://goo.gl/maps/example3", is_main: false },
  ], skipDuplicates: true });

  await prisma.socialMedia.createMany({ data: [
    { platform: "instagram", url: "https://instagram.com/sajiin" },
    { platform: "facebook", url: "https://facebook.com/sajiin" },
    { platform: "twitter", url: "https://twitter.com/sajiin" },
  ], skipDuplicates: true });

  await prisma.businessHour.createMany({ data: [
    { day_group: "weekday", label: "Senin - Jumat", open_time: "11:00", close_time: "21:00" },
    { day_group: "weekend", label: "Sabtu - Minggu", open_time: "10:00", close_time: "22:00" },
  ], skipDuplicates: true });

  console.log("✅ Seed berhasil!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
