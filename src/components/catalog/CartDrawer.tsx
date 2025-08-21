
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  const [paymentTerms, setPaymentTerms] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [notes, setNotes] = useState("");

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    if (!paymentTerms || !deliveryMode) {
      alert("Please select payment terms and delivery mode");
      return;
    }

    const order = {
      retailer: selectedRetailer,
      items: cart,
      total: totalAmount,
      paymentTerms,
      deliveryMode,
      notes,
      orderDate: new Date().toISOString()
    };

    console.log("Placing order:", order);
    alert(`Order placed successfully for ${selectedRetailer}! Total: ₹${totalAmount.toLocaleString()}`);
    
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
              cart.map((item) => (
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
                      <p className="text-sm font-semibold">
                        ₹{(parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Details & Checkout */}
          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Payment Terms</label>
                  <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash on Delivery</SelectItem>
                      <SelectItem value="credit-30">30 Days Credit</SelectItem>
                      <SelectItem value="credit-60">60 Days Credit</SelectItem>
                      <SelectItem value="advance">Advance Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Delivery Mode</label>
                  <Select value={deliveryMode} onValueChange={setDeliveryMode}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select delivery mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Delivery</SelectItem>
                      <SelectItem value="express">Express Delivery</SelectItem>
                      <SelectItem value="pickup">Store Pickup</SelectItem>
                      <SelectItem value="installation">Delivery + Installation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Special Instructions</label>
                  <Textarea 
                    placeholder="Any special notes for this order..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="h-20 mt-1"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{totalAmount.toLocaleString()}
                  </span>
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
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
