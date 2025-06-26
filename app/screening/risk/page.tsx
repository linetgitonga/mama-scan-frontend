"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Info, BarChart3, Activity, Shield, Heart } from "lucide-react"
import { Alert, AlertDescription } from "../../../components/ui/alert"

export default function RiskAssessmentPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  // Mock data for risk assessment analytics
  const riskDistribution = [
    { level: "Low Risk", count: 2644, percentage: 85.2, color: "bg-green-500", trend: "+2.1%" },
    { level: "Moderate Risk", count: 356, percentage: 11.5, color: "bg-yellow-500", trend: "-0.8%" },
    { level: "High Risk", count: 103, percentage: 3.3, color: "bg-red-500", trend: "+1.2%" },
  ]

  const riskFactors = [
    { factor: "Age > 35 years", prevalence: 68.4, impact: "High", color: "text-red-600" },
    { factor: "Multiple sexual partners", prevalence: 34.2, impact: "High", color: "text-red-600" },
    { factor: "HIV Positive", prevalence: 12.8, impact: "Very High", color: "text-red-700" },
    { factor: "Previous abnormal Pap", prevalence: 8.9, impact: "High", color: "text-red-600" },
    { factor: "Family history", prevalence: 15.6, impact: "Moderate", color: "text-yellow-600" },
    { factor: "Smoking", prevalence: 22.1, impact: "Moderate", color: "text-yellow-600" },
    { factor: "No HPV vaccination", prevalence: 78.3, impact: "Moderate", color: "text-yellow-600" },
  ]

  const aiMetrics = [
    { metric: "Overall Accuracy", value: 94.7, target: 95.0, status: "good" },
    { metric: "Sensitivity (High Risk)", value: 96.2, target: 95.0, status: "excellent" },
    { metric: "Specificity (Low Risk)", value: 93.8, target: 90.0, status: "excellent" },
    { metric: "Positive Predictive Value", value: 89.4, target: 85.0, status: "excellent" },
    { metric: "Negative Predictive Value", value: 97.8, target: 95.0, status: "excellent" },
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
                <div className="text-2xl font-bold">94.7%</div>
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
                <div className="text-2xl font-bold">3,847</div>
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
                <div className="text-2xl font-bold text-red-600">103</div>
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
                <div className="text-2xl font-bold">2.3s</div>
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
              {riskDistribution.map((risk, index) => (
                <div key={risk.level}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{risk.level}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{risk.count}</span>
                      <Badge
                        className={
                          risk.trend.startsWith("+")
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }
                      >
                        {risk.trend}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={risk.percentage} className="flex-1 h-3" />
                    <span className="text-sm font-medium w-12">{risk.percentage}%</span>
                  </div>
                </div>
              ))}
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
