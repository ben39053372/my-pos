"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/ProductCard";
import CartItem from "@/components/CartItem";

export default function HomePage() {
  const { products, categories } = useProductStore();
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    checkout,
    clearCart,
  } = useCartStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [customerName, setCustomerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "other">(
    "cash"
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    addItem(product);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const sale = checkout(paymentMethod, customerName);

    // Update product stock
    items.forEach((item) => {
      useProductStore.getState().updateStock(item.product.id, item.quantity);
    });

    toast.success(`Sale completed! Receipt #${sale.receiptNumber}`);
    setCustomerName("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Selection */}
      <Card className="lg:col-span-2 p-0">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedCategory("all")}
                variant={selectedCategory === "all" ? "default" : "secondary"}
                size="sm"
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? "default" : "secondary"
                  }
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <h2 className="text-lg font-medium mb-4">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Cart */}
      <Card title="Cart" className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <div className="mb-4">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between font-medium text-lg">
            <span>Total:</span>
            <span>{formatCurrency(total())}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name (Optional)
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter customer name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value as "cash" | "card" | "other")
            }
            className="w-full px-3 py-2 border rounded-md"
            aria-label="Payment Method"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCheckout}
            disabled={items.length === 0}
            variant="success"
            className="flex-1"
          >
            Checkout
          </Button>

          <Button
            onClick={clearCart}
            disabled={items.length === 0}
            variant="danger"
          >
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}
