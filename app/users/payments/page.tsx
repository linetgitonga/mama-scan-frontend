"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, XCircle, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const payments = [
  {
    id: "TXN001",
    service: "Cervical Cancer Screening",
    amount: 150,
    date: "2024-11-15",
    status: "Completed",
    method: "M-Pesa",
  },
  {
    id: "TXN002",
    service: "Follow-up Consultation",
    amount: 75,
    date: "2024-10-20",
    status: "Completed",
    method: "Card",
  },
  {
    id: "TXN003",
    service: "Lab Tests",
    amount: 200,
    date: "2024-10-15",
    status: "Pending",
    method: "M-Pesa",
  },
]

const services = [
  { id: 1, name: "Cervical Cancer Screening", price: 150 },
  { id: 2, name: "Follow-up Consultation", price: 75 },
  { id: 3, name: "Lab Tests Package", price: 200 },
  { id: 4, name: "HPV Vaccination", price: 300 },
]

export default function PaymentsPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-low-risk"
      case "pending":
        return "badge-moderate-risk"
      case "failed":
        return "badge-high-risk"
      default:
        return "badge-primary"
    }
  }

  const handlePayment = async () => {
    if (!selectedService || !phoneNumber) return

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setSelectedService(null)
      setPhoneNumber("")
      // Show success message
    }, 3000)
  }

  const totalPaid = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Manage your payments and billing information</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>Select a service and enter your payment details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="service">Service</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md input-primary"
                    value={selectedService || ""}
                    onChange={(e) => setSelectedService(Number(e.target.value))}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                  <Input
                    id="phone"
                    placeholder="254XXXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-primary"
                  />
                </div>

                {selectedService && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Amount to Pay:</span>
                      <span className="font-bold text-lg">
                        ${services.find((s) => s.id === selectedService)?.price}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={!selectedService || !phoneNumber || isProcessing}
                  className="w-full btn-primary"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Payment Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPaid}</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pendingAmount}</div>
              <p className="text-xs text-muted-foreground">Outstanding balance</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.length}</div>
              <p className="text-xs text-muted-foreground">Total transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent transactions and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(payment.status)}
                    <div>
                      <p className="font-medium">{payment.service}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(payment.date).toLocaleDateString()}
                        <span>•</span>
                        <span>{payment.method}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${payment.amount}</p>
                    <Badge className={getStatusBadgeClass(payment.status)} variant="outline">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Services */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
            <CardDescription>Services you can pay for online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Professional healthcare service</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${service.price}</p>
                    <Button size="sm" variant="outline">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
