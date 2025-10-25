import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Reminder {
  id: string;
  billNo: string;
  customer: string;
  dateSent: string;
  channel: "SMS" | "WhatsApp";
  status: "delivered" | "seen" | "pending";
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    billNo: "INV-0034",
    customer: "Akash Telecom",
    dateSent: "22 Oct",
    channel: "SMS",
    status: "delivered",
  },
  {
    id: "2",
    billNo: "INV-0029",
    customer: "Rahim Gym",
    dateSent: "19 Oct",
    channel: "WhatsApp",
    status: "seen",
  },
  {
    id: "3",
    billNo: "INV-0033",
    customer: "Noor Restaurant",
    dateSent: "23 Oct",
    channel: "SMS",
    status: "delivered",
  },
  {
    id: "4",
    billNo: "INV-0032",
    customer: "Karim Electronics",
    dateSent: "21 Oct",
    channel: "WhatsApp",
    status: "pending",
  },
];

export default function Reminders() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredReminders = mockReminders.filter(
    (reminder) => statusFilter === "all" || reminder.status === statusFilter
  );

  const getStatusBadge = (status: Reminder["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            ✅ Delivered
          </Badge>
        );
      case "seen":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            👀 Seen
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            ⏳ Pending
          </Badge>
        );
    }
  };

  const successRate = Math.round((mockReminders.filter(r => r.status !== "pending").length / mockReminders.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-accent/10 rounded-lg">
          <Bell className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reminder Log</h1>
          <p className="text-muted-foreground mt-1">Track all sent reminders and their delivery status</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Total Reminders</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{mockReminders.length}</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
            <h3 className="text-3xl font-bold text-success mt-2">{successRate}%</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Via SMS</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">
              {mockReminders.filter(r => r.channel === "SMS").length}
            </h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground font-medium">Via WhatsApp</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">
              {mockReminders.filter(r => r.channel === "WhatsApp").length}
            </h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reminder History</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="seen">Seen</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Bill No</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date Sent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Channel</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReminders.map((reminder) => (
                  <tr key={reminder.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-mono text-muted-foreground">{reminder.billNo}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{reminder.customer}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{reminder.dateSent}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{reminder.channel}</Badge>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(reminder.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
