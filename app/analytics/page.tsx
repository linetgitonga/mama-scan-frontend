"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin,
  Download,
  BarChart3,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const monthlyStats = [
    { month: "Jan", screenings: 156, highRisk: 12, referrals: 8 },
    { month: "Feb", screenings: 189, highRisk: 15, referrals: 12 },
    { month: "Mar", screenings: 234, highRisk: 18, referrals: 15 },
    { month: "Apr", screenings: 198, highRisk: 14, referrals: 11 },
    { month: "May", screenings: 267, highRisk: 21, referrals: 18 },
    { month: "Jun", screenings: 289, highRisk: 23, referrals: 20 },
  ]

  const countyData = [
    { county: "Nairobi", patients: 847, screenings: 1234, highRisk: 89, coverage: 78 },
    { county: "Kiambu", patients: 623, screenings: 891, highRisk: 67, coverage: 72 },
    { county: "Kisumu", patients: 456, screenings: 678, highRisk: 45, coverage: 68 },
    { county: "Nakuru", patients: 389, screenings: 567, highRisk: 34, coverage: 65 },
    { county: "Mombasa", patients: 532, screenings: 723, highRisk: 56, coverage: 71 },
  ]

  const riskDistribution = [
    { level: "Low Risk", count: 2644, percentage: 85.2, color: "bg-green-500" },
    { level: "Moderate Risk", count: 356, percentage: 11.5, color: "bg-yellow-500" },
    { level: "High Risk", count: 103, percentage: 3.3, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen mybackground">
      {/* Header */}
      <header className="mybackground ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Screenings</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,847</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+12.5%</span>
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
              <div className="text-2xl font-bold">103</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-red-600" />
                <span className="text-red-600">+8.4%</span>
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
              <div className="text-2xl font-bold">84</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">-2.1%</span>
                <span className="ml-1">pending referrals</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.7%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-blue-600" />
                <span className="text-blue-600">+1.2%</span>
                <span className="ml-1">model improvement</span>
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
                {monthlyStats.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{month.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Screenings: {month.screenings}</span>
                          <span className="text-sm text-red-600">High Risk: {month.highRisk}</span>
                        </div>
                        <Progress value={(month.screenings / 300) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{month.referrals} referrals</div>
                  </div>
                ))}
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
                {riskDistribution.map((risk, index) => (
                  <div key={risk.level}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{risk.level}</span>
                      <span className="text-sm text-muted-foreground">{risk.count}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={risk.percentage} className="flex-1 h-2" />
                      <span className="text-sm font-medium w-12">{risk.percentage}%</span>
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
                {countyData.map((county) => (
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
                          <span className="font-medium">{county.coverage}%</span>
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
                    <span className="font-medium">94.7%</span>
                  </div>
                  <Progress value={94.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sensitivity (High Risk Detection)</span>
                    <span className="font-medium">96.2%</span>
                  </div>
                  <Progress value={96.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Specificity (Low Risk Accuracy)</span>
                    <span className="font-medium">93.8%</span>
                  </div>
                  <Progress value={93.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Positive Predictive Value</span>
                    <span className="font-medium">89.4%</span>
                  </div>
                  <Progress value={89.4} className="h-2" />
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
                    <p className="font-medium">Active CHVs</p>
                    <p className="text-sm text-muted-foreground">Community Health Volunteers</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-sm text-green-600">+8 this month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Active Clinicians</p>
                    <p className="text-sm text-muted-foreground">Healthcare Professionals</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">43</p>
                    <p className="text-sm text-green-600">+3 this month</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Offline Sessions</p>
                    <p className="text-sm text-muted-foreground">Data collected offline</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">1,234</p>
                    <p className="text-sm text-blue-600">98.7% synced</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Average Response Time</p>
                    <p className="text-sm text-muted-foreground">AI prediction speed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">2.3s</p>
                    <p className="text-sm text-green-600">-0.4s improved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
