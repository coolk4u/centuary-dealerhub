
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Package, Calendar, Eye } from "lucide-react";
import { GRNDialog } from "@/components/grn/GRNDialog";

const invoices = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    invoiceNumber: "INV-001",
    supplier: "Centuary Mattress Co.",
    date: "2024-01-15",
    totalAmount: "₹2,50,000",
    status: "pending",
    products: [
      { id: 1, name: "Ortho Plus Mattress", invoiceQty: 20, receivedQty: 0, unitPrice: 18750 },
      { id: 2, name: "Memory Foam Deluxe", invoiceQty: 15, receivedQty: 0, unitPrice: 26250 },
    ]
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    invoiceNumber: "INV-002",
    supplier: "Sleep Well Products",
    date: "2024-01-14",
    totalAmount: "₹1,80,000",
    status: "partial",
    products: [
      { id: 3, name: "Premium Pillow Set", invoiceQty: 50, receivedQty: 30, unitPrice: 2100 },
      { id: 4, name: "Spring Classic", invoiceQty: 25, receivedQty: 0, unitPrice: 13500 },
    ]
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    invoiceNumber: "INV-003",
    supplier: "Comfort Solutions",
    date: "2024-01-12",
    totalAmount: "₹3,20,000",
    status: "completed",
    products: [
      { id: 5, name: "Luxury Foam Mattress", invoiceQty: 12, receivedQty: 12, unitPrice: 26667 },
    ]
  },
];

const GRN = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Receipt';
      case 'partial': return 'Partially Received';
      case 'completed': return 'Fully Received';
      default: return status;
    }
  };

  const handleProcessGRN = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDialogOpen(true);
  };

  const handleGRNComplete = (updatedProducts: any[]) => {
    console.log('GRN completed for products:', updatedProducts);
    // Here you would typically update the backend and refresh the data
    setIsDialogOpen(false);
    setSelectedInvoice(null);
  };

  const pendingInvoices = invoices.filter(inv => inv.status !== 'completed').length;
  const totalValue = invoices.reduce((sum, inv) => {
    const value = parseInt(inv.totalAmount.replace(/[₹,]/g, ''));
    return sum + value;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">GRN Process</h2>
        <p className="text-muted-foreground">
          Manage goods received notes and update inventory upon receipt.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Receipts</p>
                <p className="text-2xl font-bold">{pendingInvoices}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹{(totalValue / 100000).toFixed(2)}L</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="portal-card">
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>
            Process goods received notes for pending invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Invoice Number</th>
                  <th>Supplier</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="font-medium">{invoice.orderNumber}</td>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.supplier}</td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td className="font-medium">{invoice.totalAmount}</td>
                    <td>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusText(invoice.status)}
                      </Badge>
                    </td>
                    <td>{invoice.products.length} items</td>
                    <td>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleProcessGRN(invoice)}
                        disabled={invoice.status === 'completed'}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Process GRN
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedInvoice && (
        <GRNDialog
          invoice={selectedInvoice}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onComplete={handleGRNComplete}
        />
      )}
    </div>
  );
};

export default GRN;
