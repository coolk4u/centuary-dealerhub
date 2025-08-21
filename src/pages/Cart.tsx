
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin, User, Building } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface DeliveryAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, updateCartQuantity, clearCart, selectedRetailer, selectedRetailerDetails } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    address: selectedRetailerDetails?.address || "",
    city: selectedRetailerDetails?.city || "",
    state: selectedRetailerDetails?.state || "",
    pincode: selectedRetailerDetails?.pincode || ""
  });

  const GST_RATE = 0.18;

  const calculateItemTotal = (item) => {
    let basePrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
    
    if (item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity) {
      const discount = basePrice * (item.scheme.bulkDiscount.discountPercent / 100);
      basePrice -= discount;
    }
    
    return basePrice;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const getBulkDiscountAmount = () => {
    return cart.reduce((total, item) => {
      if (item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity) {
        const basePrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
        const discount = basePrice * (item.scheme.bulkDiscount.discountPercent / 100);
        return total + discount;
      }
      return total;
    }, 0);
  };

  const getGSTAmount = () => {
    return getSubtotal() * GST_RATE;
  };

  const getFinalTotal = () => {
    return getSubtotal() + getGSTAmount();
  };

  const useRetailerAddress = () => {
    if (selectedRetailerDetails) {
      setDeliveryAddress({
        name: selectedRetailerDetails.name,
        phone: selectedRetailerDetails.phone,
        address: selectedRetailerDetails.address || "",
        city: selectedRetailerDetails.city || "",
        state: selectedRetailerDetails.state || "",
        pincode: selectedRetailerDetails.pincode || ""
      });
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    if (!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address) {
      toast({
        title: "Incomplete Address",
        description: "Please fill in all required delivery address fields.",
        variant: "destructive",
      });
      return;
    }

    const order = {
      items: cart,
      retailer: selectedRetailer,
      retailerDetails: selectedRetailerDetails,
      deliveryAddress,
      subtotal: getSubtotal(),
      bulkDiscount: getBulkDiscountAmount(),
      gst: getGSTAmount(),
      total: getFinalTotal(),
      orderDate: new Date().toISOString()
    };

    console.log("Placing order:", order);
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Your order for ₹${getFinalTotal().toLocaleString()} has been placed successfully.`,
    });
    
    // Clear cart after successful order
    clearCart();
    setDeliveryAddress({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: ""
    });
    
    // Navigate to orders page
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Button onClick={() => navigate('/catalog')} className="portal-gradient text-white">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
      <div className="flex items-center mb-6 sm:mb-8">
        <ShoppingCart className="w-6 h-6 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="xl:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemTotal = calculateItemTotal(item);
            const originalPrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
            const hasBulkDiscount = item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity;
            
            return (
              <Card key={item.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full sm:w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category} • {item.size}</p>
                      <p className="text-lg font-medium text-primary mt-1">{item.dealerPrice}</p>
                      {hasBulkDiscount && (
                        <Badge className="bg-green-100 text-green-700 mt-2">
                          {item.scheme!.bulkDiscount!.discountPercent}% Bulk Discount Applied
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:items-end w-full sm:w-auto">
                      <div className="flex items-center justify-between sm:justify-end space-x-3 mb-2 w-full">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium w-12 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {hasBulkDiscount && (
                        <p className="text-sm text-gray-500 line-through text-right">
                          ₹{originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-lg font-semibold text-right">
                        ₹{itemTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Retailer Info & Delivery Address & Order Summary */}
        <div className="space-y-6">
          {/* Retailer Information */}
          {selectedRetailerDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Retailer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold">{selectedRetailerDetails.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedRetailerDetails.location}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedRetailerDetails.phone}</p>
                  {selectedRetailerDetails.address && (
                    <p className="text-sm">{selectedRetailerDetails.address}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Address
                </div>
                {selectedRetailerDetails && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={useRetailerAddress}
                    className="text-xs"
                  >
                    Use Retailer Address
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={deliveryAddress.name}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={deliveryAddress.address}
                  onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Enter state"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  value={deliveryAddress.pincode}
                  onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
                  placeholder="Enter PIN code"
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{(getSubtotal() + getBulkDiscountAmount()).toLocaleString()}</span>
                </div>
                
                {getBulkDiscountAmount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount</span>
                    <span>-₹{getBulkDiscountAmount().toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>After Discounts</span>
                  <span>₹{getSubtotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{getGSTAmount().toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-2xl text-primary">
                    ₹{getFinalTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full portal-gradient text-white h-12"
                onClick={handlePlaceOrder}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
