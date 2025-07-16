"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Eye, Edit, MapPin, Calendar, Phone, Mail, MoreHorizontal, Loader2, Plus, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/useAuth"
import { apiClient, type Patient, type ScreeningRecord } from "@/lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [patients, setPatients] = useState<Patient[]>([])
  const [screenings, setScreenings] = useState<ScreeningRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        router.push("/login")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Fetch patients - API now returns array directly
        const patientsData = await apiClient.getPatients()
        setPatients(patientsData)

        // Fetch all screening records
        const screeningsResponse = await apiClient.getScreenings()
        setScreenings(screeningsResponse.results || [])
      } catch (err: any) {
        setError(err.message || "Failed to fetch data.")
        console.error("Fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, router])

  const getPatientRiskLevel = (patientId: number): string => {
    const patientScreenings = screenings.filter((s) => s.patient === patientId)
    if (patientScreenings.length === 0) return "Unknown"

    // Get the most recent screening
    const latestScreening = patientScreenings.sort(
      (a, b) => new Date(b.screening_date).getTime() - new Date(a.screening_date).getTime(),
    )[0]

    return latestScreening.risk_level || "Unknown"
  }

  const getLastScreeningDate = (patientId: number): string => {
    const patientScreenings = screenings.filter((s) => s.patient === patientId)
    if (patientScreenings.length === 0) return "Never"

    const latestScreening = patientScreenings.sort(
      (a, b) => new Date(b.screening_date).getTime() - new Date(a.screening_date).getTime(),
    )[0]

    return new Date(latestScreening.screening_date).toLocaleDateString()
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

  const getMaritalStatusDisplay = (status: string) => {
    switch (status) {
      case "SINGLE":
        return "Single"
      case "MARRIED":
        return "Married"
      case "DIVORCED":
        return "Divorced"
      case "WIDOWED":
        return "Widowed"
      default:
        return "Unknown"
    }
  }
  // Filter patients based on search term and selected risk level
  const filteredPatients = patients.filter((patient) => {
    const riskLevel = getPatientRiskLevel(patient.id)
    const matchesSearch =
      `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.national_id.includes(searchTerm) ||
      patient.phone_number.includes(searchTerm) ||
      (patient.email && patient.email.includes(searchTerm))
    if (selectedFilter === "all") return matchesSearch
    return matchesSearch && riskLevel.toLowerCase() === selectedFilter
  }
  )


  // const filteredPatients = patients.filter((patient) => {
  //   const riskLevel = getPatientRiskLevel(patient.id)
  //   const matchesSearch =
  //     `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     patient.national_id.includes(searchTerm) ||
  //     patient.phone_number.includes(searchTerm) ||
  //     (patient.email && patient.email.includes(searchTerm))

  //   if (selectedFilter === "all") return matchesSearch
  //   return matchesSearch && riskLevel.toLowerCase() === selectedFilter
  // })

  // Calculate statistics
  const totalPatients = patients.length
  const highRiskCount = patients.filter((p) => getPatientRiskLevel(p.id) === "High").length
  const moderateRiskCount = patients.filter((p) => getPatientRiskLevel(p.id) === "Moderate").length
  const lowRiskCount = patients.filter((p) => getPatientRiskLevel(p.id) === "Low").length

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading patients...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Patient Management
          </h1>
          <p className="text-muted-foreground">Manage patient records and screening history</p>
        </div>
        <Link href="/patients/new">
          <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-sm text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
            <p className="text-sm text-muted-foreground">High Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{moderateRiskCount}</div>
            <p className="text-sm text-muted-foreground">Moderate Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{lowRiskCount}</div>
            <p className="text-sm text-muted-foreground">Low Risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "high" ? "default" : "outline"}
                onClick={() => setSelectedFilter("high")}
                size="sm"
              >
                High Risk
              </Button>
              <Button
                variant={selectedFilter === "moderate" ? "default" : "outline"}
                onClick={() => setSelectedFilter("moderate")}
                size="sm"
              >
                Moderate Risk
              </Button>
              <Button
                variant={selectedFilter === "low" ? "default" : "outline"}
                onClick={() => setSelectedFilter("low")}
                size="sm"
              >
                Low Risk
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
          <CardDescription>Complete patient records with screening history</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No patients found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search criteria" : "Get started by adding your first patient"}
              </p>
              <Link href="/patients/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Personal Info</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Screening</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {patient.first_name} {patient.last_name}
                          </div>
                          <div className="text-sm text-muted-foreground">ID: {patient.national_id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {patient.phone_number}
                          </div>
                          {patient.email && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="h-3 w-3 mr-1" />
                              {patient.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {patient.county}
                          </div>
                          <div className="text-sm text-muted-foreground">{patient.sub_county}</div>
                          {patient.location && <div className="text-xs text-muted-foreground">{patient.location}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">Age: {patient.age}</div>
                          <div className="text-sm text-muted-foreground">
                            {getMaritalStatusDisplay(patient.marital_status)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskBadgeColor(getPatientRiskLevel(patient.id))}>
                          {getPatientRiskLevel(patient.id)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {getLastScreeningDate(patient.id)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(patient.created_at).toLocaleDateString()}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/screening/new?patient=${patient.id}`} className="flex items-center w-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                New Screening
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
