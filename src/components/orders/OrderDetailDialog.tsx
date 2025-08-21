
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  amount: string;
  status: string;
  paymentStatus: string;
}

interface OrderDetailDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const mockOrderItems: OrderItem[] = [
  { id: "1", name: "Centuary Ortho Plus Mattress", quantity: 2, price: 25000, total: 50000 },
  { id: "2", name: "Centuary Memory Foam Pillow", quantity: 4, price: 2500, total: 10000 },
  { id: "3", name: "Centuary Bed Base", quantity: 1, price: 7500, total: 7500 }
];

export function OrderDetailDialog({ order, isOpen, onClose }: OrderDetailDialogProps) {
  const { toast } = useToast();

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateEInvoice = () => {
    console.log("Generating E-Invoice for order:", order.id);
    toast({
      title: "E-Invoice Generated",
      description: "E-Invoice has been generated successfully.",
    });
  };

  const handleGenerateEWayBill = () => {
    console.log("Generating E-Way Bill for order:", order.id);
    toast({
      title: "E-Way Bill Generated", 
      description: "E-Way Bill has been generated successfully.",
    });
  };

  const handleGenerateXML = () => {
    console.log("Generating XML for Tally for order:", order.id);
    toast({
      title: "XML Generated",
      description: "XML file for Tally has been generated and downloaded.",
    });
  };

  const subtotal = mockOrderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order Details - {order.id}
          </DialogTitle>
          <DialogDescription>
            Complete order summary and invoice generation options.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{order.customer}</CardTitle>
                  <p className="text-sm text-muted-foreground">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge className={getStatusColor(order.status)}>
                    Order: {order.status}
                  </Badge>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    Payment: {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice & Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={handleGenerateEInvoice}
                  className="portal-gradient text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate E-Invoice
                </Button>
                <Button
                  onClick={handleGenerateEWayBill}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate E-Way Bill
                </Button>
                <Button
                  onClick={handleGenerateXML}
                  variant="outline"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Generate XML for Tally
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
