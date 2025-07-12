"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Save, AlertTriangle, User as UserIcon, Hospital, FileText, Clock, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { apiClient, type Patient, type ScreeningRecord, type User } from "@/lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface ReferralFormData {
  patientId: string
  facility: string
  specialist: string
  urgency: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  reason: string
  clinicalNotes: string
  expectedFollowUpDate: string
  contactMethod: "PHONE" | "SMS" | "EMAIL" | "IN_PERSON"
}

interface HighRiskPatient extends Patient {
  latestScreening?: ScreeningRecord
  riskLevel?: string
  riskScore?: number
}

export default function NewReferral() {
  const [formData, setFormData] = useState<ReferralFormData>({
    patientId: "",
    facility: "",
    specialist: "",
    urgency: "MEDIUM",
    reason: "",
    clinicalNotes: "",
    expectedFollowUpDate: "",
    contactMethod: "PHONE",
  })

  const [highRiskPatients, setHighRiskPatients] = useState<HighRiskPatient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<HighRiskPatient | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [specialists, setSpecialists] = useState<User[]>([])

  const { user } = useAuth()
  const router = useRouter()

  // Kenyan healthcare facilities
  const healthcareFacilities = [
    { name: "Kenyatta National Hospital", location: "Nairobi", level: "National Referral" },
    { name: "Moi Teaching and Referral Hospital", location: "Eldoret", level: "National Referral" },
    { name: "Coast Provincial General Hospital", location: "Mombasa", level: "Provincial" },
    { name: "Nakuru Provincial General Hospital", location: "Nakuru", level: "Provincial" },
    { name: "Kisumu County Hospital", location: "Kisumu", level: "County" },
    { name: "Machakos Level 5 Hospital", location: "Machakos", level: "County" },
    { name: "Nyeri Provincial General Hospital", location: "Nyeri", level: "Provincial" },
    { name: "Aga Khan Hospital Nairobi", location: "Nairobi", level: "Private" },
    { name: "Nairobi Hospital", location: "Nairobi", level: "Private" },
    { name: "Mater Hospital", location: "Nairobi", level: "Private" },
    { name: "MP Shah Hospital", location: "Nairobi", level: "Private" },
    { name: "Gertrude's Children's Hospital", location: "Nairobi", level: "Private" },
  ]

//   const specialists = [
//     "Dr. Sarah Mwangi - Gynecologic Oncologist",
//     "Dr. Peter Kimani - Gynecologist",
//     "Dr. James Omondi - Colposcopist",
//     "Dr. Mary Njoroge - Gynecologic Oncologist",
//     "Dr. David Kariuki - Gynecologist",
//     "Dr. Grace Wanjiku - Colposcopist",
//     "Dr. John Mutua - Gynecologic Oncologist",
//     "Dr. Ruth Achieng - Gynecologist",
//   ]



  const urgencyLevels = [
    {
      value: "CRITICAL",
      label: "Critical",
      description: "Requires immediate attention (within 24-48 hours)",
      color: "bg-red-100 text-red-800 border-red-200",
    },
    {
      value: "HIGH",
      label: "High",
      description: "Urgent referral needed (within 1 week)",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      value: "MEDIUM",
      label: "Medium",
      description: "Standard referral (within 2-4 weeks)",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      value: "LOW",
      label: "Low",
      description: "Routine referral (within 1-2 months)",
      color: "bg-green-100 text-green-800 border-green-200",
    },
  ]

  const fetchSpecialists = async () => {
    try {
      const response = await apiClient.getSpecialists()
      setSpecialists(response.results)
    } catch (error) {
      setSpecialists([])
    }
  }

  useEffect(() => {
    if (!user) {
      router.push("/referrals/new")
      return
    }
    fetchHighRiskPatients()
    fetchSpecialists()
  }, [user, router])

  const fetchHighRiskPatients = async () => {
    setIsLoading(true)
    try {
      // Fetch all patients and their screenings
      const patientsResponse = await apiClient.getPatients()
      const screeningsResponse = await apiClient.getScreenings()

      const patients = patientsResponse.results || []
      const screenings = screeningsResponse.results || []

      // Filter patients with high or moderate risk
      const highRiskPatients = patients
        .map((patient) => {
          // Find the latest screening for this patient
          const patientScreenings = screenings
            .filter((s) => String(s.patient) === String(patient.id))
            .sort((a, b) => new Date(b.screening_date).getTime() - new Date(a.screening_date).getTime())

          const latestScreening = patientScreenings[0]

          return {
            ...patient,
            latestScreening,
            riskLevel: latestScreening?.risk_level,
            riskScore: latestScreening?.ai_risk_score,
          }
        })
        .filter((patient) => patient.riskLevel === "HIGH" || patient.riskLevel === "MODERATE")

      setHighRiskPatients(highRiskPatients)
    } catch (error: any) {
      setError("Failed to fetch high-risk patients")
      console.error("Fetch high-risk patients error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ReferralFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-select patient when patient ID changes
    if (field === "patientId" && value) {
      const patient = highRiskPatients.find((p) => p.id.toString() === value)
      setSelectedPatient(patient || null)

      // Auto-set urgency based on risk level
      if (patient?.riskLevel === "HIGH") {
        setFormData((prev) => ({ ...prev, urgency: "HIGH" }))
      }

      // Auto-set expected follow-up date
      const followUpDate = new Date()
      if (patient?.riskLevel === "HIGH") {
        followUpDate.setDate(followUpDate.getDate() + 7) // 1 week for high risk
      } else {
        followUpDate.setDate(followUpDate.getDate() + 21) // 3 weeks for moderate risk
      }
      setFormData((prev) => ({
        ...prev,
        expectedFollowUpDate: followUpDate.toISOString().split("T")[0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPatient) {
      setError("Please select a patient")
      return
    }

    if (!formData.facility || !formData.specialist || !formData.reason) {
      setError("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Create referral record (this would be a new API endpoint)
      const referralData = {
        patient_id: selectedPatient.id,
        facility: formData.facility,
        specialist: formData.specialist,
        urgency: formData.urgency,
        reason: formData.reason,
        clinical_notes: formData.clinicalNotes,
        expected_follow_up_date: formData.expectedFollowUpDate,
        contact_method: formData.contactMethod,
        risk_level: selectedPatient.riskLevel,
        risk_score: selectedPatient.riskScore,
        screening_record_id: selectedPatient.latestScreening?.id,
      }

      // For now, we'll simulate the API call
      console.log("Creating referral:", referralData)

      if (selectedPatient.latestScreening?.id) {
      await apiClient.updateScreening(selectedPatient.latestScreening.id, {
        referral_needed: true,
        clinical_notes: formData.clinicalNotes,
        // Optionally add more fields if your backend supports them
        // e.g., referred_facility: formData.facility,
        // referred_specialist: formData.specialist,
        // referral_reason: formData.reason,
      })
    }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)

      // Redirect to referrals page after success
      setTimeout(() => {
        router.push("/referrals")
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Failed to create referral")
      console.error("Referral creation error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Referral Created Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              The referral for {selectedPatient?.first_name} {selectedPatient?.last_name} has been created and sent to{" "}
              {formData.facility}.
            </p>
            <p className="text-sm text-muted-foreground">Redirecting to referrals page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/referrals">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Create New Referral
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  Patient Selection
                </CardTitle>
                <CardDescription>Select a high or moderate risk patient for referral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Loading high-risk patients...</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="patientId">Select Patient *</Label>
                      <Select
                        value={formData.patientId}
                        onValueChange={(value) => handleInputChange("patientId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a high or moderate risk patient" />
                        </SelectTrigger>
                        <SelectContent>
                          {highRiskPatients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id.toString()}>
                              <div className="flex items-center justify-between w-full">
                                <span>
                                  {patient.first_name} {patient.last_name} - {patient.national_id}
                                </span>
                                <Badge className={`ml-2 ${getRiskBadgeColor(patient.riskLevel || "")}`}>
                                  {patient.riskLevel} Risk
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedPatient && (
                      <Card className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Patient Information</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <strong>Name:</strong> {selectedPatient.first_name} {selectedPatient.last_name}
                                </p>
                                <p>
                                  <strong>Age:</strong>{" "}
                                  {new Date().getFullYear() - new Date(selectedPatient.date_of_birth).getFullYear()}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {selectedPatient.phone_number}
                                </p>
                                <p>
                                  <strong>Location:</strong> {selectedPatient.sub_county}, {selectedPatient.county}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Risk Assessment</h4>
                              <div className="space-y-2">
                                <Badge className={`${getRiskBadgeColor(selectedPatient.riskLevel || "")} text-sm`}>
                                  {selectedPatient.riskLevel} Risk Level
                                </Badge>
                                {selectedPatient.riskScore && (
                                  <p className="text-sm">
                                    <strong>AI Risk Score:</strong> {(selectedPatient.riskScore * 100).toFixed(1)}%
                                  </p>
                                )}
                                {selectedPatient.latestScreening && (
                                  <p className="text-sm">
                                    <strong>Last Screening:</strong> {selectedPatient.latestScreening.screening_date}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Referral Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hospital className="h-5 w-5 mr-2" />
                  Referral Details
                </CardTitle>
                <CardDescription>Specify the healthcare facility and specialist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facility">Healthcare Facility *</Label>
                    <Select value={formData.facility} onValueChange={(value) => handleInputChange("facility", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select healthcare facility" />
                      </SelectTrigger>
                      <SelectContent>
                        {healthcareFacilities.map((facility) => (
                          <SelectItem key={facility.name} value={facility.name}>
                            <div>
                              <div className="font-medium">{facility.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {facility.location} • {facility.level}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialist">Specialist *</Label>
                   <Select
                        value={formData.specialist}
                        onValueChange={(value) => handleInputChange("specialist", value)}
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Select specialist" />
                        </SelectTrigger>
                        <SelectContent>
                        {specialists.map((specialist) => (
                            <SelectItem key={specialist.id} value={specialist.id.toString()}>
                            {specialist.username} - {specialist.email}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                  </div>


                </div>
              </CardContent>
            </Card>

            {/* Urgency and Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Urgency and Timeline
                </CardTitle>
                <CardDescription>Set the priority level and expected follow-up date</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Urgency Level *</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange("urgency", value)}
                    className="mt-2"
                  >
                    {urgencyLevels.map((level) => (
                      <div key={level.value} className="flex items-start space-x-3">
                        <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={level.value} className="cursor-pointer">
                            <Badge className={level.color}>{level.label}</Badge>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedFollowUpDate">Expected Follow-up Date *</Label>
                    <Input
                      id="expectedFollowUpDate"
                      type="date"
                      value={formData.expectedFollowUpDate}
                      onChange={(e) => handleInputChange("expectedFollowUpDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                    <Select
                      value={formData.contactMethod}
                      onValueChange={(value) => handleInputChange("contactMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PHONE">Phone Call</SelectItem>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="EMAIL">Email</SelectItem>
                        <SelectItem value="IN_PERSON">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clinical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Clinical Information
                </CardTitle>
                <CardDescription>Provide reason for referral and additional clinical notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason for Referral *</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => handleInputChange("reason", e.target.value)}
                    placeholder="Describe the primary reason for this referral (e.g., High-grade squamous intraepithelial lesion detected, Multiple high-risk factors present, Abnormal cytology findings requiring specialist evaluation)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="clinicalNotes">Additional Clinical Notes</Label>
                  <Textarea
                    id="clinicalNotes"
                    value={formData.clinicalNotes}
                    onChange={(e) => handleInputChange("clinicalNotes", e.target.value)}
                    placeholder="Any additional clinical observations, patient concerns, or relevant medical history that would be helpful for the specialist"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/referrals">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting || !selectedPatient}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Referral...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Referral
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
