import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, Star, Plus, Users, Filter, Grid, List } from "lucide-react";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductList } from "@/components/catalog/ProductList";
import { RetailerSelector } from "@/components/catalog/RetailerSelector";
import { CartDrawer } from "@/components/catalog/CartDrawer";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";

const products = [
  {
    id: 1,
    name: "Ortho Plus Mattress",
    category: "Mattress",
    size: "Queen Size",
    price: "₹25,000",
    dealerPrice: "₹18,750",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    inStock: true,
    description: "Premium orthopedic mattress with memory foam",
    specifications: "Dimensions: 78x60x8 inches, Material: Memory Foam",
    discount: "25% OFF",
    scheme: {
      inScheme: true,
      bulkDiscount: {
        minQuantity: 5,
        discountPercent: 5,
        message: "Buy 5+ get 5% extra discount"
      }
    }
  },
  {
    id: 2,
    name: "Memory Foam Deluxe",
    category: "Mattress", 
    size: "King Size",
    price: "₹35,000",
    dealerPrice: "₹26,250",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop",
    inStock: true,
    description: "Luxury memory foam with cooling gel technology",
    specifications: "Dimensions: 84x72x10 inches, Material: Gel Memory Foam",
    discount: "25% OFF",
    scheme: {
      inScheme: true,
      bulkDiscount: {
        minQuantity: 3,
        discountPercent: 7,
        message: "Buy 3+ get 7% extra discount"
      }
    }
  },
  {
    id: 3,
    name: "Premium Pillow Set",
    category: "Pillow",
    size: "Standard",
    price: "₹3,000",
    dealerPrice: "₹2,250",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
    inStock: false,
    description: "Set of 2 premium memory foam pillows",
    specifications: "Dimensions: 26x16x5 inches, Material: Memory Foam",
    discount: "15% OFF",
    scheme: {
      inScheme: false,
      bulkDiscount: null
    }
  },
  {
    id: 4,
    name: "Spring Classic",
    category: "Mattress",
    size: "Double",
    price: "₹18,000",
    dealerPrice: "₹13,500",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
    inStock: true,
    description: "Traditional spring mattress with comfort layers",
    specifications: "Dimensions: 75x48x8 inches, Material: Bonnell Spring",
    scheme: {
      inScheme: true,
      bulkDiscount: {
        minQuantity: 10,
        discountPercent: 10,
        message: "Buy 10+ get 10% extra discount"
      }
    }
  },
  {
    id: 5,
    name: "Latex Comfort",
    category: "Mattress",
    size: "Single",
    price: "₹22,000",
    dealerPrice: "₹16,500",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
    inStock: true,
    description: "Natural latex mattress for ultimate comfort",
    specifications: "Dimensions: 75x36x6 inches, Material: Natural Latex",
    scheme: {
      inScheme: false,
      bulkDiscount: null
    }
  },
  {
    id: 6,
    name: "Cervical Pillow",
    category: "Pillow",
    size: "Medium",
    price: "₹2,500",
    dealerPrice: "₹1,875",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=400&h=300&fit=crop",
    inStock: true,
    description: "Ergonomic cervical support pillow",
    specifications: "Dimensions: 24x14x4 inches, Material: Contour Foam",
    scheme: {
      inScheme: true,
      bulkDiscount: {
        minQuantity: 6,
        discountPercent: 8,
        message: "Buy 6+ get 8% extra discount"
      }
    }
  }
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const price = parseInt(product.dealerPrice.replace(/[₹,]/g, ''));
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.dealerPrice.replace(/[₹,]/g, '')) - parseInt(b.dealerPrice.replace(/[₹,]/g, ''));
      case "price-high":
        return parseInt(b.dealerPrice.replace(/[₹,]/g, '')) - parseInt(a.dealerPrice.replace(/[₹,]/g, ''));
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const addToCart = (product, quantity = 1) => {
    if (!selectedRetailer) {
      alert("Please select a retailer first");
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity, retailer: selectedRetailer }];
      }

      // Check for bulk discounts after adding item
      const updatedItem = newCart.find(item => item.id === product.id);
      if (updatedItem && product.scheme?.inScheme && product.scheme.bulkDiscount) {
        const { minQuantity, discountPercent, message } = product.scheme.bulkDiscount;
        if (updatedItem.quantity >= minQuantity) {
          // Show bulk discount notification
          setTimeout(() => {
            alert(`🎉 ${message} applied! You're getting ${discountPercent}% extra discount on ${product.name}`);
          }, 100);
        } else {
          const remaining = minQuantity - updatedItem.quantity;
          if (remaining <= 3) {
            setTimeout(() => {
              alert(`💡 Add ${remaining} more ${product.name} to get ${discountPercent}% extra discount!`);
            }, 100);
          }
        }
      }

      return newCart;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
              {selectedRetailer && (
                <Badge variant="outline" className="text-primary">
                  {selectedRetailer}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <RetailerSelector
                selectedRetailer={selectedRetailer}
                onRetailerSelect={setSelectedRetailer}
              />

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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="mattress">Mattress</SelectItem>
                  <SelectItem value="pillow">Pillow</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          {isFilterOpen && (
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClose={() => setIsFilterOpen(false)}
            />
          )}

          {/* Products */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <ProductGrid
                products={sortedProducts}
                onAddToCart={addToCart}
                selectedRetailer={selectedRetailer}
              />
            ) : (
              <ProductList
                products={sortedProducts}
                onAddToCart={addToCart}
                selectedRetailer={selectedRetailer}
              />
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
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
