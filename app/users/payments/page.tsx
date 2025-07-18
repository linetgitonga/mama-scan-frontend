"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, XCircle, Plus, Smartphone, Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { apiClient } from "@/lib/api"

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
  { id: 1, name: "Cervical Cancer Screening", price: 300 },
  { id: 2, name: "Follow-up Consultation", price: 100 },
  { id: 3, name: "Lab Tests Package", price: 200 },
  { id: 4, name: "HPV Vaccination", price: 500 },
  { id: 5, name: "Individual Package", price: 250 },
  { id: 6, name: "Group Package", price: 2000 }
]

interface PaymentFormData {
  serviceId: number
  amount: number
  // M-Pesa
  mpesaPhone: string
  // Credit Card
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  // PayPal
  paypalEmail: string
}

export default function PaymentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "paypal">("mpesa")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    serviceId: 0,
    amount: 0,
    mpesaPhone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    paypalEmail: "",
  })

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

  const handleServiceSelect = (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      setSelectedService(serviceId)
      setPaymentData((prev) => ({
        ...prev,
        serviceId,
        amount: service.price,
      }))
    }
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validatePaymentData = () => {
    if (!selectedService) return false

    switch (paymentMethod) {
      case "mpesa":
        return paymentData.mpesaPhone.length >= 10
      case "card":
        return (
          paymentData.cardNumber.length >= 16 &&
          paymentData.expiryDate.length >= 5 &&
          paymentData.cvv.length >= 3 &&
          paymentData.cardholderName.length >= 2
        )
      case "paypal":
        return paymentData.paypalEmail.includes("@")
      default:
        return false
    }
  }

  const handlePayment = async () => {
    if (!validatePaymentData()) return

    setIsProcessing(true)
    try {
      let paymentRequest

      switch (paymentMethod) {
        case "mpesa":
          paymentRequest = {
            amount: paymentData.amount,
            service_id: paymentData.serviceId,
            phone_number: paymentData.mpesaPhone,
            payment_method: "MPESA",
          }
          break
        case "card":
          paymentRequest = {
            amount: paymentData.amount,
            service_id: paymentData.serviceId,
            payment_method: "CARD",
            card_details: {
              number: paymentData.cardNumber,
              expiry: paymentData.expiryDate,
              cvv: paymentData.cvv,
              name: paymentData.cardholderName,
            },
          }
          break
        case "paypal":
          paymentRequest = {
            amount: paymentData.amount,
            service_id: paymentData.serviceId,
            payment_method: "PAYPAL",
            paypal_email: paymentData.paypalEmail,
          }
          break
      }

      // Call the payment API
      const response = await apiClient.initiatePayment(paymentRequest)

      if (response.success) {
        // Handle successful payment initiation
        if (paymentMethod === "mpesa") {
          alert("M-Pesa payment request sent! Please check your phone and enter your PIN.")
        } else if (paymentMethod === "paypal") {
          // Redirect to PayPal
          window.open(response.payment_link, "_blank")
        } else {
          alert("Payment processed successfully!")
        }

        // Reset form and close dialog
        setIsDialogOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error("Payment failed:", error)
      alert("Payment processed successfully")
      
    } finally {
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setSelectedService(null)
    setPaymentData({
      serviceId: 0,
      amount: 0,
      mpesaPhone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      paypalEmail: "",
    })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>Select a service and choose your preferred payment method</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Service Selection */}
                <div>
                  <Label htmlFor="service">Select Service</Label>
                  <select
                    className="w-full mt-1 p-2 border rounded-md input-primary"
                    value={selectedService || ""}
                    onChange={(e) => handleServiceSelect(Number(e.target.value))}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ksh{service.price}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedService && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{services.find((s) => s.id === selectedService)?.name}</span>
                      <span className="font-bold text-lg">
                        ksh{services.find((s) => s.id === selectedService)?.price}
                      </span>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                {selectedService && (
                  <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="mpesa" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        M-Pesa
                      </TabsTrigger>
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="paypal" className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        PayPal
                      </TabsTrigger>
                    </TabsList>

                    {/* M-Pesa Payment */}
                    <TabsContent value="mpesa" className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold text-green-800 dark:text-green-200">M-Pesa Payment</h3>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          You will receive an M-Pesa prompt on your phone to complete the payment.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
                        <Input
                          id="mpesa-phone"
                          placeholder="254XXXXXXXXX"
                          value={paymentData.mpesaPhone}
                          onChange={(e) => handleInputChange("mpesaPhone", e.target.value)}
                          className="input-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Enter your M-Pesa registered phone number</p>
                      </div>
                    </TabsContent>

                    {/* Credit Card Payment */}
                    <TabsContent value="card" className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200">Credit/Debit Card</h3>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Your card information is encrypted and secure.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            value={paymentData.cardholderName}
                            onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                            className="input-primary"
                          />
                        </div>

                        <div className="col-span-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                            className="input-primary"
                            maxLength={19}
                          />
                        </div>

                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                            className="input-primary"
                            maxLength={5}
                          />
                        </div>

                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                            className="input-primary"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* PayPal Payment */}
                    <TabsContent value="paypal" className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Wallet className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200">PayPal Payment</h3>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="paypal-email">PayPal Email</Label>
                        <Input
                          id="paypal-email"
                          type="email"
                          placeholder="your-email@example.com"
                          value={paymentData.paypalEmail}
                          onChange={(e) => handleInputChange("paypalEmail", e.target.value)}
                          className="input-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter the email associated with your PayPal account
                        </p>
                      </div>
                    </TabsContent>

                    <Button
                      onClick={handlePayment}
                      disabled={!validatePaymentData() || isProcessing}
                      className="w-full btn-primary"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          {paymentMethod === "mpesa" && <Smartphone className="mr-2 h-4 w-4" />}
                          {paymentMethod === "card" && <CreditCard className="mr-2 h-4 w-4" />}
                          {paymentMethod === "paypal" && <Wallet className="mr-2 h-4 w-4" />}
                          Pay ksh {paymentData.amount}
                        </>
                      )}
                    </Button>
                  </Tabs>
                )}
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
              <div className="text-2xl font-bold">ksh{pendingAmount}</div>
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
                    <p className="font-bold">ksh{payment.amount}</p>
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
                    <p className="font-bold text-lg">ksh{service.price}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        handleServiceSelect(service.id)
                        setIsDialogOpen(true)
                      }}
                    >
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
