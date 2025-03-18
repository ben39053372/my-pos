import { CartItem as CartItemType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

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
    <div className="flex justify-between items-center py-3 border-b">
      <div>
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-muted-foreground text-sm">
            {formatCurrency(product.price)} each
          </p>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <span className="px-3 py-1 text-sm">{quantity}</span>
          <Button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            disabled={quantity >= product.stock}
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
        <Button
          onClick={() => onRemove(product.id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          aria-label="Remove item"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
