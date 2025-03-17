import { create } from "zustand";
import { CartItem, Product, Sale } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
  checkout: (
    paymentMethod: "cash" | "card" | "other",
    customerName?: string
  ) => Sale;
  sales: Sale[];
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  sales: [],

  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  total: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  itemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  checkout: (paymentMethod, customerName) => {
    const items = get().items;
    const total = get().total();

    const sale: Sale = {
      id: Date.now().toString(),
      items: [...items],
      total,
      paymentMethod,
      timestamp: new Date(),
      customerName,
      receiptNumber: `R-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
    };

    set((state) => ({
      sales: [sale, ...state.sales],
      items: [],
    }));

    return sale;
  },
}));

export default useCartStore;
