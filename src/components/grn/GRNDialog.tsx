
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
      <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl h-[90vh] sm:h-[80vh] overflow-y-auto p-3 sm:p-6">
        <DialogHeader className="pb-2 sm:pb-4">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-base sm:text-lg">
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">Process GRN - {invoice.invoiceNumber}</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm space-y-1 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <span>Order: {invoice.orderNumber}</span>
              <span>Supplier: {invoice.supplier}</span>
              <span>Date: {new Date(invoice.date).toLocaleDateString()}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted rounded-lg space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                Total Items: {getTotalReceived()}/{getTotalInvoiced()}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                Invoice Value: {invoice.totalAmount}
              </Badge>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {products.map((product) => (
              <Card key={product.id} className="border">
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col space-y-2">
                      <h4 className="font-medium text-sm sm:text-base truncate">{product.name}</h4>
                      <div className="flex flex-col space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <span>Unit Price: ₹{product.unitPrice.toLocaleString()}</span>
                        <span>Invoiced: {product.invoiceQty} units</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2 flex-1">
                        <Label htmlFor={`qty-${product.id}`} className="text-xs sm:text-sm whitespace-nowrap">
                          Received:
                        </Label>
                        <div className="flex items-center space-x-1 flex-1">
                          <Input
                            id={`qty-${product.id}`}
                            type="number"
                            min="0"
                            max={product.invoiceQty}
                            value={product.receivedQty}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            className="w-16 sm:w-20 h-8 text-center text-xs sm:text-sm"
                          />
                          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                            / {product.invoiceQty}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcceptAll(product.id)}
                        className="flex items-center space-x-1 h-8 text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Accept All</span>
                      </Button>
                    </div>
                  
                    {product.receivedQty > 0 && (
                      <div className="p-2 bg-green-50 rounded border border-green-200">
                        <div className="flex items-start space-x-2 text-xs sm:text-sm text-green-800">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0" />
                          <span className="break-words">
                            Receiving {product.receivedQty} units 
                            (Value: ₹{(product.receivedQty * product.unitPrice).toLocaleString()})
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {product.receivedQty < product.invoiceQty && product.receivedQty > 0 && (
                      <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                        <div className="flex items-start space-x-2 text-xs sm:text-sm text-yellow-800">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0" />
                          <span className="break-words">
                            Partial receipt: {product.invoiceQty - product.receivedQty} units pending
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-3 sm:pt-4">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            Receiving {getTotalReceived()} out of {getTotalInvoiced()} total items
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto h-9 text-sm">
              Cancel
            </Button>
            <Button onClick={handleComplete} className="w-full sm:w-auto h-9 text-sm">
              Complete GRN
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
