// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import { Progress } from "../../components/ui/progress"
// import {
//   ArrowLeft,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   CheckCircle,
//   Calendar,
//   MapPin,
//   Download,
//   BarChart3,
//   Activity,
// } from "lucide-react"
// import Link from "next/link"

// export default function AnalyticsPage() {
//   const monthlyStats = [
//     { month: "Jan", screenings: 156, highRisk: 12, referrals: 8 },
//     { month: "Feb", screenings: 189, highRisk: 15, referrals: 12 },
//     { month: "Mar", screenings: 234, highRisk: 18, referrals: 15 },
//     { month: "Apr", screenings: 198, highRisk: 14, referrals: 11 },
//     { month: "May", screenings: 267, highRisk: 21, referrals: 18 },
//     { month: "Jun", screenings: 289, highRisk: 23, referrals: 20 },
//   ]

//   const countyData = [
//     { county: "Nairobi", patients: 847, screenings: 1234, highRisk: 89, coverage: 78 },
//     { county: "Kiambu", patients: 623, screenings: 891, highRisk: 67, coverage: 72 },
//     { county: "Kisumu", patients: 456, screenings: 678, highRisk: 45, coverage: 68 },
//     { county: "Nakuru", patients: 389, screenings: 567, highRisk: 34, coverage: 65 },
//     { county: "Mombasa", patients: 532, screenings: 723, highRisk: 56, coverage: 71 },
//   ]

//   const riskDistribution = [
//     { level: "Low Risk", count: 2644, percentage: 85.2, color: "bg-green-500" },
//     { level: "Moderate Risk", count: 356, percentage: 11.5, color: "bg-yellow-500" },
//     { level: "High Risk", count: 103, percentage: 3.3, color: "bg-red-500" },
//   ]

//   return (
//     <div className="min-h-screen mybackground">
//       {/* Header */}
//       <header className="mybackground ">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Link href="/">
//                 <Button variant="ghost" size="icon">
//                   <ArrowLeft className="h-4 w-4" />
//                 </Button>
//               </Link>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
//                 Analytics Dashboard
//               </h1>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button variant="outline">
//                 <Download className="h-4 w-4 mr-2" />
//                 Export Report
//               </Button>
//               <Button variant="outline">
//                 <Calendar className="h-4 w-4 mr-2" />
//                 Date Range
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-6">
//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">3,847</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
//                 <span className="text-green-600">+12.5%</span>
//                 <span className="ml-1">from last month</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">High Risk Detected</CardTitle>
//               <AlertTriangle className="h-4 w-4 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">103</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
//                 <span className="text-red-600">+8.4%</span>
//                 <span className="ml-1">from last month</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Referrals Completed</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">84</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
//                 <span className="text-green-600">-2.1%</span>
//                 <span className="ml-1">pending referrals</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
//               <BarChart3 className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">94.7%</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-blue-600" />
//                 <span className="text-blue-600">+1.2%</span>
//                 <span className="ml-1">model improvement</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//           {/* Monthly Trends */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle>Monthly Screening Trends</CardTitle>
//               <CardDescription>Screening activities over the past 6 months</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {monthlyStats.map((month, index) => (
//                   <div key={month.month} className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 text-sm font-medium">{month.month}</div>
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="text-sm">Screenings: {month.screenings}</span>
//                           <span className="text-sm text-red-600">High Risk: {month.highRisk}</span>
//                         </div>
//                         <Progress value={(month.screenings / 300) * 100} className="h-2" />
//                       </div>
//                     </div>
//                     <div className="text-sm text-muted-foreground">{month.referrals} referrals</div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Risk Distribution */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Risk Level Distribution</CardTitle>
//               <CardDescription>Current patient risk categorization</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {riskDistribution.map((risk, index) => (
//                   <div key={risk.level}>
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium">{risk.level}</span>
//                       <span className="text-sm text-muted-foreground">{risk.count}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Progress value={risk.percentage} className="flex-1 h-2" />
//                       <span className="text-sm font-medium w-12">{risk.percentage}%</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* County Performance */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>County Performance Overview</CardTitle>
//             <CardDescription>Screening coverage and outcomes by county</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//                 {countyData.map((county) => (
//                   <div key={county.county} className="border rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <h3 className="font-medium">{county.county}</h3>
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span>Patients:</span>
//                         <span className="font-medium">{county.patients}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span>Screenings:</span>
//                         <span className="font-medium">{county.screenings}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span>High Risk:</span>
//                         <span className="font-medium text-red-600">{county.highRisk}</span>
//                       </div>
//                       <div className="mt-3">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Coverage:</span>
//                           <span className="font-medium">{county.coverage}%</span>
//                         </div>
//                         <Progress value={county.coverage} className="h-2" />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* AI Performance Metrics */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>AI Model Performance</CardTitle>
//               <CardDescription>Machine learning model accuracy and reliability metrics</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Overall Accuracy</span>
//                     <span className="font-medium">94.7%</span>
//                   </div>
//                   <Progress value={94.7} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Sensitivity (High Risk Detection)</span>
//                     <span className="font-medium">96.2%</span>
//                   </div>
//                   <Progress value={96.2} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Specificity (Low Risk Accuracy)</span>
//                     <span className="font-medium">93.8%</span>
//                   </div>
//                   <Progress value={93.8} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-2">
//                     <span>Positive Predictive Value</span>
//                     <span className="font-medium">89.4%</span>
//                   </div>
//                   <Progress value={89.4} className="h-2" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>System Usage Statistics</CardTitle>
//               <CardDescription>Platform utilization and user engagement metrics</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-3 border rounded-lg">
//                   <div>
//                     <p className="font-medium">Active CHVs</p>
//                     <p className="text-sm text-muted-foreground">Community Health Volunteers</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold">127</p>
//                     <p className="text-sm text-green-600">+8 this month</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 border rounded-lg">
//                   <div>
//                     <p className="font-medium">Active Clinicians</p>
//                     <p className="text-sm text-muted-foreground">Healthcare Professionals</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold">43</p>
//                     <p className="text-sm text-green-600">+3 this month</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 border rounded-lg">
//                   <div>
//                     <p className="font-medium">Offline Sessions</p>
//                     <p className="text-sm text-muted-foreground">Data collected offline</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold">1,234</p>
//                     <p className="text-sm text-blue-600">98.7% synced</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 border rounded-lg">
//                   <div>
//                     <p className="font-medium">Average Response Time</p>
//                     <p className="text-sm text-muted-foreground">AI prediction speed</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold">2.3s</p>
//                     <p className="text-sm text-green-600">-0.4s improved</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Activity,
  Download,
  RefreshCw,
  Users,
  Calendar,
} from "lucide-react"
import { apiClient, type ScreeningRecord, type Patient } from "@/lib/api"
import { formatDate, formatDateTime } from "@/lib/utils"

interface AnalyticsData {
  totalScreenings: number
  totalPatients: number
  highRiskCount: number
  moderateRiskCount: number
  lowRiskCount: number
  completedReferrals: number
  pendingReferrals: number
  monthlyTrends: Array<{
    month: string
    screenings: number
    highRisk: number
    referrals: number
  }>
  countyDistribution: Array<{
    county: string
    patients: number
    screenings: number
    highRisk: number
    coverage: number
  }>
  riskDistribution: Array<{
    level: string
    count: number
    percentage: number
    color: string
  }>
  aiPerformance: {
    accuracy: number
    sensitivity: number
    specificity: number
    ppv: number
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchAnalyticsData = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      setError("")

      // Fetch screening records and patients data
      const [screeningsResponse, patientsResponse] = await Promise.all([
        apiClient.getScreenings(),
        apiClient.getPatients(),
      ])

      const screenings = screeningsResponse.results || []
      const patients = patientsResponse.results || []

      // Process the data
      const processedData = processAnalyticsData(screenings, patients)
      setData(processedData)
      setLastUpdated(new Date())
    } catch (err: any) {
      console.error("Failed to fetch analytics data:", err)
      setError(err.message || "Failed to load analytics data")
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const processAnalyticsData = (screenings: ScreeningRecord[], patients: Patient[]): AnalyticsData => {
    // Calculate basic metrics
    const totalScreenings = screenings.length
    const totalPatients = patients.length

    // Risk level counts
    const highRiskCount = screenings.filter((s) => s.risk_level === "HIGH").length
    const moderateRiskCount = screenings.filter((s) => s.risk_level === "MODERATE").length
    const lowRiskCount = screenings.filter((s) => s.risk_level === "LOW").length

    // Referral counts (simulated - you'd need actual referral data)
    const completedReferrals = Math.floor(highRiskCount * 0.8)
    const pendingReferrals = highRiskCount - completedReferrals

    // Monthly trends (last 6 months)
    const monthlyTrends = calculateMonthlyTrends(screenings)

    // County distribution
    const countyDistribution = calculateCountyDistribution(patients, screenings)

    // Risk distribution
    const riskDistribution = [
      {
        level: "Low Risk",
        count: lowRiskCount,
        percentage: totalScreenings > 0 ? (lowRiskCount / totalScreenings) * 100 : 0,
        color: "bg-green-500",
      },
      {
        level: "Moderate Risk",
        count: moderateRiskCount,
        percentage: totalScreenings > 0 ? (moderateRiskCount / totalScreenings) * 100 : 0,
        color: "bg-yellow-500",
      },
      {
        level: "High Risk",
        count: highRiskCount,
        percentage: totalScreenings > 0 ? (highRiskCount / totalScreenings) * 100 : 0,
        color: "bg-red-500",
      },
    ]

    // AI Performance (simulated - you'd calculate from actual predictions vs outcomes)
    const aiPerformance = {
      accuracy: 94.7,
      sensitivity: 96.2,
      specificity: 93.8,
      ppv: 89.4,
    }

    return {
      totalScreenings,
      totalPatients,
      highRiskCount,
      moderateRiskCount,
      lowRiskCount,
      completedReferrals,
      pendingReferrals,
      monthlyTrends,
      countyDistribution,
      riskDistribution,
      aiPerformance,
    }
  }

  const calculateMonthlyTrends = (screenings: ScreeningRecord[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentDate = new Date()
    const trends = []

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const monthScreenings = screenings.filter((s) => {
        const screeningDate = new Date(s.screening_date)
        return screeningDate.getMonth() === date.getMonth() && screeningDate.getFullYear() === date.getFullYear()
      })

      const highRisk = monthScreenings.filter((s) => s.risk_level === "HIGH").length
      const referrals = Math.floor(highRisk * 0.8) // Simulated referral rate

      trends.push({
        month: months[date.getMonth()],
        screenings: monthScreenings.length,
        highRisk,
        referrals,
      })
    }

    return trends
  }

  const calculateCountyDistribution = (patients: Patient[], screenings: ScreeningRecord[]) => {
    const countyMap = new Map()

    // Group patients by county
    patients.forEach((patient) => {
      const county = patient.county || "Unknown"
      if (!countyMap.has(county)) {
        countyMap.set(county, {
          county,
          patients: 0,
          screenings: 0,
          highRisk: 0,
        })
      }
      countyMap.get(county).patients++
    })

    // Add screening data
    screenings.forEach((screening) => {
      const patient = patients.find((p) => p.id === screening.patient)
      const county = patient?.county || "Unknown"

      if (countyMap.has(county)) {
        countyMap.get(county).screenings++
        if (screening.risk_level === "HIGH") {
          countyMap.get(county).highRisk++
        }
      }
    })

    // Calculate coverage and return top 5 counties
    return Array.from(countyMap.values())
      .map((county) => ({
        ...county,
        coverage: county.patients > 0 ? Math.min((county.screenings / county.patients) * 100, 100) : 0,
      }))
      .sort((a, b) => b.patients - a.patients)
      .slice(0, 5)
  }

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      // Create PDF content
      const pdfContent = generatePDFContent()

      // In a real implementation, you would use a PDF library like jsPDF or call a backend API
      // For now, we'll simulate the export
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create and download the file
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mamascan-analytics-${formatDate(new Date())}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err: any) {
      setError("Failed to export PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const generatePDFContent = () => {
    if (!data) return ""

    return `
MAMASCAN ANALYTICS REPORT
Generated: ${formatDateTime(new Date())}
Last Updated: ${lastUpdated ? formatDateTime(lastUpdated) : "N/A"}

=== OVERVIEW ===
Total Screenings: ${data.totalScreenings}
Total Patients: ${data.totalPatients}
High Risk Cases: ${data.highRiskCount}
Moderate Risk Cases: ${data.moderateRiskCount}
Low Risk Cases: ${data.lowRiskCount}
Completed Referrals: ${data.completedReferrals}
Pending Referrals: ${data.pendingReferrals}

=== RISK DISTRIBUTION ===
${data.riskDistribution.map((risk) => `${risk.level}: ${risk.count} (${risk.percentage.toFixed(1)}%)`).join("\n")}

=== MONTHLY TRENDS ===
${data.monthlyTrends
  .map(
    (month) =>
      `${month.month}: ${month.screenings} screenings, ${month.highRisk} high risk, ${month.referrals} referrals`,
  )
  .join("\n")}

=== COUNTY DISTRIBUTION ===
${data.countyDistribution
  .map(
    (county) =>
      `${county.county}: ${county.patients} patients, ${county.screenings} screenings, ${county.highRisk} high risk (${county.coverage.toFixed(1)}% coverage)`,
  )
  .join("\n")}

=== AI PERFORMANCE ===
Overall Accuracy: ${data.aiPerformance.accuracy}%
Sensitivity: ${data.aiPerformance.sensitivity}%
Specificity: ${data.aiPerformance.specificity}%
Positive Predictive Value: ${data.aiPerformance.ppv}%
    `.trim()
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {error}
            <Button variant="outline" size="sm" className="ml-4 bg-transparent" onClick={() => fetchAnalyticsData()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) return null

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true }
    const change = ((current - previous) / previous) * 100
    return { value: Math.abs(change), isPositive: change >= 0 }
  }

  // Calculate trends (simplified - comparing current month to previous)
  const currentMonth = data.monthlyTrends[data.monthlyTrends.length - 1]
  const previousMonth = data.monthlyTrends[data.monthlyTrends.length - 2]

  const screeningsTrend = calculateTrend(currentMonth?.screenings || 0, previousMonth?.screenings || 0)
  const highRiskTrend = calculateTrend(currentMonth?.highRisk || 0, previousMonth?.highRisk || 0)

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">{lastUpdated && `Last updated: ${formatDateTime(lastUpdated)}`}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => fetchAnalyticsData(true)} disabled={isRefreshing}>
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button onClick={exportToPDF} disabled={isExporting}>
            {isExporting ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-pulse" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-yellow-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalScreenings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {screeningsTrend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              )}
              <span className={screeningsTrend.isPositive ? "text-green-600" : "text-red-600"}>
                {screeningsTrend.isPositive ? "+" : "-"}
                {screeningsTrend.value.toFixed(1)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.highRiskCount}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {highRiskTrend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              )}
              <span className={highRiskTrend.isPositive ? "text-red-600" : "text-green-600"}>
                {highRiskTrend.isPositive ? "+" : "-"}
                {highRiskTrend.value.toFixed(1)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.completedReferrals}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">{data.pendingReferrals}</span>
              <span className="ml-1">pending referrals</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPatients.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1 text-blue-600" />
              <span className="text-blue-600">
                {data.totalScreenings > 0 ? (data.totalScreenings / data.totalPatients).toFixed(1) : 0}
              </span>
              <span className="ml-1">avg screenings per patient</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Monthly Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Screening Trends</CardTitle>
            <CardDescription>Screening activities over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.monthlyTrends.map((month, index) => {
                const maxScreenings = Math.max(...data.monthlyTrends.map((m) => m.screenings))
                return (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Screenings: {month.screenings}</span>
                          <span className="text-sm text-red-600">High Risk: {month.highRisk}</span>
                        </div>
                        <Progress
                          value={maxScreenings > 0 ? (month.screenings / maxScreenings) * 100 : 0}
                          className="h-2"
                        />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{month.referrals} referrals</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Current patient risk categorization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.riskDistribution.map((risk, index) => (
                <div key={risk.level}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{risk.level}</span>
                    <span className="text-sm text-muted-foreground">{risk.count}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={risk.percentage} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-12">{risk.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* County Performance */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>County Performance Overview</CardTitle>
          <CardDescription>Screening coverage and outcomes by county</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {data.countyDistribution.map((county) => (
                <div key={county.county} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{county.county}</h3>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Patients:</span>
                      <span className="font-medium">{county.patients}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Screenings:</span>
                      <span className="font-medium">{county.screenings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>High Risk:</span>
                      <span className="font-medium text-red-600">{county.highRisk}</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Coverage:</span>
                        <span className="font-medium">{county.coverage.toFixed(1)}%</span>
                      </div>
                      <Progress value={county.coverage} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
            <CardDescription>Machine learning model accuracy and reliability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Accuracy</span>
                  <span className="font-medium">{data.aiPerformance.accuracy}%</span>
                </div>
                <Progress value={data.aiPerformance.accuracy} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Sensitivity (High Risk Detection)</span>
                  <span className="font-medium">{data.aiPerformance.sensitivity}%</span>
                </div>
                <Progress value={data.aiPerformance.sensitivity} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Specificity (Low Risk Accuracy)</span>
                  <span className="font-medium">{data.aiPerformance.specificity}%</span>
                </div>
                <Progress value={data.aiPerformance.specificity} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Positive Predictive Value</span>
                  <span className="font-medium">{data.aiPerformance.ppv}%</span>
                </div>
                <Progress value={data.aiPerformance.ppv} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Usage Statistics</CardTitle>
            <CardDescription>Platform utilization and user engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Active Users</p>
                  <p className="text-sm text-muted-foreground">Healthcare Professionals</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-green-600">+8 this month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Screening Rate</p>
                  <p className="text-sm text-muted-foreground">Screenings per patient</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {data.totalPatients > 0 ? (data.totalScreenings / data.totalPatients).toFixed(1) : "0"}
                  </p>
                  <p className="text-sm text-blue-600">Above target</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Risk Detection Rate</p>
                  <p className="text-sm text-muted-foreground">High risk cases found</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {data.totalScreenings > 0 ? ((data.highRiskCount / data.totalScreenings) * 100).toFixed(1) : "0"}%
                  </p>
                  <p className="text-sm text-orange-600">Within expected range</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Referral Completion</p>
                  <p className="text-sm text-muted-foreground">Completed vs pending</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {data.highRiskCount > 0 ? ((data.completedReferrals / data.highRiskCount) * 100).toFixed(1) : "0"}%
                  </p>
                  <p className="text-sm text-green-600">Good completion rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
