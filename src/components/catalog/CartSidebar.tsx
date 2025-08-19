
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Minus, ShoppingCart, CreditCard } from "lucide-react";
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

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  totalAmount: number;
  selectedRetailer: string;
}

export function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, totalAmount, selectedRetailer }: CartSidebarProps) {
  const [paymentTerms, setPaymentTerms] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [notes, setNotes] = useState("");

  console.log("CartSidebar rendered - isOpen:", isOpen, "cart:", cart);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-96 bg-white h-full flex flex-col shadow-xl">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cart.length} items)
            </h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {selectedRetailer && (
            <p className="text-sm text-gray-600 mt-1">
              Ordering for: <strong>{selectedRetailer}</strong>
            </p>
          )}
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
              <p className="text-sm">Add products to get started</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.category} • {item.size}</p>
                        <p className="text-sm font-medium text-primary">{item.dealerPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium px-2">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium">
                        ₹{(parseInt(item.dealerPrice.replace(/[₹,]/g, '')) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Payment Terms</label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger>
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
                  <SelectTrigger>
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
                  className="h-20"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold text-primary">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <Button 
                className="w-full portal-gradient text-white"
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
    </div>
  );
}
