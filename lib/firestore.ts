import { db } from "./firebase";
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, setDoc
} from "firebase/firestore";

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
  createdAt: string;
}

export interface OrderItem {
  food_id: string;
  name: string;
  price: number;
  quantity: number;
}

const foodsRef = collection(db, "foods");
const ordersRef = collection(db, "orders");
const outletsRef = collection(db, "outlets");
const socialRef = collection(db, "socialMedia");
const hoursRef = collection(db, "businessHours");

// =========== FOODS ===========
export async function getFoods(): Promise<FoodItem[]> {
  const q = query(foodsRef, orderBy("food_id"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), food_id: d.id } as FoodItem));
}

export async function seedFoods(foods: FoodItem[]) {
  for (const f of foods) {
    await setDoc(doc(foodsRef, f.food_id), f);
  }
}

// =========== ORDERS ===========
export async function getOrders(): Promise<Order[]> {
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data() } as Order));
}

export async function createOrder(order: Order): Promise<string> {
  const ref = await addDoc(ordersRef, order);
  return ref.id;
}

export async function updateOrderStatus(orderNumber: number, status: string) {
  const q = query(ordersRef);
  const snap = await getDocs(q);
  const target = snap.docs.find((d) => d.data().order_number === orderNumber);
  if (target) await updateDoc(doc(ordersRef, target.id), { status });
}

// =========== OUTLETS ===========
export async function getOutlets() {
  const snap = await getDocs(outletsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// =========== SOCIAL MEDIA ===========
export async function getSocialMedia() {
  const snap = await getDocs(socialRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// =========== BUSINESS HOURS ===========
export async function getBusinessHours() {
  const snap = await getDocs(hoursRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
