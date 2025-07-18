"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Download, Eye, Plus } from "lucide-react"
import { apiClient, type ScreeningRecord } from "@/lib/api"

export default function ScreeningsPage() {
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchScreenings()
  }, [])

  const fetchScreenings = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getScreenings()
      setScreenings(response.results || [])
    } catch (err) {
      setError("Failed to fetch screenings")
      console.error("Error fetching screenings:", err)
    } finally {
      setLoading(false)
    }
  }

  const getRiskBadgeClass = (level: string) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "badge-low-risk"
      case "moderate":
        return "badge-moderate-risk"
      case "high":
        return "badge-high-risk"
      default:
        return "badge-primary"
    }
  }

  const currentRiskLevel = screenings.length > 0 ? screenings[0].risk_level || "Unknown" : "Unknown"
  const nextDue = screenings.length > 0 ? "Nov 2025" : "Not scheduled"

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="spinner-primary animate-spin rounded-full h-8 w-8 border-b-2"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Screenings</h1>
            <p className="text-muted-foreground">View your screening history and results</p>
          </div>
          <Button className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Schedule New Screening
          </Button>
        </div>

        {error && (
          <div className="alert-error p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{screenings.length}</div>
              <p className="text-xs text-muted-foreground">Completed screenings</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentRiskLevel}</div>
              <p className="text-xs text-muted-foreground">Based on latest screening</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nextDue}</div>
              <p className="text-xs text-muted-foreground">Annual screening</p>
            </CardContent>
          </Card>
        </div>

        {/* Screenings List */}
        <div className="space-y-4">
          {screenings.length === 0 ? (
            <Card className="card-gradient">
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Screenings Yet</h3>
                <p className="text-muted-foreground mb-4">Schedule your first screening to get started</p>
                <Button className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Screening
                </Button>
              </CardContent>
            </Card>
          ) : (
            screenings.map((screening) => (
              <Card key={screening.id} className="card-gradient">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Cervical Cancer Screening</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(screening.screening_date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getRiskBadgeClass(screening.risk_level)}>
                        {screening.risk_level || "Unknown"} Risk
                      </Badge>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Score:</span>
                          <span className="font-medium">
                            {screening.ai_risk_score ? `${(screening.ai_risk_score * 100).toFixed(1)}%` : "N/A"}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(screening.ai_risk_score || 0) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Clinical Details</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Age: {screening.age}</p>
                        <p>HIV Status: {screening.hiv_status}</p>
                        <p>HPV Vaccination: {screening.hpv_vaccination_status}</p>
                      </div>
                    </div>
                  </div>

                  {screening.clinical_notes && (
                    <div>
                      <h4 className="font-medium mb-2">Clinical Notes</h4>
                      <p className="text-sm text-muted-foreground">{screening.clinical_notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Share with Doctor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
