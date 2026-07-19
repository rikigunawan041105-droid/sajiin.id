"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { FoodItem, Order, CartItem, getFoods, getOrders, createOrder, updateOrderStatus } from "@/lib/firestore";

interface SajiinContextType {
  foods: FoodItem[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  filteredFoods: FoodItem[];
  selectedFood: FoodItem | null;
  setSelectedFood: (f: FoodItem | null) => void;
  cart: CartItem[];
  addToCart: (food_id: string) => void;
  updateQty: (food_id: string, qty: number) => void;
  removeFromCart: (food_id: string) => void;
  totalCartItems: number;
  totalCartPrice: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (o: boolean) => void;
  isConfirmed: boolean;
  setIsConfirmed: (o: boolean) => void;
  submitOrder: (data: any) => void;
  lastOrder: Order | null;
  orders: Order[];
  showHistory: boolean;
  setShowHistory: (s: boolean) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  showAdminDashboard: boolean;
  setShowAdminDashboard: (s: boolean) => void;
  updateOrderStatusFn: (orderNumber: number, status: string) => Promise<void>;
  showCart: boolean;
  setShowCart: (s: boolean) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (s: boolean) => void;
  activeAdminTab: string;
  setActiveAdminTab: (t: string) => void;
  scrollToSection: (id: string) => void;
  toasts: Toast[];
  addToast: (msg: string, type?: "success" | "error" | "info") => void;
}

interface Toast { id: number; message: string; type: "success" | "error" | "info"; }

const SajiinContext = createContext<SajiinContextType | null>(null);

export function SajiinProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState("overview");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // Load data dari Firestore
  useEffect(() => {
    getFoods().then(setFoods).catch(() => {});
    getOrders().then(setOrders).catch(() => {});
  }, []);

  // Load cart dari localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("sajiin_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => { localStorage.setItem("sajiin_cart", JSON.stringify(cart)); }, [cart]);

  const filteredFoods = selectedCategory === "semua" ? foods : foods.filter((f) => f.category === selectedCategory);

  const addToCart = useCallback((food_id: string) => {
    const food = foods.find((f) => f.food_id === food_id);
    if (!food || !food.available) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.food_id === food_id);
      if (existing) {
        if (existing.quantity >= food.stock) return prev;
        return prev.map((c) => (c.food_id === food_id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { food_id: food.food_id, name: food.name, price: food.price, image: food.image, quantity: 1, max_stock: food.stock }];
    });
    addToast(`${food.name} ditambahkan ke keranjang!`, "success");
  }, [foods, addToast]);

  const updateQty = useCallback((food_id: string, qty: number) => {
    setCart((prev) => prev.map((c) => (c.food_id === food_id ? { ...c, quantity: Math.max(0, Math.min(qty, c.max_stock)) } : c)));
  }, []);

  const removeFromCart = useCallback((food_id: string) => {
    setCart((prev) => prev.filter((c) => c.food_id !== food_id));
  }, []);

  const totalCartItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalCartPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  const submitOrder = useCallback(async (data: any) => {
    try {
      const order: Order = {
        order_number: Date.now() % 100000,
        customer_name: data.customer_name,
        customer_whatsapp: data.customer_whatsapp,
        date: data.date,
        time: data.time,
        notes: data.notes,
        total_price: totalCartPrice + 2000,
        payment_method: data.payment_method,
        status: "Pending",
        items: cart.map((c) => ({ food_id: c.food_id, name: c.name, price: c.price, quantity: c.quantity })),
        createdAt: new Date().toISOString(),
      };
      await createOrder(order);
      setOrders((prev) => [order, ...prev]);
      setLastOrder(order);
      setIsConfirmed(true);
      setCart([]);
      addToast("Pesanan berhasil dikirim!", "success");
    } catch { addToast("Gagal mengirim pesanan", "error"); }
  }, [cart, totalCartPrice, addToast]);

  const adminLogin = useCallback(async (email: string, password: string) => {
    if (email === "admin@sajiin.com" && password === "admin123") {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
      return true;
    }
    addToast("Email atau password salah", "error");
    return false;
  }, [addToast]);

  const adminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
    setShowAdminDashboard(false);
  }, []);

  const updateOrderStatusFn = useCallback(async (orderNumber: number, status: string) => {
    await updateOrderStatus(orderNumber, status);
    setOrders((prev) => prev.map((o) => (o.order_number === orderNumber ? { ...o, status } : o)));
    addToast(`Status pesanan #${orderNumber} diubah`, "success");
  }, [addToast]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <SajiinContext.Provider value={{
      foods, selectedCategory, setSelectedCategory, filteredFoods, selectedFood, setSelectedFood,
      cart, addToCart, updateQty, removeFromCart, totalCartItems, totalCartPrice,
      isCheckoutOpen, setIsCheckoutOpen, isConfirmed, setIsConfirmed, submitOrder, lastOrder,
      orders, showHistory, setShowHistory, isAdminLoggedIn, adminLogin, adminLogout,
      showAdminDashboard, setShowAdminDashboard, updateOrderStatusFn,
      showCart, setShowCart, showAdminLogin, setShowAdminLogin, activeAdminTab, setActiveAdminTab,
      scrollToSection, toasts, addToast,
    }}>
      {children}
    </SajiinContext.Provider>
  );
}

export function useSajiin() {
  const ctx = useContext(SajiinContext);
  if (!ctx) throw new Error("useSajiin must be used within SajiinProvider");
  return ctx;
}
