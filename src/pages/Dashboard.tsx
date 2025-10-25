import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { BillsTable } from "@/components/dashboard/BillsTable";
import { DollarSign, Clock, CheckCircle, Plus, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleBulkReminder = () => {
    toast.success("Bulk reminders sent!", {
      description: "3 reminders have been queued for delivery",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SmartBill360 Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your bills and payments at a glance</p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={() => navigate("/create-bill")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Bill
          </Button>
          <Button onClick={handleBulkReminder} variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Send Bulk Reminder
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard
          title="💰 Total Billed"
          value="৳45,000"
          icon={<DollarSign className="h-6 w-6" />}
          variant="default"
        />
        <SummaryCard
          title="🕒 Pending Payments"
          value="৳13,000"
          icon={<Clock className="h-6 w-6" />}
          variant="warning"
        />
        <SummaryCard
          title="✅ Paid Bills"
          value="৳32,000"
          icon={<CheckCircle className="h-6 w-6" />}
          variant="success"
        />
      </div>

      <BillsTable />
    </div>
  );
}
