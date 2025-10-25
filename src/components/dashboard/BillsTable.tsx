import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  id: string;
  customer: string;
  billNo: string;
  amount: number;
  dueDate: string;
  status: "paid" | "due";
}

const mockBills: Bill[] = [
  {
    id: "1",
    customer: "Akash Telecom",
    billNo: "INV-0034",
    amount: 1500,
    dueDate: "25 Oct",
    status: "due",
  },
  {
    id: "2",
    customer: "Rahim Gym",
    billNo: "INV-0029",
    amount: 2000,
    dueDate: "20 Oct",
    status: "paid",
  },
  {
    id: "3",
    customer: "Noor Restaurant",
    billNo: "INV-0033",
    amount: 3500,
    dueDate: "22 Oct",
    status: "due",
  },
  {
    id: "4",
    customer: "Sadia Boutique",
    billNo: "INV-0031",
    amount: 2800,
    dueDate: "18 Oct",
    status: "paid",
  },
];

export function BillsTable() {
  const handleSendReminder = (customer: string, billNo: string) => {
    toast.success(`Reminder sent to ${customer} for ${billNo}`, {
      description: "SMS has been queued for delivery",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Bill No</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockBills.map((bill) => (
                <tr key={bill.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-sm text-foreground">{bill.customer}</td>
                  <td className="py-4 px-4 text-sm font-mono text-muted-foreground">{bill.billNo}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-foreground">৳{bill.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{bill.dueDate}</td>
                  <td className="py-4 px-4">
                    {bill.status === "paid" ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        ✅ Paid
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        ❌ Due
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {bill.status === "due" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendReminder(bill.customer, bill.billNo)}
                        className="gap-2"
                      >
                        <Bell className="h-4 w-4" />
                        Send Reminder
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
