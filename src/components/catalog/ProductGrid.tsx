
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Heart, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  size: string;
  price: string;
  dealerPrice: string;
  rating: number;
  image: string;
  inStock: boolean;
  description: string;
  specifications: string;
  discount?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedRetailer: string;
}

export function ProductGrid({ products, onAddToCart, selectedRetailer }: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="aspect-square bg-gray-100 relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-500 text-white">{product.discount}</Badge>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-white bg-black/70">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base leading-tight truncate">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.category} • {product.size}</CardDescription>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-primary">{product.dealerPrice}</span>
                <span className="text-sm text-gray-500 line-through">{product.price}</span>
              </div>
              
              <Button 
                className="w-full portal-gradient text-white"
                disabled={!product.inStock || !selectedRetailer}
                onClick={() => onAddToCart(product)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
