import { CartItem as CartItemType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-gray-600 text-sm">
          {formatCurrency(product.price)} each
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded-l-md"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-3 py-1 bg-gray-100">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded-r-md"
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          onClick={() => onRemove(product.id)}
          className="ml-2 px-2 py-1 text-red-600 hover:text-red-800"
          aria-label="Remove item"
        >
          ×
        </button>
      </div>
    </div>
  );
}
