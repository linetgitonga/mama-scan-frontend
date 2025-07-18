"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/user/dashboard-layout"
import { StatsCard } from "@/components/user/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Calendar, FileText, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { apiClient, type User, type ScreeningRecord, type ScreeningFollowUp } from "@/lib/api"
import Link from "next/link"

interface DashboardData {
  totalScreenings: number
  nextAppointment: string
  riskLevel: string
  followUps: number
  recentScreenings: Array<{
    id: number
    type: string
    date: string
    riskLevel: string
    status: string
  }>
  user: User | null
}

export default function UserDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalScreenings: 1,
    nextAppointment: "26/07/2025",
    riskLevel: "High",
    followUps: 0,
    recentScreenings: [],
    user: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch user profile
      const userProfile = await apiClient.getProfile()

      // Fetch screenings
      const screeningsResponse = await apiClient.getScreenings()
      const screenings = screeningsResponse.results || []

      // Fetch follow-ups
      const followUpsResponse = await apiClient.getFollowUps()
      const followUps = followUpsResponse.results || []

      // Calculate stats
      const totalScreenings = screenings.length
      const pendingFollowUps = followUps.filter((f: ScreeningFollowUp) => f.status === "SCHEDULED").length

      // Get latest screening for risk level
      const latestScreening = screenings[0]
      const riskLevel = latestScreening?.risk_level || "Unknown"

      // Get recent screenings (last 2)
      const recentScreenings = screenings.slice(0, 2).map((screening: ScreeningRecord) => ({
        id: screening.id,
        type: "Cervical Cancer Screening",
        date: screening.screening_date,
        riskLevel: screening.risk_level || "Unknown",
        status: "Completed",
      }))

      // Get next appointment date
      const upcomingFollowUp = followUps.find(
        (f: ScreeningFollowUp) => f.status === "SCHEDULED" && new Date(f.follow_up_date) >= new Date(),
      )
      const nextAppointment = upcomingFollowUp
        ? new Date(upcomingFollowUp.follow_up_date).toLocaleDateString()
        : "Not scheduled"

      setDashboardData({
        totalScreenings,
        nextAppointment,
        riskLevel,
        followUps: pendingFollowUps,
        recentScreenings,
        user: userProfile,
      })
    } catch (err) {
      setError("Failed to load dashboard data")
      console.error("Dashboard error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="hero-gradient rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {dashboardData.user?.first_name || dashboardData.user?.username || "User"}!
          </h1>
          <p className="text-muted-foreground">Stay on top of your health with regular screenings and check-ups.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Screenings"
            value={dashboardData.totalScreenings}
            description="Completed screenings"
            icon={Activity}
          />
          <StatsCard
            title="Next Appointment"
            value={dashboardData.nextAppointment}
            description="Upcoming screening"
            icon={Calendar}
          />
          <StatsCard
            title="Risk Level"
            value={dashboardData.riskLevel}
            description="Current assessment"
            icon={CheckCircle}
          />
          <StatsCard title="Follow-ups" value={dashboardData.followUps} description="Pending actions" icon={Clock} />
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Screenings */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Screenings</CardTitle>
              <CardDescription>Your latest screening results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.recentScreenings.length > 0 ? (
                dashboardData.recentScreenings.map((screening) => (
                  <div key={screening.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div>
                      <p className="font-medium">{screening.type}</p>
                      <p className="text-sm text-muted-foreground">{new Date(screening.date).toLocaleDateString()}</p>
                    </div>
                    <Badge className={`badge-${screening.riskLevel.toLowerCase()}-risk`}>
                      {screening.riskLevel} Risk
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No recent screenings</p>
              )}
              <Link href="/users/screenings">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Screenings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/users/appointments">
                <Button className="w-full justify-start btn-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
              </Link>
              <Link href="/users/screenings">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  View Test Results
                </Button>
              </Link>
              <Link href="/users/resources">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Activity className="mr-2 h-4 w-4" />
                  Health Resources
                </Button>
              </Link>
              <Link href="/users/screenings">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Track Progress
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Health Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <div>
                  <p className="font-medium">Annual Screening Due</p>
                  <p className="text-sm opacity-80">Your next cervical cancer screening is due in 2 months</p>
                </div>
                <Link href="/users/appointments">
                  <Button size="sm">Schedule</Button>
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                <div>
                  <p className="font-medium">Profile Complete</p>
                  <p className="text-sm opacity-80">Your health profile is up to date</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
