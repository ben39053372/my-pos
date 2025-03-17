import { create } from "zustand";
import { Product } from "@/lib/types";

// Sample product data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Coffee",
    price: 3.99,
    category: "Beverages",
    description: "Freshly brewed coffee",
    stock: 100,
    image: "https://placehold.co/200x150/brown/white?text=Coffee",
  },
  {
    id: "2",
    name: "Sandwich",
    price: 5.99,
    category: "Food",
    description: "Chicken sandwich with lettuce and tomato",
    stock: 20,
    image: "https://placehold.co/200x150/beige/black?text=Sandwich",
  },
  {
    id: "3",
    name: "Salad",
    price: 4.99,
    category: "Food",
    description: "Fresh garden salad",
    stock: 15,
    image: "https://placehold.co/200x150/green/white?text=Salad",
  },
  {
    id: "4",
    name: "Soda",
    price: 1.99,
    category: "Beverages",
    description: "Refreshing soda",
    stock: 50,
    image: "https://placehold.co/200x150/red/white?text=Soda",
  },
  {
    id: "5",
    name: "Cake",
    price: 3.49,
    category: "Desserts",
    description: "Chocolate cake slice",
    stock: 10,
    image: "https://placehold.co/200x150/brown/white?text=Cake",
  },
  {
    id: "6",
    name: "Chips",
    price: 2.49,
    category: "Snacks",
    description: "Potato chips",
    stock: 30,
    image: "https://placehold.co/200x150/yellow/black?text=Chips",
  },
];

interface ProductStore {
  products: Product[];
  categories: string[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  updateStock: (id: string, quantity: number) => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,

  categories: Array.from(new Set(initialProducts.map((p) => p.category))),

  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };

    set((state) => ({
      products: [...state.products, newProduct],
      categories: Array.from(new Set([...state.categories, product.category])),
    }));
  },

  updateProduct: (id, updatedProduct) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );

      return {
        products: updatedProducts,
        categories: Array.from(new Set(updatedProducts.map((p) => p.category))),
      };
    });
  },

  deleteProduct: (id) => {
    set((state) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== id
      );

      return {
        products: filteredProducts,
        categories: Array.from(
          new Set(filteredProducts.map((p) => p.category))
        ),
      };
    });
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },

  getProductsByCategory: (category) => {
    return get().products.filter((product) => product.category === category);
  },

  updateStock: (id, quantity) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, stock: Math.max(0, product.stock - quantity) }
          : product
      ),
    }));
  },
}));

export default useProductStore;
