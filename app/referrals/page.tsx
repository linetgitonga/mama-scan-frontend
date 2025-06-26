"use client"

import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import {
  ArrowLeft,
  Search,
  Calendar,
  Phone,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Hospital,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Link from "next/link"

export default function ReferralsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const referrals = [
    {
      id: "REF001",
      patient: {
        name: "Mary Wanjiku Kamau",
        id: "P001",
        age: 34,
        phone: "+254712345678",
      },
      riskLevel: "High",
      riskScore: 0.87,
      referralDate: "2024-01-15",
      facility: "Kenyatta National Hospital",
      specialist: "Dr. Sarah Mwangi",
      status: "Pending",
      urgency: "Urgent",
      reason: "High-grade squamous intraepithelial lesion (HSIL) detected",
      followUpDate: "2024-01-22",
      notes: "Patient requires immediate colposcopy and possible biopsy",
    },
    {
      id: "REF002",
      patient: {
        name: "Grace Akinyi Ochieng",
        id: "P002",
        age: 28,
        phone: "+254723456789",
      },
      riskLevel: "Moderate",
      riskScore: 0.64,
      referralDate: "2024-01-14",
      facility: "Aga Khan Hospital",
      specialist: "Dr. Peter Kimani",
      status: "Scheduled",
      urgency: "Routine",
      reason: "Atypical squamous cells of undetermined significance (ASCUS)",
      followUpDate: "2024-02-14",
      notes: "Repeat cytology in 6 months, HPV testing recommended",
    },
    {
      id: "REF003",
      patient: {
        name: "Faith Wanjiru Gitau",
        id: "P004",
        age: 31,
        phone: "+254745678901",
      },
      riskLevel: "High",
      riskScore: 0.79,
      referralDate: "2024-01-12",
      facility: "Nairobi Hospital",
      specialist: "Dr. James Omondi",
      status: "Completed",
      urgency: "Urgent",
      reason: "Multiple high-risk factors with positive VIA",
      followUpDate: "2024-01-19",
      notes: "Colposcopy completed, biopsy results pending",
    },
    {
      id: "REF004",
      patient: {
        name: "Elizabeth Nyambura Mwangi",
        id: "P005",
        age: 26,
        phone: "+254756789012",
      },
      riskLevel: "Moderate",
      riskScore: 0.58,
      referralDate: "2024-01-10",
      facility: "Mater Hospital",
      specialist: "Dr. Mary Njoroge",
      status: "Cancelled",
      urgency: "Routine",
      reason: "Persistent abnormal cytology findings",
      followUpDate: "2024-02-10",
      notes: "Patient unable to attend, rescheduling required",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Calendar className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Urgent":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        )
      case "Routine":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Routine</Badge>
      default:
        return <Badge variant="secondary">{urgency}</Badge>
    }
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredReferrals = referrals.filter((referral) => {
    const matchesSearch =
      referral.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.facility.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && referral.status.toLowerCase() === statusFilter
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Referral Management
              </h1>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              New Referral
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">47</div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">18</div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">15</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name, ID, or facility..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Referrals List */}
        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <Card key={referral.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Patient Information */}
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{referral.patient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {referral.patient.id} • Age: {referral.patient.age}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        {referral.patient.phone}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRiskBadgeColor(referral.riskLevel)}>{referral.riskLevel} Risk</Badge>
                        <span className="text-sm text-muted-foreground">
                          Score: {(referral.riskScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Referral Details */}
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <Hospital className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{referral.facility}</h4>
                        <p className="text-sm text-muted-foreground">{referral.specialist}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-2" />
                        Referred: {referral.referralDate}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-2" />
                        Follow-up: {referral.followUpDate}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{referral.reason}</p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div>
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(referral.status)}
                        {getUrgencyBadge(referral.urgency)}
                      </div>

                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Clinical Notes:</p>
                        <p className="text-sm text-muted-foreground">{referral.notes}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {referral.status === "Pending" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReferrals.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No referrals found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No referrals have been created yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
