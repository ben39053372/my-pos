import { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";

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
    <Card className="overflow-hidden">
      <div className="h-32 bg-muted flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground">No image</span>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{product.name}</h3>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        <p className="text-foreground font-medium mb-1">
          {formatCurrency(product.price)}
        </p>
        <p className="text-muted-foreground text-sm">Stock: {product.stock}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          variant={product.stock <= 0 ? "secondary" : "default"}
          size="sm"
          className="w-full"
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
