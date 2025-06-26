"use client"

import { useState } from "react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import {
  Search,
  Calendar,
  Phone,
  AlertTriangle,
  Clock,
  User,
  Hospital,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Alert, AlertDescription } from "../../../components/ui/alert"

export default function PendingReferralsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [facilityFilter, setFacilityFilter] = useState("all")

  const pendingReferrals = [
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
      urgency: "Urgent",
      reason: "High-grade squamous intraepithelial lesion (HSIL) detected",
      followUpDate: "2024-01-22",
      notes: "Patient requires immediate colposcopy and possible biopsy",
      daysPending: 7,
    },
    {
      id: "REF005",
      patient: {
        name: "Jane Nyokabi Mwangi",
        id: "P006",
        age: 29,
        phone: "+254734567890",
      },
      riskLevel: "High",
      riskScore: 0.82,
      referralDate: "2024-01-16",
      facility: "Nairobi Hospital",
      specialist: "Dr. James Omondi",
      urgency: "Urgent",
      reason: "Multiple high-risk factors with positive VIA",
      followUpDate: "2024-01-23",
      notes: "Patient has family history and multiple risk factors",
      daysPending: 6,
    },
    {
      id: "REF006",
      patient: {
        name: "Susan Wanjiru Gitau",
        id: "P007",
        age: 31,
        phone: "+254745678901",
      },
      riskLevel: "Moderate",
      riskScore: 0.68,
      referralDate: "2024-01-17",
      facility: "Aga Khan Hospital",
      specialist: "Dr. Peter Kimani",
      urgency: "Routine",
      reason: "Atypical squamous cells of undetermined significance (ASCUS)",
      followUpDate: "2024-02-17",
      notes: "Repeat cytology recommended, HPV testing needed",
      daysPending: 5,
    },
    {
      id: "REF007",
      patient: {
        name: "Grace Akinyi Ochieng",
        id: "P008",
        age: 26,
        phone: "+254756789012",
      },
      riskLevel: "Moderate",
      riskScore: 0.61,
      referralDate: "2024-01-18",
      facility: "Mater Hospital",
      specialist: "Dr. Mary Njoroge",
      urgency: "Routine",
      reason: "Persistent abnormal cytology findings",
      followUpDate: "2024-02-18",
      notes: "Patient needs follow-up screening in 6 months",
      daysPending: 4,
    },
    {
      id: "REF008",
      patient: {
        name: "Catherine Wambui Kariuki",
        id: "P009",
        age: 38,
        phone: "+254767890123",
      },
      riskLevel: "High",
      riskScore: 0.79,
      referralDate: "2024-01-19",
      facility: "Kenyatta National Hospital",
      specialist: "Dr. Sarah Mwangi",
      urgency: "Urgent",
      reason: "Suspicious lesions on VIA examination",
      followUpDate: "2024-01-26",
      notes: "Immediate colposcopy required, patient counseled",
      daysPending: 3,
    },
  ]

  const getUrgencyBadge = (urgency: string, daysPending: number) => {
    if (urgency === "Urgent" && daysPending > 5) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      )
    }

    switch (urgency) {
      case "Urgent":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        )
      case "Routine":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Routine
          </Badge>
        )
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

  const filteredReferrals = pendingReferrals.filter((referral) => {
    const matchesSearch =
      referral.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.facility.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesUrgency = urgencyFilter === "all" || referral.urgency.toLowerCase() === urgencyFilter

    const matchesFacility = facilityFilter === "all" || referral.facility === facilityFilter

    return matchesSearch && matchesUrgency && matchesFacility
  })

  const stats = {
    total: pendingReferrals.length,
    urgent: pendingReferrals.filter((r) => r.urgency === "Urgent").length,
    overdue: pendingReferrals.filter((r) => r.urgency === "Urgent" && r.daysPending > 5).length,
    routine: pendingReferrals.filter((r) => r.urgency === "Routine").length,
  }

  const facilities = [...new Set(pendingReferrals.map((r) => r.facility))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pending Referrals</h1>
          <p className="text-muted-foreground">Manage and track pending patient referrals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Bulk Update
        </Button>
      </div>

      {/* Alert for overdue referrals */}
      {stats.overdue > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Attention:</strong> {stats.overdue} urgent referral{stats.overdue > 1 ? "s are" : " is"} overdue and
            require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.urgent}</div>
            <p className="text-sm text-muted-foreground">Urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.routine}</div>
            <p className="text-sm text-muted-foreground">Routine</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
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

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency Levels</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
              </SelectContent>
            </Select>

            <Select value={facilityFilter} onValueChange={setFacilityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by facility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Facilities</SelectItem>
                {facilities.map((facility) => (
                  <SelectItem key={facility} value={facility}>
                    {facility}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pending Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map((referral) => (
          <Card key={referral.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
                  </div>
                </div>

                {/* Status and Urgency */}
                <div>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-2">
                      {getUrgencyBadge(referral.urgency, referral.daysPending)}
                      <div className="text-sm text-muted-foreground">
                        Pending for {referral.daysPending} day{referral.daysPending !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Reason:</p>
                      <p className="text-sm text-muted-foreground">{referral.reason}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Scheduled
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Update Status
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Clinical Notes:</p>
                <p className="text-sm text-muted-foreground">{referral.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReferrals.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No pending referrals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || urgencyFilter !== "all" || facilityFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "All referrals have been processed"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
