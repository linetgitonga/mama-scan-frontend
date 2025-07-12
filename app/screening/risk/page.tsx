"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Info, BarChart3, Activity, Shield, Heart } from "lucide-react"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { useAuth } from "../../../hooks/useAuth"
// import { apiClient } from "../../../lib/api"
import { apiClient, type Patient, type ScreeningRecord } from "../../../lib/api"


export default function RiskAssessmentPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [riskDistribution, setRiskDistribution] = useState([])
  // const [riskFactors, setRiskFactors] = useState([])
  // const [aiMetrics, setAiMetrics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([])

 useEffect(() => {
    const fetchAverageRiskScore = async () => {
    setLoading(true)
    try {
      const [patientsResponse, screeningsResponse] = await Promise.all([
        apiClient.getPatients(),
        apiClient.getScreenings(),
      ])
      setPatients(patientsResponse.results || [])
      setScreenings(screeningsResponse.results || [])
    } catch (error: any) {
      setError(error.message || "Failed to fetch dashboard data")
      console.error("Dashboard data fetch error:", error)
    }
  }

    // const fetchAnalytics = async () => {
    //   setLoading(true)
    //   setError("")
    //   try {
    //     // Adjust these API calls and response shapes as per your backend
    //     const analytics = await apiClient.getAnalytics()
    //     setRiskDistribution(analytics.risk_distribution || [])
    //     setRiskFactors(analytics.risk_factors || [])
    //     setAiMetrics(analytics.ai_metrics || [])
    //   } catch (err: any) {
    //     setError("Failed to load analytics data")
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // fetchAnalytics()
    fetchAverageRiskScore()
  }, [])


   // Calculate stats from real data
  const totalPatients = patients.length
  const totalScreenings = screenings.length
  const averageRiskScore = totalScreenings > 0 ? (screenings.reduce((sum, s) => sum + (s.ai_risk_score || 0), 0) / totalScreenings).toFixed(2) : "0.00"
  const highRiskPatients = screenings.filter((s) => s.risk_level === "HIGH").length
  const moderateRiskPatients = screenings.filter((s) => s.risk_level === "MODERATE").length
  const lowRiskPatients = screenings.filter((s) => s.risk_level === "LOW").length
  const unknownRiskPatients = screenings.filter((s) => !s.risk_level).length
  const todayScreenings = screenings.filter(
    (s) => new Date(s.screening_date).toDateString() === new Date().toDateString(),
  ).length
  const highRiskCases = screenings.filter((s) => s.risk_level === "HIGH").length
  const pendingReferrals = screenings.filter((s) => s.referral_needed && (!s.risk_level || s.risk_level === "HIGH")).length

  const averageResponseTime = totalScreenings > 0 ? (screenings.reduce((sum, s) => sum + (s.response_time || 0), 0) / totalScreenings).toFixed(2) : "0.00"  
  const highRiskPercentage = totalPatients > 0 ? ((highRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const moderateRiskPercentage = totalPatients > 0 ? ((moderateRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const lowRiskPercentage = totalPatients > 0 ? ((lowRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const unknownRiskPercentage = totalPatients > 0 ? ((unknownRiskPatients / totalPatients ) * 100).toFixed(1) : "0.0"
  const totalRiskPatients = highRiskPatients + moderateRiskPatients + lowRiskPatients + unknownRiskPatients
  const averageRiskScoreNumber = parseFloat(averageRiskScore)
  const averageRiskScoreFormatted = isNaN(averageRiskScoreNumber) ? "0.00" : averageRiskScoreNumber.toFixed(2)
  const averageRiskScoreSeconds = (averageRiskScoreNumber * 1000).toFixed(0) // Convert to milliseconds for display
  const averageRiskScoreMs = parseFloat(averageRiskScoreSeconds) / 1000 // Convert back to seconds for display

  const highRiskPatientsPercentage = totalPatients > 0 ? ((highRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const moderateRiskPatientsPercentage = totalPatients > 0 ? ((moderateRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const lowRiskPatientsPercentage = totalPatients > 0 ? ((lowRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"
  const unknownRiskPatientsPercentage = totalPatients > 0 ? ((unknownRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"  
  const totalRiskPatientsPercentage = totalPatients > 0 ? ((totalRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"  
  const averageResponseTimeSeconds = parseFloat(averageResponseTime) * 1000 // Convert to milliseconds for display  
  const averageResponseTimeFormatted = isNaN(averageResponseTimeSeconds) ? "0.00" : (averageResponseTimeSeconds / 1000).toFixed(2) // Convert back to seconds for display 
  const aiMetrics = [
    { metric: "Sensitivity", value: 95, target: 90, status: "excellent" },
    { metric: "Specificity", value: 92, target: 90, status: "good" },
    { metric: "Precision", value: 88, target: 85, status: "good" },
    { metric: "Recall", value: 90, target: 85, status: "good" },
    { metric: "F1 Score", value: 89, target: 85, status: "good" },
    { metric: "AUC-ROC", value: 0.95, target: 0.90, status: "excellent" },
    { metric: "Response Time", value: averageResponseTimeSeconds, target: 2.0, status: averageResponseTimeSeconds < 2 ? "excellent" : "warning" },
  ]
  const riskFactors = [
    { factor: "HPV Infection", prevalence: 70, impact: "High", color: "text-red-600" },
    { factor: "Smoking", prevalence: 30, impact: "Moderate", color: "text-yellow-600" },
    { factor: "Immunosuppression", prevalence: 20, impact: "High", color: "text-red-600" },
    { factor: "Long-term Birth Control", prevalence: 25, impact: "Moderate", color: "text-yellow-600" },
    { factor: "Multiple Pregnancies", prevalence: 15, impact: "Low", color: "text-green-600" },
    { factor: "Family History", prevalence: 10, impact: "Moderate", color: "text-yellow-600" },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "poor":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }
  if (loading) {
    return <div className="p-8 text-center">Loading analytics...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Risk Assessment Analytics</h1>
          <p className="text-muted-foreground">AI-powered cervical cancer risk analysis and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Brain className="h-4 w-4 mr-2" />
            Model Settings
          </Button>
        </div>
      </div>

      {/* AI Model Status */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
        <Brain className="h-4 w-4" />
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          <strong>AI Model Status:</strong> Active and performing optimally. Last updated: January 15, 2024
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">90%</div>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+1.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{totalScreenings}</div>
                <p className="text-sm text-muted-foreground">Total Assessments</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{highRiskPatients}</div>
                <p className="text-sm text-muted-foreground">High Risk Detected</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
              <span className="text-red-600">+8.4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{averageRiskScore}s</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-xs">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              <span className="text-green-600">-0.4s improved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
            <CardDescription>Current patient risk categorization across all assessments</CardDescription>
          </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* Real data risk distribution */}
              <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">High</span>
                <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{highRiskPatients}</span>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {((highRiskPatients / totalPatients) * 100).toFixed(1)}%
                </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={totalPatients ? (highRiskPatients / totalPatients) * 100 : 0} className="flex-1 h-3" />
                <span className="text-sm font-medium w-12">
                {totalPatients ? ((highRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"}%
                </span>
              </div>
              </div>
              <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Moderate</span>
                <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{moderateRiskPatients}</span>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  {((moderateRiskPatients / totalPatients) * 100).toFixed(1)}%
                </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={totalPatients ? (moderateRiskPatients / totalPatients) * 100 : 0} className="flex-1 h-3" />
                <span className="text-sm font-medium w-12">
                {totalPatients ? ((moderateRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"}%
                </span>
              </div>
              </div>
              <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Low</span>
                <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{lowRiskPatients}</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {((lowRiskPatients / totalPatients) * 100).toFixed(1)}%
                </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={totalPatients ? (lowRiskPatients / totalPatients) * 100 : 0} className="flex-1 h-3" />
                <span className="text-sm font-medium w-12">
                {totalPatients ? ((lowRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"}%
                </span>
              </div>
              </div>
              <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Unknown</span>
                <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{unknownRiskPatients}</span>
                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                  {((unknownRiskPatients / totalPatients) * 100).toFixed(1)}%
                </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={totalPatients ? (unknownRiskPatients / totalPatients) * 100 : 0} className="flex-1 h-3" />
                <span className="text-sm font-medium w-12">
                {totalPatients ? ((unknownRiskPatients / totalPatients) * 100).toFixed(1) : "0.0"}%
                </span>
              </div>
              </div>
            </div>
            </CardContent>
        </Card>

        {/* AI Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
            <CardDescription>Machine learning model accuracy and reliability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiMetrics.map((metric, index) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(metric.status)}
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>{metric.value}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={metric.value} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">Target: {metric.target}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors Analysis</CardTitle>
          <CardDescription>Prevalence and impact of various cervical cancer risk factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskFactors.map((factor, index) => (
              <div key={factor.factor} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-sm">{factor.factor}</h3>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Prevalence:</span>
                    <span className="font-medium">{factor.prevalence}%</span>
                  </div>
                  <Progress value={factor.prevalence} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Impact:</span>
                    <span className={`font-medium ${factor.color}`}>{factor.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Recommendations</CardTitle>
          <CardDescription>Suggested improvements and optimizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Model Performance</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The AI model is performing within expected parameters. Consider retraining with new data in 3 months.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Data Quality</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Increase data collection for patients aged 25-30 to improve model accuracy for younger demographics.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100">High Risk Detection</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Excellent sensitivity for high-risk cases. Continue current screening protocols.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

}



// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   Brain,
//   TrendingUp,
//   AlertTriangle,
//   Activity,
//   Target,
//   BarChart3,
//   PieChart,
//   Settings,
//   Download,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Zap,
//   AlertCircle,
// } from "lucide-react"
// import { useAuth } from "@/hooks/useAuth"
// import { useRouter } from "next/navigation"

// interface ModelStats {
//   accuracy: number
//   sensitivity: number
//   specificity: number
//   precision: number
//   f1Score: number
//   totalPredictions: number
//   correctPredictions: number
//   modelVersion: string
//   lastUpdated: string
// }

// interface RiskDistribution {
//   high: number
//   moderate: number
//   low: number
// }

// interface RiskFactor {
//   factor: string
//   prevalence: number
//   impact: number
//   description: string
// }

// interface PerformanceTrend {
//   date: string
//   accuracy: number
//   sensitivity: number
//   specificity: number
// }

// export default function RiskAssessmentPage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [modelStats, setModelStats] = useState<ModelStats | null>(null)
//   const [riskDistribution, setRiskDistribution] = useState<RiskDistribution | null>(null)
//   const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([])
//   const [performanceTrends, setPerformanceTrends] = useState<PerformanceTrend[]>([])
//   const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

//   const { user, isLoading: authLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/landing")
//       return
//     }

//     if (user) {
//       fetchRiskAnalytics()
//     }
//   }, [user, authLoading, router])

//   const fetchRiskAnalytics = async () => {
//     try {
//       setIsLoading(true)
//       setError("")

//       // Fetch model performance statistics
//       const modelStatsResponse = await fetch("/api/analytics/model-stats", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })

//       if (!modelStatsResponse.ok) {
//         throw new Error("Failed to fetch model statistics")
//       }

//       const modelStatsData = await modelStatsResponse.json()
//       setModelStats(modelStatsData)

//       // Fetch risk distribution data
//       const riskDistributionResponse = await fetch("/api/analytics/risk-distribution", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })

//       if (!riskDistributionResponse.ok) {
//         throw new Error("Failed to fetch risk distribution")
//       }

//       const riskDistributionData = await riskDistributionResponse.json()
//       setRiskDistribution(riskDistributionData)

//       // Fetch risk factors analysis
//       const riskFactorsResponse = await fetch("/api/analytics/risk-factors", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })

//       if (!riskFactorsResponse.ok) {
//         throw new Error("Failed to fetch risk factors")
//       }

//       const riskFactorsData = await riskFactorsResponse.json()
//       setRiskFactors(riskFactorsData)

//       // Fetch performance trends
//       const trendsResponse = await fetch("/api/analytics/performance-trends", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })

//       if (!trendsResponse.ok) {
//         throw new Error("Failed to fetch performance trends")
//       }

//       const trendsData = await trendsResponse.json()
//       setPerformanceTrends(trendsData)

//       setLastRefresh(new Date())
//     } catch (error: any) {
//       console.error("Failed to fetch risk analytics:", error)
//       setError(error.message || "Failed to load analytics data")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const exportReport = async () => {
//     try {
//       const response = await fetch("/api/analytics/export-report", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           includeModelStats: true,
//           includeRiskDistribution: true,
//           includeRiskFactors: true,
//           includeTrends: true,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to export report")
//       }

//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement("a")
//       a.style.display = "none"
//       a.href = url
//       a.download = `risk-assessment-report-${new Date().toISOString().split("T")[0]}.pdf`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     } catch (error: any) {
//       setError("Failed to export report: " + error.message)
//     }
//   }

//   if (authLoading || isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Activity className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
//           <p>Loading risk assessment analytics...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold">Risk Assessment Analytics</h2>
//             <p className="text-muted-foreground">AI model performance and risk analysis insights</p>
//           </div>
//         </div>

//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>

//         <Button onClick={fetchRiskAnalytics} variant="outline">
//           <RefreshCw className="h-4 w-4 mr-2" />
//           Try Again
//         </Button>
//       </div>
//     )
//   }

//   if (!modelStats || !riskDistribution) {
//     return (
//       <div className="space-y-6">
//         <Alert>
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>No analytics data available. Please try refreshing the page.</AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   const totalScreenings = riskDistribution.high + riskDistribution.moderate + riskDistribution.low

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Risk Assessment Analytics</h2>
//           <p className="text-muted-foreground">AI model performance and risk analysis insights</p>
//           <p className="text-xs text-muted-foreground mt-1">Last updated: {lastRefresh.toLocaleString()}</p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" onClick={fetchRiskAnalytics}>
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//           <Button
//             onClick={exportReport}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="performance" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="performance">Model Performance</TabsTrigger>
//           <TabsTrigger value="distribution">Risk Distribution</TabsTrigger>
//           <TabsTrigger value="factors">Risk Factors</TabsTrigger>
//           <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
//         </TabsList>

//         <TabsContent value="performance" className="space-y-6">
//           {/* Model Performance Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
//                 <Target className="h-4 w-4 text-green-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{modelStats.accuracy}%</div>
//                 <Progress value={modelStats.accuracy} className="mt-2" />
//                 <p className="text-xs text-muted-foreground mt-2">
//                   {modelStats.accuracy >= 95 ? "Excellent" : modelStats.accuracy >= 90 ? "Good" : "Needs improvement"}
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Sensitivity</CardTitle>
//                 <CheckCircle className="h-4 w-4 text-blue-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{modelStats.sensitivity}%</div>
//                 <Progress value={modelStats.sensitivity} className="mt-2" />
//                 <p className="text-xs text-muted-foreground mt-2">True positive rate</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Specificity</CardTitle>
//                 <XCircle className="h-4 w-4 text-purple-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{modelStats.specificity}%</div>
//                 <Progress value={modelStats.specificity} className="mt-2" />
//                 <p className="text-xs text-muted-foreground mt-2">True negative rate</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
//                 <Zap className="h-4 w-4 text-orange-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{modelStats.f1Score}%</div>
//                 <Progress value={modelStats.f1Score} className="mt-2" />
//                 <p className="text-xs text-muted-foreground mt-2">Harmonic mean</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Detailed Performance Metrics */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Brain className="h-5 w-5 text-primary" />
//                   Model Performance Details
//                 </CardTitle>
//                 <CardDescription>Comprehensive performance metrics</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Total Predictions</span>
//                     <span className="text-sm font-bold">{modelStats.totalPredictions.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Correct Predictions</span>
//                     <span className="text-sm font-bold text-green-600">
//                       {modelStats.correctPredictions.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Precision</span>
//                     <span className="text-sm font-bold">{modelStats.precision}%</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Model Version</span>
//                     <Badge variant="outline">{modelStats.modelVersion}</Badge>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">Last Updated</span>
//                     <span className="text-sm text-muted-foreground">{modelStats.lastUpdated}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <BarChart3 className="h-5 w-5 text-primary" />
//                   Performance Trends
//                 </CardTitle>
//                 <CardDescription>Model performance over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {performanceTrends.length > 0 ? (
//                   <div className="space-y-4">
//                     {performanceTrends.slice(-5).map((trend, index) => (
//                       <div key={index} className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span>{new Date(trend.date).toLocaleDateString()}</span>
//                           <span className="font-medium">{trend.accuracy}%</span>
//                         </div>
//                         <Progress value={trend.accuracy} className="h-2" />
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No trend data available</p>
//                     <p className="text-sm">Historical performance data will appear here</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="distribution" className="space-y-6">
//           {/* Risk Distribution Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
//                 <Activity className="h-4 w-4 text-blue-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{totalScreenings.toLocaleString()}</div>
//                 <p className="text-xs text-muted-foreground">All risk levels</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">High Risk</CardTitle>
//                 <AlertTriangle className="h-4 w-4 text-red-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{riskDistribution.high}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {Math.round((riskDistribution.high / totalScreenings) * 100)}% of total
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Moderate Risk</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-yellow-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{riskDistribution.moderate}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {Math.round((riskDistribution.moderate / totalScreenings) * 100)}% of total
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
//                 <CheckCircle className="h-4 w-4 text-green-600" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{riskDistribution.low}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {Math.round((riskDistribution.low / totalScreenings) * 100)}% of total
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Risk Distribution Visualization */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <PieChart className="h-5 w-5 text-primary" />
//                   Risk Level Distribution
//                 </CardTitle>
//                 <CardDescription>Breakdown of risk assessments</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                         High Risk
//                       </span>
//                       <span>
//                         {riskDistribution.high} ({Math.round((riskDistribution.high / totalScreenings) * 100)}%)
//                       </span>
//                     </div>
//                     <Progress value={(riskDistribution.high / totalScreenings) * 100} className="h-2" />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                         Moderate Risk
//                       </span>
//                       <span>
//                         {riskDistribution.moderate} ({Math.round((riskDistribution.moderate / totalScreenings) * 100)}%)
//                       </span>
//                     </div>
//                     <Progress value={(riskDistribution.moderate / totalScreenings) * 100} className="h-2" />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="flex items-center gap-2">
//                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                         Low Risk
//                       </span>
//                       <span>
//                         {riskDistribution.low} ({Math.round((riskDistribution.low / totalScreenings) * 100)}%)
//                       </span>
//                     </div>
//                     <Progress value={(riskDistribution.low / totalScreenings) * 100} className="h-2" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Risk Trends</CardTitle>
//                 <CardDescription>Risk distribution over time</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-8 text-muted-foreground">
//                   <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                   <p>Risk trend visualization</p>
//                   <p className="text-sm">Monthly risk distribution patterns</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="factors" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Risk Factor Analysis</CardTitle>
//               <CardDescription>Prevalence and impact of various risk factors</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {riskFactors.length > 0 ? (
//                   riskFactors.map((factor, index) => (
//                     <div key={index} className="space-y-3">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-medium">{factor.factor}</h4>
//                           <p className="text-sm text-muted-foreground">{factor.description}</p>
//                         </div>
//                         <div className="flex items-center gap-4 text-sm">
//                           <span>Prevalence: {factor.prevalence}%</span>
//                           <span>Impact: {(factor.impact * 100).toFixed(1)}%</span>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-1">
//                           <div className="flex justify-between text-xs">
//                             <span>Prevalence</span>
//                             <span>{factor.prevalence}%</span>
//                           </div>
//                           <Progress value={factor.prevalence} className="h-2" />
//                         </div>
//                         <div className="space-y-1">
//                           <div className="flex justify-between text-xs">
//                             <span>Impact Score</span>
//                             <span>{(factor.impact * 100).toFixed(1)}%</span>
//                           </div>
//                           <Progress value={factor.impact * 100} className="h-2" />
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-muted-foreground">
//                     <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                     <p>No risk factor data available</p>
//                     <p className="text-sm">Risk factor analysis will appear here</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="recommendations" className="space-y-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Brain className="h-5 w-5 text-primary" />
//                   AI Recommendations
//                 </CardTitle>
//                 <CardDescription>Model improvement suggestions</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
//                     <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-blue-900 dark:text-blue-100">Increase Training Data</h4>
//                       <p className="text-sm text-blue-700 dark:text-blue-300">
//                         Adding more diverse training samples could improve accuracy by 2-3%
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
//                     <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-green-900 dark:text-green-100">Feature Engineering</h4>
//                       <p className="text-sm text-green-700 dark:text-green-300">
//                         Consider adding BMI interaction terms for better risk prediction
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
//                     <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Model Calibration</h4>
//                       <p className="text-sm text-yellow-700 dark:text-yellow-300">
//                         Recalibrate probability thresholds for better precision-recall balance
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Settings className="h-5 w-5 text-primary" />
//                   System Optimization
//                 </CardTitle>
//                 <CardDescription>Performance enhancement suggestions</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
//                     <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-purple-900 dark:text-purple-100">Inference Speed</h4>
//                       <p className="text-sm text-purple-700 dark:text-purple-300">
//                         Model quantization could reduce inference time by 40%
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
//                     <Target className="h-5 w-5 text-orange-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-orange-900 dark:text-orange-100">Batch Processing</h4>
//                       <p className="text-sm text-orange-700 dark:text-orange-300">
//                         Implement batch inference for multiple screenings simultaneously
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 p-3 bg-teal-50 dark:bg-teal-950 rounded-lg">
//                     <RefreshCw className="h-5 w-5 text-teal-600 mt-0.5" />
//                     <div>
//                       <h4 className="font-medium text-teal-900 dark:text-teal-100">Auto-Retraining</h4>
//                       <p className="text-sm text-teal-700 dark:text-teal-300">
//                         Set up automated retraining pipeline with new data
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
