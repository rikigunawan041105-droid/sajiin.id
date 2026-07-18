"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItem, Order, foods as allFoods } from "@/lib/data";

interface SajiinContextType {
  // Foods
  foods: typeof allFoods;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  filteredFoods: typeof allFoods;
  selectedFood: (typeof allFoods)[0] | null;
  setSelectedFood: (f: (typeof allFoods)[0] | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (food_id: string) => void;
  updateQty: (food_id: string, qty: number) => void;
  removeFromCart: (food_id: string) => void;
  totalCartItems: number;
  totalCartPrice: number;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (o: boolean) => void;
  isConfirmed: boolean;
  setIsConfirmed: (o: boolean) => void;
  submitOrder: (data: {
    customer_name: string;
    customer_whatsapp: string;
    date: string;
    time: string;
    notes: string;
    payment_method: string;
  }) => void;
  lastOrder: Order | null;

  // History
  orders: Order[];
  showHistory: boolean;
  setShowHistory: (s: boolean) => void;

  // Admin
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  showAdminDashboard: boolean;
  setShowAdminDashboard: (s: boolean) => void;
  updateOrderStatus: (orderNumber: number, status: string) => void;

  // UI
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

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const SajiinContext = createContext<SajiinContextType | null>(null);

export function SajiinProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [selectedFood, setSelectedFood] = useState<(typeof allFoods)[0] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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

  // Load cart & orders from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("sajiin_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedOrders = localStorage.getItem("sajiin_orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("sajiin_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sajiin_orders", JSON.stringify(orders));
  }, [orders]);

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // Filtered foods
  const filteredFoods =
    selectedCategory === "semua"
      ? allFoods
      : allFoods.filter((f) => f.category === selectedCategory);

  // Cart
  const addToCart = useCallback(
    (food_id: string) => {
      const food = allFoods.find((f) => f.food_id === food_id);
      if (!food || !food.available) return;
      setCart((prev) => {
        const existing = prev.find((c) => c.food_id === food_id);
        if (existing) {
          if (existing.quantity >= food.stock) return prev;
          return prev.map((c) =>
            c.food_id === food_id ? { ...c, quantity: c.quantity + 1 } : c
          );
        }
        return [
          ...prev,
          {
            food_id: food.food_id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1,
            max_stock: food.stock,
          },
        ];
      });
      addToast(`${food.name} ditambahkan ke keranjang!`, "success");
    },
    [addToast]
  );

  const updateQty = useCallback((food_id: string, qty: number) => {
    setCart((prev) =>
      prev.map((c) => (c.food_id === food_id ? { ...c, quantity: Math.max(0, Math.min(qty, c.max_stock)) } : c))
    );
  }, []);

  const removeFromCart = useCallback((food_id: string) => {
    setCart((prev) => prev.filter((c) => c.food_id !== food_id));
  }, []);

  const totalCartItems = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalCartPrice = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  // Submit Order
  const submitOrder = useCallback(
    (data: {
      customer_name: string;
      customer_whatsapp: string;
      date: string;
      time: string;
      notes: string;
      payment_method: string;
    }) => {
      const orderNumber = orders.length > 0 ? Math.max(...orders.map((o) => o.order_number)) + 1 : 1001;
      const newOrder: Order = {
        order_number: orderNumber,
        customer_name: data.customer_name,
        customer_whatsapp: data.customer_whatsapp,
        date: data.date,
        time: data.time,
        notes: data.notes,
        total_price: totalCartPrice + 2000,
        payment_method: data.payment_method,
        status: "Pending",
        items: cart.map((c) => ({
          food_id: c.food_id,
          name: c.name,
          price: c.price,
          quantity: c.quantity,
        })),
      };
      setOrders((prev) => [...prev, newOrder]);
      setLastOrder(newOrder);
      setIsConfirmed(true);
    },
    [cart, orders, totalCartPrice]
  );

  // Admin
  const adminLogin = useCallback((email: string, password: string) => {
    if (email === "admin@sajiin.com" && password === "admin123") {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminDashboard(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
    setShowAdminDashboard(false);
  }, []);

  const updateOrderStatus = useCallback((orderNumber: number, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.order_number === orderNumber ? { ...o, status } : o))
    );
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <SajiinContext.Provider
      value={{
        foods: allFoods,
        selectedCategory,
        setSelectedCategory,
        filteredFoods,
        selectedFood,
        setSelectedFood,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        totalCartItems,
        totalCartPrice,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConfirmed,
        setIsConfirmed,
        submitOrder,
        lastOrder,
        orders,
        showHistory,
        setShowHistory,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        showAdminDashboard,
        setShowAdminDashboard,
        updateOrderStatus,
        showCart,
        setShowCart,
        showAdminLogin,
        setShowAdminLogin,
        activeAdminTab,
        setActiveAdminTab,
        scrollToSection,
        toasts,
        addToast,
      }}
    >
      {children}
    </SajiinContext.Provider>
  );
}

export function useSajiin() {
  const ctx = useContext(SajiinContext);
  if (!ctx) throw new Error("useSajiin must be used within SajiinProvider");
  return ctx;
}
