"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CartItem as CartItemType } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import CartItem from "@/components/CartItem";
import { ShoppingCartIcon } from "lucide-react";

interface MobileCartSheetProps {
  items: CartItemType[];
  total: () => number;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  checkout: (
    paymentMethod: "cash" | "card" | "other",
    customerName?: string
  ) => void;
  itemCount: () => number;
}

export default function MobileCartSheet({
  items,
  total,
  updateQuantity,
  removeItem,
  clearCart,
  checkout,
  itemCount,
}: MobileCartSheetProps) {
  const [customerName, setCustomerName] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "other">(
    "cash"
  );

  const handleCheckout = () => {
    checkout(paymentMethod, customerName);
    setCustomerName("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative md:hidden"
          aria-label="Open cart"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {itemCount() > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Your cart is empty
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(total())}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Customer Name (Optional)
                  </label>
                  <Input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Payment Method
                  </label>
                  <Select
                    value={paymentMethod}
                    onValueChange={(value) =>
                      setPaymentMethod(value as "cash" | "card" | "other")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
        <SheetFooter className="mt-auto">
          <div className="flex gap-2 w-full">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
