// Data statis untuk SajiIn - sama seperti di Laravel

export interface FoodItem {
  food_id: string;
  name: string;
  price: number;
  category: "makanan" | "cemilan" | "minuman";
  image: string;
  rating: number;
  description: string;
  composition: string;
  spiciness: number;
  stock: number;
  available: boolean;
  pre_order_time: string | null;
}

export interface Outlet {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string | null;
  email: string | null;
  google_maps_link: string | null;
  is_main: boolean;
}

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
}

export interface BusinessHour {
  id: number;
  day_group: string;
  label: string;
  open_time: string;
  close_time: string;
}

export interface OrderItem {
  food_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  order_number: number;
  customer_name: string;
  customer_whatsapp: string;
  date: string;
  time: string;
  notes: string;
  total_price: number;
  payment_method: string;
  status: string;
  items: OrderItem[];
}

export interface CartItem {
  food_id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  max_stock: number;
}

// ==================== DATA MAKANAN ====================
export const foods: FoodItem[] = [
  {
    food_id: "nasi-box-rendang",
    name: "Nasi Box Rendang",
    price: 55000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.9,
    description: "Nasi box premium dengan rendang sapi khas Padang, dilengkapi sayur nangka, balado telur, dan kerupuk. Porsi besar!",
    composition: "Nasi Putih Premium, Daging Sapi, Santan, Cabai, Serai, Lengkuas, Daun Jeruk, Telur, Nangka Muda, Kerupuk Udang",
    spiciness: 3,
    stock: 25,
    available: true,
    pre_order_time: "2 Jam"
  },
  {
    food_id: "ayam-bakar",
    name: "Ayam Bakar",
    price: 45000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.8,
    description: "Ayam bakar bumbu kecap dengan sambal terasi dan lalapan segar. Dimasak dengan teknik bakar tradisional.",
    composition: "Ayam Negeri, Kecap Manis, Bawang Merah, Bawang Putih, Jahe, Kunyit, Ketumbar, Terasi, Cabai",
    spiciness: 2,
    stock: 30,
    available: true,
    pre_order_time: "1.5 Jam"
  },
  {
    food_id: "nasi-kuning",
    name: "Nasi Kuning",
    price: 50000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.7,
    description: "Nasi kuning komplit dengan ayam goreng, telur balado, perkedel, sambal goreng kentang, dan abon sapi.",
    composition: "Nasi Kuning, Ayam Kampung, Telur, Kentang, Kacang Panjang, Santan, Kunyit, Serai, Daun Salam",
    spiciness: 1,
    stock: 20,
    available: true,
    pre_order_time: "3 Jam"
  },
  {
    food_id: "kebuli-ayam",
    name: "Kebuli Ayam",
    price: 60000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.6,
    description: "Nasi kebuli ayam dengan rempah khas Timur Tengah, ayam panggang, dan acar segar. Nasi beraroma.",
    composition: "Nasi Basmati, Ayam Negeri, Susu Kambing, Bawang Merah, Bawang Putih, Kapulaga, Cengkeh, Kayu Manis",
    spiciness: 1,
    stock: 15,
    available: true,
    pre_order_time: "3 Jam"
  },
  {
    food_id: "nasi-box-ayam",
    name: "Nasi Box Ayam Geprek",
    price: 40000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.5,
    description: "Nasi box dengan ayam geprek pedas, sambal bawang segar, lalapan, dan sambal terasi ekstra.",
    composition: "Nasi Putih, Ayam Negeri, Tepung Beras, Bawang Putih, Cabai Rawit, Terasi, Timun, Kemangi, Kol",
    spiciness: 4,
    stock: 2,
    available: true,
    pre_order_time: "1 Jam"
  },
  {
    food_id: "dimsum",
    name: "Dimsum Ayam Udang",
    price: 25000,
    category: "cemilan",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.9,
    description: "Dimsum ayam udang pilihan, kulit tipis isi padat. Disajikan dengan saus sambal spesial SajiIn.",
    composition: "Daging Ayam, Udang, Tepung Tapioka, Wortel, Bawang Putih, Jahe, Kecap Asin, Minyak Wijen",
    spiciness: 1,
    stock: 50,
    available: true,
    pre_order_time: "30 Menit"
  },
  {
    food_id: "pisang-coklat",
    name: "Pisang Coklat Lumer",
    price: 15000,
    category: "cemilan",
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.6,
    description: "Pisang goreng crispy dengan taburan coklat lumer dan keju. Cocok untuk teman santai.",
    composition: "Pisang Raja, Tepung Terigu, Coklat Bubuk, Keju Cheddar, Mentega, Susu Kental Manis, Gula",
    spiciness: 0,
    stock: 40,
    available: true,
    pre_order_time: "15 Menit"
  },
  {
    food_id: "es-cendol",
    name: "Es Cendol",
    price: 12000,
    category: "minuman",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.7,
    description: "Es cendol segar dengan santan asli dan gula merah murni. Minuman tradisional favorit semua kalangan.",
    composition: "Tepung Beras, Tepung Hunkwe, Santan Kelapa, Gula Merah, Daun Pandan, Es Batu",
    spiciness: 0,
    stock: 60,
    available: true,
    pre_order_time: "10 Menit"
  },
  {
    food_id: "es-jeruk",
    name: "Es Jeruk Segar",
    price: 10000,
    category: "minuman",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.5,
    description: "Es jeruk peras asli dengan manis pas. Menyegarkan tenggorokan di kala bersantap.",
    composition: "Jeruk Peras, Gula, Es Batu, Air Mineral",
    spiciness: 0,
    stock: 80,
    available: true,
    pre_order_time: "5 Menit"
  },
  {
    food_id: "nasi-goreng",
    name: "Nasi Goreng Spesial",
    price: 45000,
    category: "makanan",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&h=300&q=80",
    rating: 4.5,
    description: "Nasi goreng spesial SajiIn dengan telur ceplok setengah matang, ayam suwir, udang dan kerupuk.",
    composition: "Nasi Putih, Telur Ayam, Daging Ayam, Udang, Kecap Manis, Bawang Merah, Bawang Putih, Cabai, Kerupuk",
    spiciness: 2,
    stock: 0,
    available: false,
    pre_order_time: "20 Menit"
  }
];

export const outlets: Outlet[] = [
  {
    id: 1,
    name: "SajiIn Senopati",
    address: "Senopati Raya No. 45, Kebayoran Baru",
    city: "Jakarta Selatan",
    phone: "+62-831-5667-4586",
    email: "hello@sajiin.com",
    google_maps_link: "https://goo.gl/maps/example1",
    is_main: true
  },
  {
    id: 2,
    name: "SajiIn Kelapa Gading",
    address: "Boulevard Kelapa Gading Blok A1 No. 12",
    city: "Jakarta Utara",
    phone: "+62-831-5667-4587",
    email: "kelapagading@sajiin.com",
    google_maps_link: "https://goo.gl/maps/example2",
    is_main: false
  },
  {
    id: 3,
    name: "SajiIn Dago",
    address: "Jl. Ir. H. Juanda No. 88, Dago",
    city: "Bandung",
    phone: "+62-831-5667-4588",
    email: "dago@sajiin.com",
    google_maps_link: "https://goo.gl/maps/example3",
    is_main: false
  }
];

export const socialMedia: SocialMedia[] = [
  { id: 1, platform: "instagram", url: "https://instagram.com/sajiin", icon: null },
  { id: 2, platform: "facebook", url: "https://facebook.com/sajiin", icon: null },
  { id: 3, platform: "twitter", url: "https://twitter.com/sajiin", icon: null }
];

export const businessHours: BusinessHour[] = [
  { id: 1, day_group: "weekday", label: "Senin - Jumat", open_time: "11:00", close_time: "21:00" },
  { id: 2, day_group: "weekend", label: "Sabtu - Minggu", open_time: "10:00", close_time: "22:00" }
];

export const WA_NUMBER = "6283156674586";
export const WA_DISPLAY = "0831-5667-4586";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
}

export function generateOrderNumber(): number {
  return 1000 + Math.floor(Math.random() * 9000);
}

export function getNextOrderNumber(): number {
  if (typeof window === "undefined") return 1001;
  const orders = JSON.parse(localStorage.getItem("sajiin_orders") || "[]") as Order[];
  if (orders.length === 0) return 1001;
  return Math.max(...orders.map((o) => o.order_number)) + 1;
}

export function formatWhatsAppMessage(order: Order): string {
  const itemsText = order.items
    .map((i) => `• ${i.quantity}x ${i.name} — Rp ${i.price.toLocaleString("id-ID")}`)
    .join("\n");
  return encodeURIComponent(
    `Halo SajiIn! Saya mau pre-order:\n\n` +
    `📋 *Pesanan #PR-${order.order_number}*\n` +
    `${itemsText}\n\n` +
    `💵 *Total: Rp ${order.total_price.toLocaleString("id-ID")}*\n` +
    `📅 Tanggal: ${order.date}\n` +
    `⏰ Jam: ${order.time}\n` +
    `💳 Bayar: ${order.payment_method}\n` +
    `${order.notes ? `📝 Catatan: ${order.notes}\n` : ""}\n` +
    `Mohon konfirmasi ya, terima kasih! 🙏`
  );
}
