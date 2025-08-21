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
      <div className="h-full w-full flex items-center justify-center p-4">
        <div className="text-center py-12 max-w-md mx-auto">
          <ShoppingCart className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 text-muted-foreground opacity-50" />
          <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-2">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Add some products to get started</p>
          <Button onClick={() => navigate('/catalog')} className="portal-gradient text-white w-full sm:w-auto">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-3 sm:p-4 lg:p-6 overflow-auto">
      <div className="w-full max-w-none mx-auto">
        <div className="flex items-center mb-4 sm:mb-6">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cart.map((item) => {
              const itemTotal = calculateItemTotal(item);
              const originalPrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
              const hasBulkDiscount = item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity;
              
              return (
                <Card key={item.id} className="w-full">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full sm:w-16 lg:w-20 h-16 lg:h-20 object-cover rounded"
                      />
                      <div className="flex-1 w-full min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.category} • {item.size}</p>
                        <p className="text-base sm:text-lg font-medium text-primary mt-1">{item.dealerPrice}</p>
                        {hasBulkDiscount && (
                          <Badge className="bg-green-100 text-green-700 mt-2 text-xs">
                            {item.scheme!.bulkDiscount!.discountPercent}% Bulk Discount Applied
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <span className="font-medium w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateCartQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <div className="text-right">
                          {hasBulkDiscount && (
                            <p className="text-xs sm:text-sm text-gray-500 line-through">
                              ₹{originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="text-base sm:text-lg font-semibold">
                            ₹{itemTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Retailer Info & Delivery Address & Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            {/* Retailer Information */}
            {selectedRetailerDetails && (
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center text-base sm:text-lg">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Retailer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm sm:text-base">{selectedRetailerDetails.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 shrink-0" />
                      <span className="truncate">{selectedRetailerDetails.location}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{selectedRetailerDetails.phone}</p>
                    {selectedRetailerDetails.address && (
                      <p className="text-xs sm:text-sm">{selectedRetailerDetails.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Address */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Delivery Address
                  </div>
                  {selectedRetailerDetails && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={useRetailerAddress}
                      className="text-xs h-8"
                    >
                      Use Retailer
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="name" className="text-xs sm:text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-xs sm:text-sm">Address *</Label>
                  <Textarea
                    id="address"
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={2}
                    className="text-sm resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="city" className="text-xs sm:text-sm">City</Label>
                    <Input
                      id="city"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-xs sm:text-sm">State</Label>
                    <Input
                      id="state"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-xs sm:text-sm">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={deliveryAddress.pincode}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder="Enter PIN code"
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <div className="space-y-2 text-xs sm:text-sm">
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
                  
                  <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-lg sm:text-2xl text-primary">
                      ₹{getFinalTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full portal-gradient text-white h-10 sm:h-12 text-sm sm:text-base"
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
    </div>
  );
};

export default Cart;
