export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  description?: string;
  barcode?: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: "cash" | "card" | "other";
  timestamp: Date;
  customerName?: string;
  receiptNumber: string;
}
