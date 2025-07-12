"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Calendar, Search, Download } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface CompletedReferral {
  id: number
  patient_name: string
  patient_id: string
  referred_to: string
  referral_date: string
  completion_date: string
  outcome: "TREATED" | "FOLLOW_UP_REQUIRED" | "REFERRED_FURTHER" | "NO_ACTION_NEEDED"
  diagnosis: string
  treatment_provided?: string
  follow_up_required: boolean
  follow_up_date?: string
  notes: string
  referred_by: string
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
}

const mockCompletedReferrals: CompletedReferral[] = [
  {
    id: 1,
    patient_name: "Mary Wanjiku",
    patient_id: "P001",
    referred_to: "Kenyatta National Hospital",
    referral_date: "2024-01-15",
    completion_date: "2024-01-20",
    outcome: "TREATED",
    diagnosis: "Cervical Intraepithelial Neoplasia (CIN 2)",
    treatment_provided: "LEEP procedure completed successfully",
    follow_up_required: true,
    follow_up_date: "2024-04-20",
    notes: "Patient responded well to treatment. Scheduled for 3-month follow-up.",
    referred_by: "Dr. Sarah Johnson",
    priority: "HIGH",
  },
  {
    id: 2,
    patient_name: "Grace Muthoni",
    patient_id: "P002",
    referred_to: "Nairobi Women's Hospital",
    referral_date: "2024-01-10",
    completion_date: "2024-01-18",
    outcome: "FOLLOW_UP_REQUIRED",
    diagnosis: "Atypical Squamous Cells (ASCUS)",
    treatment_provided: "Colposcopy performed, biopsy taken",
    follow_up_required: true,
    follow_up_date: "2024-02-18",
    notes: "Biopsy results pending. Patient advised to return in 4 weeks.",
    referred_by: "Dr. James Kimani",
    priority: "MEDIUM",
  },
  {
    id: 3,
    patient_name: "Susan Akinyi",
    patient_id: "P003",
    referred_to: "Aga Khan Hospital",
    referral_date: "2024-01-05",
    completion_date: "2024-01-12",
    outcome: "NO_ACTION_NEEDED",
    diagnosis: "Normal cervical cytology",
    treatment_provided: "Routine screening completed",
    follow_up_required: false,
    notes: "Normal results. Patient advised to continue routine screening.",
    referred_by: "Dr. Sarah Johnson",
    priority: "LOW",
  },
]

export default function CompletedReferralsPage() {
  const [referrals, setReferrals] = useState<CompletedReferral[]>(mockCompletedReferrals)
  const [filteredReferrals, setFilteredReferrals] = useState<CompletedReferral[]>(mockCompletedReferrals)
  const [searchTerm, setSearchTerm] = useState("")
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  useEffect(() => {
    let filtered = referrals

    if (searchTerm) {
      filtered = filtered.filter(
        (referral) =>
          referral.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          referral.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          referral.referred_to.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (outcomeFilter !== "all") {
      filtered = filtered.filter((referral) => referral.outcome === outcomeFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((referral) => referral.priority === priorityFilter)
    }

    setFilteredReferrals(filtered)
  }, [referrals, searchTerm, outcomeFilter, priorityFilter])

  const getOutcomeBadge = (outcome: string) => {
    const variants = {
      TREATED: "default",
      FOLLOW_UP_REQUIRED: "secondary",
      REFERRED_FURTHER: "outline",
      NO_ACTION_NEEDED: "secondary",
    } as const

    return (
      <Badge variant={variants[outcome as keyof typeof variants] || "secondary"}>{outcome.replace(/_/g, " ")}</Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      LOW: "secondary",
      MEDIUM: "outline",
      HIGH: "default",
      URGENT: "destructive",
    } as const

    return <Badge variant={variants[priority as keyof typeof variants] || "secondary"}>{priority}</Badge>
  }

  const exportData = () => {
    const csvContent = [
      ["Patient Name", "Patient ID", "Referred To", "Completion Date", "Outcome", "Diagnosis", "Priority"],
      ...filteredReferrals.map((referral) => [
        referral.patient_name,
        referral.patient_id,
        referral.referred_to,
        referral.completion_date,
        referral.outcome,
        referral.diagnosis,
        referral.priority,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "completed_referrals.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Completed Referrals</h1>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, ID, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Outcome</label>
              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All outcomes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="TREATED">Treated</SelectItem>
                  <SelectItem value="FOLLOW_UP_REQUIRED">Follow-up Required</SelectItem>
                  <SelectItem value="REFERRED_FURTHER">Referred Further</SelectItem>
                  <SelectItem value="NO_ACTION_NEEDED">No Action Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Completed</p>
                <p className="text-2xl font-bold">{filteredReferrals.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Treated</p>
                <p className="text-2xl font-bold">{filteredReferrals.filter((r) => r.outcome === "TREATED").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Follow-up Required</p>
                <p className="text-2xl font-bold">{filteredReferrals.filter((r) => r.follow_up_required).length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">No Action Needed</p>
                <p className="text-2xl font-bold">
                  {filteredReferrals.filter((r) => r.outcome === "NO_ACTION_NEEDED").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals List */}
      <div className="space-y-4">
        {filteredReferrals.map((referral) => (
          <Card key={referral.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{referral.patient_name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {referral.patient_id}</p>
                </div>
                <div className="flex gap-2">
                  {getOutcomeBadge(referral.outcome)}
                  {getPriorityBadge(referral.priority)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Referred To</p>
                  <p className="text-sm">{referral.referred_to}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Date</p>
                  <p className="text-sm">{formatDate(referral.completion_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Referred By</p>
                  <p className="text-sm">{referral.referred_by}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Diagnosis</p>
                  <p className="text-sm">{referral.diagnosis}</p>
                </div>

                {referral.treatment_provided && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Treatment Provided</p>
                    <p className="text-sm">{referral.treatment_provided}</p>
                  </div>
                )}

                {referral.follow_up_required && referral.follow_up_date && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Follow-up Date</p>
                    <p className="text-sm">{formatDate(referral.follow_up_date)}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notes</p>
                  <p className="text-sm">{referral.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReferrals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No completed referrals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || outcomeFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your filters to see more results."
                : "Completed referrals will appear here once patients have been treated."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
