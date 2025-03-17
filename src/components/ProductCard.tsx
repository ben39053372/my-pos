import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import Button from "./ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="h-24 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-500">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover rounded-md"
          />
        ) : (
          <span>No image</span>
        )}
      </div>
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-1">
        {formatCurrency(product.price)}
      </p>
      <p className="text-gray-500 text-xs mb-2">Stock: {product.stock}</p>
      <Button
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        variant={product.stock <= 0 ? "secondary" : "primary"}
        size="sm"
        className="mt-auto"
      >
        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
