"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Search, Calendar, User, Brain, Eye, Download, Activity, AlertTriangle, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { useAuth } from "../../../hooks/useAuth"
import { apiClient, type ScreeningRecord } from "../../../lib/api"

export default function ScreeningHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchScreenings()
    }
  }, [user])

  const fetchScreenings = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getScreenings()
      setScreenings(response.results || [])
    } catch (error: any) {
      setError(error.message || "Failed to fetch screening history")
    } finally {
      setIsLoading(false)
    }
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

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <CheckCircle className="h-4 w-4 text-green-600" />
    if (confidence >= 0.7) return <Activity className="h-4 w-4 text-blue-600" />
    return <AlertTriangle className="h-4 w-4 text-yellow-600" />
  }

  const filteredScreenings = screenings.filter((screening) => {
    const matchesSearch =
      searchTerm === "" ||
      screening.id.toString().includes(searchTerm) ||
      screening.patient.toString().includes(searchTerm)

    const matchesRisk =
      riskFilter === "all" || (screening.risk_level && screening.risk_level.toLowerCase() === riskFilter)

    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const screeningDate = new Date(screening.screening_date)
        const now = new Date()

        switch (dateFilter) {
          case "today":
            return screeningDate.toDateString() === now.toDateString()
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return screeningDate >= weekAgo
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            return screeningDate >= monthAgo
          default:
            return true
        }
      })()

    return matchesSearch && matchesRisk && matchesDate
  })

  const stats = {
    total: screenings.length,
    highRisk: screenings.filter((s) => s.risk_level === "HIGH").length,
    moderate: screenings.filter((s) => s.risk_level === "MODERATE").length,
    low: screenings.filter((s) => s.risk_level === "LOW").length,
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading screening history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Screening History</h1>
          <p className="text-muted-foreground">View and manage all screening records</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Screenings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
            <p className="text-sm text-muted-foreground">High Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.moderate}</div>
            <p className="text-sm text-muted-foreground">Moderate Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.low}</div>
            <p className="text-sm text-muted-foreground">Low Risk</p>
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
                placeholder="Search by screening ID or patient ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="moderate">Moderate Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Screening Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Screening Records ({filteredScreenings.length})</CardTitle>
          <CardDescription>Complete history of all screening assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Screening ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Referral</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScreenings.map((screening) => (
                  <TableRow key={screening.id}>
                    <TableCell className="font-medium">#{screening.id.toString().padStart(4, "0")}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(screening.screening_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        Patient #{screening.patient}
                      </div>
                    </TableCell>
                    <TableCell>{screening.age}</TableCell>
                    <TableCell>
                      <Badge className={getRiskBadgeColor(screening.risk_level || "Unknown")}>
                        {screening.risk_level || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-blue-600" />
                        {screening.ai_risk_score ? `${(screening.ai_risk_score * 100).toFixed(1)}%` : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {screening.ai_confidence && getConfidenceIcon(screening.ai_confidence)}
                        <span className="ml-2">
                          {screening.ai_confidence ? `${(screening.ai_confidence * 100).toFixed(1)}%` : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {screening.referral_needed ? (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          Required
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                          Not Required
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredScreenings.length === 0 && (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No screening records found</h3>
              <p className="text-muted-foreground">
                {searchTerm || riskFilter !== "all" || dateFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No screening records have been created yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
