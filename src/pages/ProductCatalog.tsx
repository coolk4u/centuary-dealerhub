
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, Star, Plus, Minus, Users } from "lucide-react";
import { RetailerSidebar } from "@/components/catalog/RetailerSidebar";
import { CartSidebar } from "@/components/catalog/CartSidebar";

const products = [
  {
    id: 1,
    name: "Ortho Plus Mattress",
    category: "Mattress",
    size: "Queen Size",
    price: "₹25,000",
    dealerPrice: "₹18,750",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    inStock: true,
    description: "Premium orthopedic mattress with memory foam",
    specifications: "Dimensions: 78x60x8 inches, Material: Memory Foam"
  },
  {
    id: 2,
    name: "Memory Foam Deluxe",
    category: "Mattress", 
    size: "King Size",
    price: "₹35,000",
    dealerPrice: "₹26,250",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=300&h=200&fit=crop",
    inStock: true,
    description: "Luxury memory foam with cooling gel technology",
    specifications: "Dimensions: 84x72x10 inches, Material: Gel Memory Foam"
  },
  {
    id: 3,
    name: "Premium Pillow Set",
    category: "Pillow",
    size: "Standard",
    price: "₹3,000",
    dealerPrice: "₹2,250",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop",
    inStock: false,
    description: "Set of 2 premium memory foam pillows",
    specifications: "Dimensions: 26x16x5 inches, Material: Memory Foam"
  },
  {
    id: 4,
    name: "Spring Classic",
    category: "Mattress",
    size: "Double",
    price: "₹18,000",
    dealerPrice: "₹13,500",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop",
    inStock: true,
    description: "Traditional spring mattress with comfort layers",
    specifications: "Dimensions: 75x48x8 inches, Material: Bonnell Spring"
  },
  {
    id: 5,
    name: "Latex Comfort",
    category: "Mattress",
    size: "Single",
    price: "₹22,000",
    dealerPrice: "₹16,500",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
    inStock: true,
    description: "Natural latex mattress for ultimate comfort",
    specifications: "Dimensions: 75x36x6 inches, Material: Natural Latex"
  },
  {
    id: 6,
    name: "Cervical Pillow",
    category: "Pillow",
    size: "Medium",
    price: "₹2,500",
    dealerPrice: "₹1,875",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=300&h=200&fit=crop",
    inStock: true,
    description: "Ergonomic cervical support pillow",
    specifications: "Dimensions: 24x14x4 inches, Material: Contour Foam"
  }
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRetailerSidebarOpen, setIsRetailerSidebarOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product, quantity = 1) => {
    if (!selectedRetailer) {
      alert("Please select a retailer first");
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, retailer: selectedRetailer }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.dealerPrice.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="flex h-screen">
      {/* Retailer Sidebar */}
      <RetailerSidebar 
        selectedRetailer={selectedRetailer}
        onRetailerSelect={setSelectedRetailer}
        isOpen={isRetailerSidebarOpen}
        onToggle={() => setIsRetailerSidebarOpen(!isRetailerSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Product Catalog</h2>
              <p className="text-muted-foreground">
                Browse and order from our complete range of mattresses and accessories.
              </p>
              {selectedRetailer && (
                <p className="text-sm text-primary mt-1">
                  Ordering for: <strong>{selectedRetailer}</strong>
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsRetailerSidebarOpen(!isRetailerSidebarOpen)}
              >
                <Users className="w-4 h-4 mr-2" />
                {selectedRetailer || "Select Retailer"}
              </Button>

              <Button
                onClick={() => setIsCartOpen(true)}
                className="portal-gradient text-white relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 bg-white text-primary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
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
                  <p className="text-xs text-gray-500">{product.specifications}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-primary">{product.dealerPrice}</p>
                      <p className="text-sm text-gray-500 line-through">{product.price}</p>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!product.inStock || !selectedRetailer}
                      className="portal-gradient text-white"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        totalAmount={getTotalAmount()}
        selectedRetailer={selectedRetailer}
      />
    </div>
  );
};

export default ProductCatalog;
