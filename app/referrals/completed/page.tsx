"use client"

import { useState } from "react"
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Search, Calendar, Phone, CheckCircle, User, Hospital, Eye, Download, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export default function CompletedReferralsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [outcomeFilter, setOutcomeFilter] = useState("all")
  const [facilityFilter, setFacilityFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const completedReferrals = [
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
      completedDate: "2024-01-19",
      facility: "Nairobi Hospital",
      specialist: "Dr. James Omondi",
      urgency: "Urgent",
      reason: "Multiple high-risk factors with positive VIA",
      outcome: "Colposcopy completed, biopsy results pending",
      followUpRequired: true,
      nextAppointment: "2024-02-19",
      notes: "Colposcopy completed, biopsy results pending. Patient counseled on findings.",
      daysToComplete: 7,
    },
    {
      id: "REF009",
      patient: {
        name: "Margaret Wambui Kariuki",
        id: "P010",
        age: 35,
        phone: "+254778901234",
      },
      riskLevel: "Moderate",
      riskScore: 0.65,
      referralDate: "2024-01-08",
      completedDate: "2024-01-15",
      facility: "Aga Khan Hospital",
      specialist: "Dr. Peter Kimani",
      urgency: "Routine",
      reason: "Atypical squamous cells of undetermined significance (ASCUS)",
      outcome: "Normal colposcopy, repeat screening in 12 months",
      followUpRequired: true,
      nextAppointment: "2025-01-15",
      notes: "Colposcopy showed normal findings. Continue routine screening.",
      daysToComplete: 7,
    },
    {
      id: "REF010",
      patient: {
        name: "Rose Nyokabi Mwangi",
        id: "P011",
        age: 28,
        phone: "+254789012345",
      },
      riskLevel: "High",
      riskScore: 0.84,
      referralDate: "2024-01-05",
      completedDate: "2024-01-10",
      facility: "Kenyatta National Hospital",
      specialist: "Dr. Sarah Mwangi",
      urgency: "Urgent",
      reason: "High-grade squamous intraepithelial lesion (HSIL) detected",
      outcome: "LEEP procedure completed successfully",
      followUpRequired: true,
      nextAppointment: "2024-04-10",
      notes: "LEEP procedure completed. Patient recovering well. Follow-up in 3 months.",
      daysToComplete: 5,
    },
    {
      id: "REF011",
      patient: {
        name: "Joyce Akinyi Ochieng",
        id: "P012",
        age: 32,
        phone: "+254790123456",
      },
      riskLevel: "Moderate",
      riskScore: 0.58,
      referralDate: "2024-01-03",
      completedDate: "2024-01-08",
      facility: "Mater Hospital",
      specialist: "Dr. Mary Njoroge",
      urgency: "Routine",
      reason: "Persistent abnormal cytology findings",
      outcome: "Biopsy negative, continue routine screening",
      followUpRequired: false,
      nextAppointment: null,
      notes: "Biopsy results negative. Patient can return to routine screening schedule.",
      daysToComplete: 5,
    },
    {
      id: "REF012",
      patient: {
        name: "Agnes Wanjiku Kamau",
        id: "P013",
        age: 29,
        phone: "+254701234567",
      },
      riskLevel: "High",
      riskScore: 0.76,
      referralDate: "2023-12-28",
      completedDate: "2024-01-05",
      facility: "Nairobi Hospital",
      specialist: "Dr. James Omondi",
      urgency: "Urgent",
      reason: "Suspicious lesions on VIA examination",
      outcome: "Cryotherapy completed, excellent response",
      followUpRequired: true,
      nextAppointment: "2024-07-05",
      notes: "Cryotherapy completed successfully. Patient responded well to treatment.",
      daysToComplete: 8,
    },
  ]

  const getOutcomeBadge = (outcome: string) => {
    if (outcome.includes("negative") || outcome.includes("Normal")) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Favorable
        </Badge>
      )
    } else if (outcome.includes("completed") || outcome.includes("successfully")) {
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Treatment Complete
        </Badge>
      )
    } else if (outcome.includes("pending")) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending Results</Badge>
      )
    }
    return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Completed</Badge>
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

  const filteredReferrals = completedReferrals.filter((referral) => {
    const matchesSearch =
      referral.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.facility.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOutcome =
      outcomeFilter === "all" ||
      (() => {
        switch (outcomeFilter) {
          case "favorable":
            return referral.outcome.includes("negative") || referral.outcome.includes("Normal")
          case "treatment":
            return referral.outcome.includes("completed") || referral.outcome.includes("successfully")
          case "pending":
            return referral.outcome.includes("pending")
          default:
            return true
        }
      })()

    const matchesFacility = facilityFilter === "all" || referral.facility === facilityFilter

    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const completedDate = new Date(referral.completedDate)
        const now = new Date()

        switch (dateFilter) {
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return completedDate >= weekAgo
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            return completedDate >= monthAgo
          case "quarter":
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            return completedDate >= quarterAgo
          default:
            return true
        }
      })()

    return matchesSearch && matchesOutcome && matchesFacility && matchesDate
  })

  const stats = {
    total: completedReferrals.length,
    favorable: completedReferrals.filter((r) => r.outcome.includes("negative") || r.outcome.includes("Normal")).length,
    treatment: completedReferrals.filter((r) => r.outcome.includes("completed") || r.outcome.includes("successfully"))
      .length,
    followUpRequired: completedReferrals.filter((r) => r.followUpRequired).length,
  }

  const facilities = [...new Set(completedReferrals.map((r) => r.facility))]
  const avgCompletionTime = Math.round(
    completedReferrals.reduce((sum, r) => sum + r.daysToComplete, 0) / completedReferrals.length,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Completed Referrals</h1>
          <p className="text-muted-foreground">Track outcomes and follow-up requirements</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Completed</p>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">Avg: {avgCompletionTime} days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.favorable}</div>
            <p className="text-sm text-muted-foreground">Favorable Outcomes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.treatment}</div>
            <p className="text-sm text-muted-foreground">Treatments Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.followUpRequired}</div>
            <p className="text-sm text-muted-foreground">Follow-up Required</p>
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

            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outcomes</SelectItem>
                <SelectItem value="favorable">Favorable</SelectItem>
                <SelectItem value="treatment">Treatment Complete</SelectItem>
                <SelectItem value="pending">Pending Results</SelectItem>
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

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Completed Referrals List */}
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

                {/* Referral Timeline */}
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
                      <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                      Completed: {referral.completedDate}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed in {referral.daysToComplete} days</div>
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-2">
                      {getOutcomeBadge(referral.outcome)}
                      {referral.followUpRequired && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          Follow-up Required
                        </Badge>
                      )}
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Outcome:</p>
                      <p className="text-sm text-muted-foreground">{referral.outcome}</p>
                    </div>

                    {referral.nextAppointment && (
                      <div className="text-sm">
                        <span className="font-medium">Next Appointment:</span>
                        <br />
                        <span className="text-muted-foreground">{referral.nextAppointment}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    {referral.followUpRequired && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Follow-up
                      </Button>
                    )}
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
            <h3 className="text-lg font-medium mb-2">No completed referrals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || outcomeFilter !== "all" || facilityFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No referrals have been completed yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
