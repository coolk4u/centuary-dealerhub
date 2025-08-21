
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, Plus, Minus, ShoppingCart, CreditCard, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  dealerPrice: string;
  quantity: number;
  image: string;
  retailer: string;
  category: string;
  size: string;
  scheme?: {
    inScheme: boolean;
    bulkDiscount?: {
      minQuantity: number;
      discountPercent: number;
      message: string;
    } | null;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  totalAmount: number;
  selectedRetailer: string;
}

export function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, totalAmount, selectedRetailer }: CartDrawerProps) {
  const GST_RATE = 0.18; // 18% GST

  const calculateItemTotal = (item: CartItem) => {
    let basePrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
    
    // Apply bulk discount if applicable
    if (item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity) {
      const discount = basePrice * (item.scheme.bulkDiscount.discountPercent / 100);
      basePrice -= discount;
    }
    
    return basePrice;
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const getGSTAmount = () => {
    return getSubtotal() * GST_RATE;
  };

  const getFinalTotal = () => {
    return getSubtotal() + getGSTAmount();
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

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      retailer: selectedRetailer,
      items: cart,
      subtotal: getSubtotal(),
      bulkDiscount: getBulkDiscountAmount(),
      gst: getGSTAmount(),
      total: getFinalTotal(),
      orderDate: new Date().toISOString()
    };

    console.log("Placing order:", order);
    alert(`Order placed successfully for ${selectedRetailer}! Total: ₹${getFinalTotal().toLocaleString()}`);
    
    // Clear cart after successful order
    cart.forEach(item => onUpdateQuantity(item.id, 0));
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-96 sm:max-w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cart.length} items)
          </SheetTitle>
          {selectedRetailer && (
            <p className="text-sm text-muted-foreground">
              Ordering for: <strong>{selectedRetailer}</strong>
            </p>
          )}
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {/* Cart Items */}
          <div className="flex-1 overflow-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add products to get started</p>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = calculateItemTotal(item);
                const originalPrice = parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity;
                const hasBulkDiscount = item.scheme?.inScheme && item.scheme.bulkDiscount && item.quantity >= item.scheme.bulkDiscount.minQuantity;
                
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.category} • {item.size}</p>
                          <p className="text-sm font-medium text-primary mt-1">{item.dealerPrice}</p>
                          {hasBulkDiscount && (
                            <Badge className="bg-green-100 text-green-700 text-xs mt-1">
                              {item.scheme!.bulkDiscount!.discountPercent}% Bulk Discount Applied
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onUpdateQuantity(item.id, 0)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          {hasBulkDiscount && (
                            <p className="text-xs text-gray-500 line-through">
                              ₹{originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="text-sm font-semibold">
                            ₹{itemTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Order Summary & Checkout */}
          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              {/* Order Summary */}
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
                
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{getFinalTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full portal-gradient text-white h-12"
                onClick={handlePlaceOrder}
                disabled={!selectedRetailer || cart.length === 0}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Place Order for {selectedRetailer}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
