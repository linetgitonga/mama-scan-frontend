"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Plus,
  Eye,
  Edit,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  MoreHorizontal,
  Loader2,
} from "lucide-react"
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
    const fetchPatients = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const patientsData = await apiClient.getPatients()
          setPatients(patientsData.results || [])
        // Fetch screening records for all patients
        const allScreenings = await Promise.all(patients.map((patient) => apiClient.getScreeningRecords(patient.id)))

        // Flatten the array of arrays into a single array
        const flattenedScreenings = allScreenings.reduce((acc, val) => acc.concat(val), [])
        setScreenings(flattenedScreenings)
      } catch (err: any) {
        setError(err.message || "Failed to fetch patients.")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchPatients()
    } else {
      router.push("/login")
    }
  }, [user, router, patients])

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

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.user.email.includes(searchTerm) ||
      patient.user.phone.includes(searchTerm)

    if (selectedFilter === "all") return matchesSearch
    return matchesSearch && patient.riskLevel.toLowerCase() === selectedFilter
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="min-h-screen mybackground">
      {/* Header */}
      <header className="mybackground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                Patient Management
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Link href="/patients/new">
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mybackground mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {patients.filter((patient) => patient.riskLevel === "High").length}
              </div>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {patients.filter((patient) => patient.riskLevel === "Moderate").length}
              </div>
              <p className="text-sm text-muted-foreground">Moderate Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {patients.filter((patient) => patient.riskLevel === "Low").length}
              </div>
              <p className="text-sm text-muted-foreground">Low Risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 mybackground">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or phone..."
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
            <CardDescription>Manage patient records and screening history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Last Screening</TableHead>
                    <TableHead>Registered By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {patient.nationalId} • Age: {patient.age}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {patient.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {patient.county}, {patient.subCounty}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskBadgeColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {screenings
                            .filter((screening) => screening.patientId === patient.id)
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date || "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.registeredBy}</div>
                        <div className="text-xs text-muted-foreground">{patient.registrationDate}</div>
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
                              <Calendar className="h-4 w-4 mr-2" />
                              New Screening
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
