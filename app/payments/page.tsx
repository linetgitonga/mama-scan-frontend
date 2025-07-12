"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { CreditCard, Smartphone, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { apiClient, type PaymentRequest, type PaymentStatus } from "../../lib/api"
import { formatCurrency, formatDateTime } from "@/lib/utils"

interface Service {
  id: number
  name: string
  price: number
  description: string
}

const services: Service[] = [
  { id: 1, name: "Consultation", price: 500, description: "General medical consultation" },
  { id: 2, name: "Screening", price: 1000, description: "Cervical cancer screening" },
  { id: 3, name: "Follow-up", price: 300, description: "Follow-up appointment" },
  { id: 4, name: "Lab Tests", price: 1500, description: "Laboratory tests and analysis" },
]

export default function PaymentsPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [paymentHistory, setPaymentHistory] = useState<PaymentStatus[]>([])
  const [currentPayment, setCurrentPayment] = useState<{
    transactionId: string
    status: PaymentStatus | null
  } | null>(null)

  useEffect(() => {
    // Load payment history from localStorage for demo
    const history = localStorage.getItem("payment_history")
    if (history) {
      setPaymentHistory(JSON.parse(history))
    }
  }, [])

  const handleInitiatePayment = async () => {
    if (!selectedService || !phoneNumber) return

    setIsLoading(true)
    try {
      const paymentData: PaymentRequest = {
        amount: selectedService.price,
        service_id: selectedService.id,
        phone_number: phoneNumber,
      }

      const response = await apiClient.initiatePayment(paymentData)

      if (response.success) {
        setCurrentPayment({
          transactionId: response.transaction_id,
          status: null,
        })

        // Open payment link in new window
        window.open(response.payment_link, "_blank")

        // Start polling for payment status
        pollPaymentStatus(response.transaction_id)
      }
    } catch (error) {
      console.error("Payment initiation failed:", error)
      alert("Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const pollPaymentStatus = async (transactionId: string) => {
    const maxAttempts = 30 // Poll for 5 minutes (30 * 10 seconds)
    let attempts = 0

    const poll = async () => {
      try {
        const status = await apiClient.getPaymentStatus(transactionId)
        setCurrentPayment((prev) => (prev ? { ...prev, status } : null))

        if (status.status === "COMPLETED" || status.status === "FAILED") {
          // Add to payment history
          const newHistory = [...paymentHistory, status]
          setPaymentHistory(newHistory)
          localStorage.setItem("payment_history", JSON.stringify(newHistory))
          return
        }

        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000) // Poll every 10 seconds
        }
      } catch (error) {
        console.error("Failed to check payment status:", error)
      }
    }

    poll()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "FAILED":
      case "CANCELLED":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant =
      status === "COMPLETED" ? "default" : status === "FAILED" || status === "CANCELLED" ? "destructive" : "secondary"
    return <Badge variant={variant}>{status}</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Payments</h1>
      </div>

      <Tabs defaultValue="new-payment" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new-payment">New Payment</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="new-payment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Service</CardTitle>
                <CardDescription>Choose the service you want to pay for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService?.id === service.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <span className="font-bold text-primary">{formatCurrency(service.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your M-Pesa phone number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      +254
                    </span>
                    <Input
                      type="tel"
                      placeholder="712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                {selectedService && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{selectedService.name}</span>
                      <span className="font-bold">{formatCurrency(selectedService.price)}</span>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleInitiatePayment}
                  disabled={!selectedService || !phoneNumber || isLoading}
                  className="w-full"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  {isLoading ? "Processing..." : "Pay with M-Pesa"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Current Payment Status */}
          {currentPayment && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Transaction ID: {currentPayment.transactionId}</CardDescription>
              </CardHeader>
              <CardContent>
                {currentPayment.status ? (
                  <div className="flex items-center gap-2">
                    {getStatusIcon(currentPayment.status.status)}
                    <span className="font-medium">Payment {currentPayment.status.status.toLowerCase()}</span>
                    {getStatusBadge(currentPayment.status.status)}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 animate-spin" />
                    <span>Waiting for payment confirmation...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all your previous payments</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No payment history found</div>
              ) : (
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.transaction_id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(payment.status)}
                        <div>
                          <p className="font-medium">{payment.service}</p>
                          <p className="text-sm text-muted-foreground">{payment.transaction_id}</p>
                          {payment.created_at && (
                            <p className="text-xs text-muted-foreground">{formatDateTime(payment.created_at)}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(payment.amount)}</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
