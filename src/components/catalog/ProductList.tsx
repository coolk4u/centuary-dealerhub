
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedRetailer: string;
}

export function ProductList({ products, onAddToCart, selectedRetailer }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex">
              {/* Image */}
              <div className="w-48 h-36 bg-gray-100 relative overflow-hidden flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 text-white text-xs">{product.discount}</Badge>
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-white bg-black/70">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category} • {product.size}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{product.specifications}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold text-primary">{product.dealerPrice}</span>
                      <span className="text-sm text-gray-500 line-through">{product.price}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="p-2">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        disabled={!product.inStock || !selectedRetailer}
                        className="portal-gradient text-white"
                        onClick={() => onAddToCart(product)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
