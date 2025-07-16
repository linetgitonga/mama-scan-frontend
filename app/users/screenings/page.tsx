import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Download, Eye, Plus } from "lucide-react"

const screenings = [
  {
    id: 1,
    date: "2024-11-15",
    type: "Cervical Cancer Screening",
    riskLevel: "Low",
    riskScore: 0.15,
    status: "Completed",
    notes: "Regular screening with normal results. Continue routine monitoring.",
    nextDue: "2025-11-15",
  },
  {
    id: 2,
    date: "2024-10-20",
    type: "Follow-up Consultation",
    riskLevel: "Low",
    riskScore: 0.12,
    status: "Completed",
    notes: "Follow-up after previous screening. All parameters normal.",
    nextDue: null,
  },
  {
    id: 3,
    date: "2023-11-10",
    type: "Annual Screening",
    riskLevel: "Moderate",
    riskScore: 0.35,
    status: "Completed",
    notes: "Slight irregularities noted. Follow-up recommended.",
    nextDue: "2024-11-10",
  },
]

export default function ScreeningsPage() {
  const getRiskBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
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

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Completed screenings</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Risk Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Low</div>
              <p className="text-xs text-muted-foreground">Based on latest screening</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Nov 2025</div>
              <p className="text-xs text-muted-foreground">Annual screening</p>
            </CardContent>
          </Card>
        </div>

        {/* Screenings List */}
        <div className="space-y-4">
          {screenings.map((screening) => (
            <Card key={screening.id} className="card-gradient">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{screening.type}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(screening.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getRiskBadgeClass(screening.riskLevel)}>{screening.riskLevel} Risk</Badge>
                    <Badge variant="outline">{screening.status}</Badge>
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
                        <span className="font-medium">{(screening.riskScore * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${screening.riskScore * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Next Actions</h4>
                    <div className="text-sm text-muted-foreground">
                      {screening.nextDue ? (
                        <p>Next screening due: {new Date(screening.nextDue).toLocaleDateString()}</p>
                      ) : (
                        <p>No follow-up required</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Clinical Notes</h4>
                  <p className="text-sm text-muted-foreground">{screening.notes}</p>
                </div>

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
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
