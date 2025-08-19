
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Ortho Plus Mattress",
    category: "Mattress",
    size: "Queen Size",
    price: "₹25,000",
    dealerPrice: "₹18,750",
    rating: 4.5,
    image: "/api/placeholder/300/200",
    inStock: true,
    description: "Premium orthopedic mattress with memory foam"
  },
  {
    id: 2,
    name: "Memory Foam Deluxe",
    category: "Mattress", 
    size: "King Size",
    price: "₹35,000",
    dealerPrice: "₹26,250",
    rating: 4.8,
    image: "/api/placeholder/300/200",
    inStock: true,
    description: "Luxury memory foam with cooling gel technology"
  },
  {
    id: 3,
    name: "Premium Pillow Set",
    category: "Pillow",
    size: "Standard",
    price: "₹3,000",
    dealerPrice: "₹2,250",
    rating: 4.3,
    image: "/api/placeholder/300/200",
    inStock: false,
    description: "Set of 2 premium memory foam pillows"
  },
  {
    id: 4,
    name: "Spring Classic",
    category: "Mattress",
    size: "Double",
    price: "₹18,000",
    dealerPrice: "₹13,500",
    rating: 4.2,
    image: "/api/placeholder/300/200",
    inStock: true,
    description: "Traditional spring mattress with comfort layers"
  },
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Product Catalog</h2>
        <p className="text-muted-foreground">
          Browse and order from our complete range of mattresses and accessories.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="mattress">Mattress</SelectItem>
            <SelectItem value="pillow">Pillow</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="portal-card overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary">Out of Stock</Badge>
                </div>
              )}
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category} • {product.size}</CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-primary">{product.dealerPrice}</p>
                  <p className="text-sm text-gray-500 line-through">{product.price}</p>
                </div>
                <Button 
                  size="sm" 
                  disabled={!product.inStock}
                  className="portal-gradient text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
