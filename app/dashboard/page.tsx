"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Users, UserCheck, AlertTriangle, TrendingUp, MapPin, Activity, Bell, Plus, Search, Filter } from "lucide-react"
import { Input } from "../../components/ui/input"
import { useAuth } from "../..//hooks/useAuth"
import { apiClient, type Patient, type ScreeningRecord } from "../../lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchDashboardData()
    }
  }, [user, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const [patientsResponse, screeningsResponse] = await Promise.all([
        apiClient.getPatients(),
        apiClient.getScreenings(),
      ])

      setPatients(patientsResponse.results || [])
      setScreenings(screeningsResponse.results || [])
    } catch (error: any) {
      setError(error.message || "Failed to fetch dashboard data")
      console.error("Dashboard data fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  // Calculate stats from real data
  const totalPatients = patients.length
  const todayScreenings = screenings.filter(
    (s) => new Date(s.screening_date).toDateString() === new Date().toDateString(),
  ).length
  const highRiskCases = screenings.filter((s) => s.risk_level === "High Risk").length
  const pendingReferrals = screenings.filter((s) => s.referral_needed && !s.risk_level).length

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients.toString(),
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Screened Today",
      value: todayScreenings.toString(),
      change: "+5%",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "High Risk Cases",
      value: highRiskCases.toString(),
      change: "+8%",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Referrals Pending",
      value: pendingReferrals.toString(),
      change: "-3%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  // Get recent patients (last 5)
  const recentPatients = patients
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map((patient) => {
      const patientScreenings = screenings.filter((s) => s.patient === patient.id)
      const latestScreening = patientScreenings.sort(
        (a, b) => new Date(b.screening_date).getTime() - new Date(a.screening_date).getTime(),
      )[0]

      return {
        id: patient.id.toString(),
        name: `${patient.first_name} ${patient.last_name}`,
        age: new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear(),
        riskLevel: latestScreening?.risk_level || "Unknown",
        lastScreening: latestScreening?.screening_date || "Never",
        location: `${patient.county}, ${patient.sub_county}`,
      }
    })

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

  return (
    <div className="min-h-screen mybackground">
      {/* Header */}
      {/* <header className=" mybackground ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  MAMA-SCAN
                </h1>
              </div>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700 dark:from-pink-900/50 dark:to-blue-900/50 dark:text-pink-300"
              >
                AI-Powered Screening
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-pink-100 dark:hover:bg-pink-900/50">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium">{user?.username || "User"}</span>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mybackground  mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="mb-6 mybackground">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mybackground">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <div className="flex gap-2">
              <Link href="/patients/new">
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  New Patient
                </Button>
              </Link>
              <Link href="/screening/new">
                <Button variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Start Screening
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Latest screening activities</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>Age: {patient.age}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {patient.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getRiskBadgeColor(patient.riskLevel)}>{patient.riskLevel} Risk</Badge>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last Screening</p>
                        <p className="text-sm font-medium">
                          {patient.lastScreening === "Never"
                            ? "Never"
                            : new Date(patient.lastScreening).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/patients">
                  <Button variant="outline" className="w-full">
                    View All Patients
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Screening Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Progress</CardTitle>
                <CardDescription>Screening targets for January 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Screenings Completed</span>
                    <span>156/200</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>High-Risk Identified</span>
                    <span>47/50</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Referrals Completed</span>
                    <span>35/47</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/screening/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Start New Screening
                  </Button>
                </Link>
                <Link href="/patients" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Patients
                  </Button>
                </Link>
                <Link href="/referrals" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Referrals
                  </Button>
                </Link>
                <Link href="/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Model</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Sync</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Synced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Offline Mode</span>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Available</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
