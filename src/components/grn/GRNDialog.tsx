
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Package, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  invoiceQty: number;
  receivedQty: number;
  unitPrice: number;
}

interface Invoice {
  id: number;
  orderNumber: string;
  invoiceNumber: string;
  supplier: string;
  date: string;
  totalAmount: string;
  status: string;
  products: Product[];
}

interface GRNDialogProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (updatedProducts: Product[]) => void;
}

export function GRNDialog({ invoice, isOpen, onClose, onComplete }: GRNDialogProps) {
  const [products, setProducts] = useState<Product[]>(
    invoice.products.map(p => ({ ...p }))
  );

  const handleQuantityChange = (productId: number, newQty: string) => {
    const qty = parseInt(newQty) || 0;
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId 
          ? { ...p, receivedQty: Math.max(0, Math.min(qty, p.invoiceQty)) }
          : p
      )
    );
  };

  const handleAcceptAll = (productId: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId 
          ? { ...p, receivedQty: p.invoiceQty }
          : p
      )
    );
  };

  const handleComplete = () => {
    const hasReceivedItems = products.some(p => p.receivedQty > 0);
    
    if (!hasReceivedItems) {
      toast.error("Please receive at least one item before completing GRN");
      return;
    }

    // Calculate totals for confirmation
    const totalReceived = products.reduce((sum, p) => sum + p.receivedQty, 0);
    const totalInvoiced = products.reduce((sum, p) => sum + p.invoiceQty, 0);
    
    toast.success(`GRN completed! Received ${totalReceived}/${totalInvoiced} items. Inventory updated.`);
    onComplete(products);
  };

  const getTotalReceived = () => products.reduce((sum, p) => sum + p.receivedQty, 0);
  const getTotalInvoiced = () => products.reduce((sum, p) => sum + p.invoiceQty, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Process GRN - {invoice.invoiceNumber}</span>
          </DialogTitle>
          <DialogDescription>
            Order: {invoice.orderNumber} | Supplier: {invoice.supplier} | Date: {new Date(invoice.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Total Items: {getTotalReceived()}/{getTotalInvoiced()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Invoice Value: {invoice.totalAmount}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <Card key={product.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Unit Price: ₹{product.unitPrice.toLocaleString()} | 
                        Invoiced: {product.invoiceQty} units
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`qty-${product.id}`} className="text-sm">
                          Received:
                        </Label>
                        <Input
                          id={`qty-${product.id}`}
                          type="number"
                          min="0"
                          max={product.invoiceQty}
                          value={product.receivedQty}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">
                          / {product.invoiceQty}
                        </span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcceptAll(product.id)}
                        className="flex items-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept All</span>
                      </Button>
                    </div>
                  </div>
                  
                  {product.receivedQty > 0 && (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                      <div className="flex items-center space-x-2 text-sm text-green-800">
                        <Check className="w-4 h-4" />
                        <span>
                          Receiving {product.receivedQty} units 
                          (Value: ₹{(product.receivedQty * product.unitPrice).toLocaleString()})
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {product.receivedQty < product.invoiceQty && product.receivedQty > 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <div className="flex items-center space-x-2 text-sm text-yellow-800">
                        <AlertCircle className="w-4 h-4" />
                        <span>
                          Partial receipt: {product.invoiceQty - product.receivedQty} units pending
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Receiving {getTotalReceived()} out of {getTotalInvoiced()} total items
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleComplete}>
              Complete GRN
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
