
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Download, Plus, FileText, Send, Printer } from "lucide-react";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "Dream Sleep Center",
    customerAddress: "Mumbai, Maharashtra",
    date: "2024-01-15",
    dueDate: "2024-02-15",
    amount: "₹67,500",
    status: "paid",
    paymentMethod: "Credit Card",
    items: [
      { name: "Ortho Plus Mattress", quantity: 2, price: "₹18,750", total: "₹37,500" },
      { name: "Memory Foam Deluxe", quantity: 1, price: "₹30,000", total: "₹30,000" }
    ]
  },
  {
    id: "INV-2024-002",
    customer: "Comfort Zone Mattress",
    customerAddress: "Delhi, NCR",
    date: "2024-01-14",
    dueDate: "2024-02-14",
    amount: "₹42,000",
    status: "pending",
    paymentMethod: "Bank Transfer",
    items: [
      { name: "Spring Classic", quantity: 2, price: "₹13,500", total: "₹27,000" },
      { name: "Premium Pillow Set", quantity: 5, price: "₹3,000", total: "₹15,000" }
    ]
  },
  {
    id: "INV-2024-003",
    customer: "Sleep Well Showroom",
    customerAddress: "Bangalore, Karnataka",
    date: "2024-01-13",
    dueDate: "2024-02-13",
    amount: "₹125,000",
    status: "overdue",
    paymentMethod: "Cash",
    items: [
      { name: "Memory Foam Deluxe", quantity: 3, price: "₹26,250", total: "₹78,750" },
      { name: "Latex Comfort", quantity: 2, price: "₹16,500", total: "₹33,000" },
      { name: "Cervical Pillow", quantity: 7, price: "₹1,875", total: "₹13,125" }
    ]
  },
  {
    id: "INV-2024-004",
    customer: "Rest Easy Furniture",
    customerAddress: "Pune, Maharashtra",
    date: "2024-01-12",
    dueDate: "2024-02-12",
    amount: "₹18,750",
    status: "draft",
    paymentMethod: "Cheque",
    items: [
      { name: "Ortho Plus Mattress", quantity: 1, price: "₹18,750", total: "₹18,750" }
    ]
  }
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewInvoice = (invoice: typeof invoices[0]) => {
    setSelectedInvoice(invoice);
  };

  const getTotalAmount = () => {
    return filteredInvoices.reduce((sum, invoice) => {
      return sum + parseInt(invoice.amount.replace(/[₹,]/g, ''));
    }, 0);
  };

  const getStatusCount = (status: string) => {
    return invoices.filter(inv => inv.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">
            Manage and track all customer invoices.
          </p>
        </div>
        <Button className="portal-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold text-green-600">{getStatusCount('paid')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{getStatusCount('pending')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">₹{getTotalAmount().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="portal-card">
        <CardHeader>
          <CardTitle>Filter Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer or invoice ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="portal-card">
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>
            {filteredInvoices.length} invoices found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="font-mono">{invoice.id}</td>
                    <td>
                      <div>
                        <p className="font-medium">{invoice.customer}</p>
                        <p className="text-sm text-muted-foreground">{invoice.customerAddress}</p>
                      </div>
                    </td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="font-medium">{invoice.amount}</td>
                    <td>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="text-sm">{invoice.paymentMethod}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Detail Modal would go here */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoice Details - {selectedInvoice.id}</CardTitle>
                <CardDescription>Customer: {selectedInvoice.customer}</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setSelectedInvoice(null)}>
                ×
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Invoice Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedInvoice.date}</p>
                    <p><span className="font-medium">Due Date:</span> {selectedInvoice.dueDate}</p>
                    <p><span className="font-medium">Status:</span> 
                      <Badge className={`ml-2 ${getStatusColor(selectedInvoice.status)}`}>
                        {selectedInvoice.status}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Payment Method:</span> {selectedInvoice.paymentMethod}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedInvoice.customer}</p>
                    <p><span className="font-medium">Address:</span> {selectedInvoice.customerAddress}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Product</th>
                        <th className="text-right py-2">Quantity</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{item.name}</td>
                          <td className="text-right py-2">{item.quantity}</td>
                          <td className="text-right py-2">{item.price}</td>
                          <td className="text-right py-2 font-medium">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="text-right py-2 font-medium">Total Amount:</td>
                        <td className="text-right py-2 font-bold text-lg">{selectedInvoice.amount}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Invoices;
