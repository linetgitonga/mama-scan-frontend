"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Checkbox } from "../../../components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Textarea } from "../../../components/ui/textarea"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Brain,
  AlertTriangle,
  CheckCircle,
  User,
  Calendar,
  Heart,
  Shield,
} from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"
import { apiClient, type Patient, type RiskPrediction } from "../../../lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewScreening() {
  const [currentStep, setCurrentStep] = useState(1)
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    // Patient Selection
    patientId: "",

    // Demographics (auto-filled from patient)
    age: "",
    county: "",
    subCounty: "",

    // Sexual & Reproductive History
    ageAtFirstIntercourse: "",
    numberOfSexualPartners: "",
    parity: "",

    // Medical History
    hivStatus: "",
    hpvVaccinationStatus: "",
    contraceptiveUse: "",
    smokingStatus: "",
    familyHistoryCervicalCancer: false,
    previousAbnormalPap: false,

    // Clinical Findings (Optional)
    viaResult: "",
    bethesdaCategory: "",

    // Additional Notes
    clinicalNotes: "",
  })

  const [riskPrediction, setRiskPrediction] = useState<RiskPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { user } = useAuth()
  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    fetchPatients()
  }, [user, router])

  const fetchPatients = async () => {
    try {
      const response = await apiClient.getPatients()
      setPatients(response.results || [])
    } catch (error: any) {
      setError("Failed to fetch patients")
      console.error("Fetch patients error:", error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-fill patient data when patient is selected
    if (field === "patientId" && value) {
      const patient = patients.find((p) => p.id.toString() === value)
      if (patient) {
        setSelectedPatient(patient)
        const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
        setFormData((prev) => ({
          ...prev,
          age: age.toString(),
          county: patient.county,
          subCounty: patient.sub_county,
        }))
      }
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!selectedPatient) {
      setError("Please select a patient")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Prepare risk prediction data
      const riskData = {
        age: Number.parseInt(formData.age),
        age_at_first_intercourse: formData.ageAtFirstIntercourse
          ? Number.parseInt(formData.ageAtFirstIntercourse)
          : undefined,
        number_of_sexual_partners: formData.numberOfSexualPartners
          ? Number.parseInt(formData.numberOfSexualPartners)
          : undefined,
        parity: formData.parity ? Number.parseInt(formData.parity) : undefined,
        hiv_status: formData.hivStatus,
        hpv_vaccination_status: formData.hpvVaccinationStatus,
        contraceptive_use: formData.contraceptiveUse,
        smoking_status: formData.smokingStatus,
        family_history_cervical_cancer: formData.familyHistoryCervicalCancer,
        previous_abnormal_pap: formData.previousAbnormalPap,
        via_result: formData.viaResult || undefined,
        bethesda_category: formData.bethesdaCategory || undefined,
      }

      // Get AI prediction
      const prediction = await apiClient.predictRisk(riskData)

      // Create screening record
      const screeningData = {
        patient: selectedPatient.id,
        screening_date: new Date().toISOString().split("T")[0],
        age: Number.parseInt(formData.age),
        age_at_first_intercourse: formData.ageAtFirstIntercourse
          ? Number.parseInt(formData.ageAtFirstIntercourse)
          : undefined,
        number_of_sexual_partners: formData.numberOfSexualPartners
          ? Number.parseInt(formData.numberOfSexualPartners)
          : undefined,
        parity: formData.parity ? Number.parseInt(formData.parity) : undefined,
        hiv_status: formData.hivStatus as any,
        hpv_vaccination_status: formData.hpvVaccinationStatus as any,
        contraceptive_use: formData.contraceptiveUse as any,
        smoking_status: formData.smokingStatus as any,
        family_history_cervical_cancer: formData.familyHistoryCervicalCancer,
        previous_abnormal_pap: formData.previousAbnormalPap,
        via_result: (formData.viaResult as any) || undefined,
        bethesda_category: (formData.bethesdaCategory as any) || undefined,
        risk_level: prediction.risk_level,
        ai_risk_score: prediction.risk_score,
        ai_confidence: prediction.confidence,
        referral_needed: prediction.referral_needed,
        clinical_notes: formData.clinicalNotes,
      }

      await apiClient.createScreening(screeningData)
      setRiskPrediction(prediction)
    } catch (error: any) {
      setError(error.message || "Failed to process screening")
      console.error("Screening submission error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Selection & Demographics
              </CardTitle>
              <CardDescription>Select patient and verify demographic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="patientId">Select Patient</Label>
                  <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.first_name} {patient.last_name} - {patient.national_id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPatient && (
                  <>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Enter age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County</Label>
                      <Input
                        id="county"
                        value={formData.county}
                        onChange={(e) => handleInputChange("county", e.target.value)}
                        placeholder="County"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="subCounty">Sub-County</Label>
                      <Input
                        id="subCounty"
                        value={formData.subCounty}
                        onChange={(e) => handleInputChange("subCounty", e.target.value)}
                        placeholder="Sub-county"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )

      // Steps 2, 3, and 4 remain the same as before
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Sexual & Reproductive History
              </CardTitle>
              <CardDescription>Information about sexual and reproductive health history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ageAtFirstIntercourse">Age at First Sexual Intercourse</Label>
                  <Input
                    id="ageAtFirstIntercourse"
                    type="number"
                    value={formData.ageAtFirstIntercourse}
                    onChange={(e) => handleInputChange("ageAtFirstIntercourse", e.target.value)}
                    placeholder="Enter age"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfSexualPartners">Number of Sexual Partners</Label>
                  <Input
                    id="numberOfSexualPartners"
                    type="number"
                    value={formData.numberOfSexualPartners}
                    onChange={(e) => handleInputChange("numberOfSexualPartners", e.target.value)}
                    placeholder="Enter number"
                  />
                </div>
                <div>
                  <Label htmlFor="parity">Parity (Number of Births)</Label>
                  <Input
                    id="parity"
                    type="number"
                    value={formData.parity}
                    onChange={(e) => handleInputChange("parity", e.target.value)}
                    placeholder="Enter number of births"
                  />
                </div>
                <div>
                  <Label>Contraceptive Use</Label>
                  <Select
                    value={formData.contraceptiveUse}
                    onValueChange={(value) => handleInputChange("contraceptiveUse", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contraceptive method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">None</SelectItem>
                      <SelectItem value="ORAL_PILLS">Oral Pills</SelectItem>
                      <SelectItem value="INJECTION">Injection</SelectItem>
                      <SelectItem value="IUD">IUD</SelectItem>
                      <SelectItem value="BARRIER">Barrier Methods</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Medical History
              </CardTitle>
              <CardDescription>Medical conditions and risk factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>HIV Status</Label>
                  <RadioGroup
                    value={formData.hivStatus}
                    onValueChange={(value) => handleInputChange("hivStatus", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="POSITIVE" id="hiv-positive" />
                      <Label htmlFor="hiv-positive">Positive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NEGATIVE" id="hiv-negative" />
                      <Label htmlFor="hiv-negative">Negative</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNKNOWN" id="hiv-unknown" />
                      <Label htmlFor="hiv-unknown">Unknown</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>HPV Vaccination Status</Label>
                  <RadioGroup
                    value={formData.hpvVaccinationStatus}
                    onValueChange={(value) => handleInputChange("hpvVaccinationStatus", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="VACCINATED" id="hpv-vaccinated" />
                      <Label htmlFor="hpv-vaccinated">Vaccinated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NOT_VACCINATED" id="hpv-not-vaccinated" />
                      <Label htmlFor="hpv-not-vaccinated">Not Vaccinated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNKNOWN" id="hpv-unknown" />
                      <Label htmlFor="hpv-unknown">Unknown</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Smoking Status</Label>
                  <RadioGroup
                    value={formData.smokingStatus}
                    onValueChange={(value) => handleInputChange("smokingStatus", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NEVER" id="smoke-never" />
                      <Label htmlFor="smoke-never">Never</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FORMER" id="smoke-former" />
                      <Label htmlFor="smoke-former">Former</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="CURRENT" id="smoke-current" />
                      <Label htmlFor="smoke-current">Current</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyHistory"
                    checked={formData.familyHistoryCervicalCancer}
                    onCheckedChange={(checked) => handleInputChange("familyHistoryCervicalCancer", checked)}
                  />
                  <Label htmlFor="familyHistory">Family history of cervical cancer</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="previousAbnormalPap"
                    checked={formData.previousAbnormalPap}
                    onCheckedChange={(checked) => handleInputChange("previousAbnormalPap", checked)}
                  />
                  <Label htmlFor="previousAbnormalPap">Previous abnormal Pap smear</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Clinical Findings & Notes
              </CardTitle>
              <CardDescription>Optional clinical test results and additional observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>VIA Result (if available)</Label>
                  <Select value={formData.viaResult} onValueChange={(value) => handleInputChange("viaResult", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select VIA result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEGATIVE">Negative</SelectItem>
                      <SelectItem value="POSITIVE">Positive</SelectItem>
                      <SelectItem value="SUSPICIOUS">Suspicious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Bethesda Category (if available)</Label>
                  <Select
                    value={formData.bethesdaCategory}
                    onValueChange={(value) => handleInputChange("bethesdaCategory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bethesda category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NILM">NILM (Negative)</SelectItem>
                      <SelectItem value="ASCUS">ASCUS</SelectItem>
                      <SelectItem value="LSIL">LSIL</SelectItem>
                      <SelectItem value="HSIL">HSIL</SelectItem>
                      <SelectItem value="AGC">AGC</SelectItem>
                      <SelectItem value="CANCER">Cancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="clinicalNotes">Clinical Notes</Label>
                <Textarea
                  id="clinicalNotes"
                  value={formData.clinicalNotes}
                  onChange={(e) => handleInputChange("clinicalNotes", e.target.value)}
                  placeholder="Enter any additional clinical observations or notes..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  if (riskPrediction) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">AI Risk Assessment Results</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Risk Score Card */}
            <Card className={`border-2 ${getRiskColor(riskPrediction.risk_level)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-2xl">
                    <Brain className="h-6 w-6 mr-2" />
                    AI Risk Assessment
                  </CardTitle>
                  <Badge className={`text-lg px-4 py-2 ${getRiskColor(riskPrediction.risk_level)}`}>
                    {riskPrediction.risk_level} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{(riskPrediction.risk_score * 100).toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{(riskPrediction.confidence * 100).toFixed(1)}%</div>
                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{riskPrediction.follow_up_months}</div>
                    <p className="text-sm text-muted-foreground">Months to Follow-up</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {riskPrediction.referral_needed ? (
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  )}
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-2">Primary Recommendation:</p>
                    <p>{riskPrediction.recommended_action}</p>
                  </div>

                  {riskPrediction.referral_needed && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="font-medium text-red-800 mb-2">⚠️ Referral Required</p>
                      <p className="text-red-700">This patient requires immediate specialist consultation.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors Analysis</CardTitle>
                <CardDescription>AI-identified factors contributing to the risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {riskPrediction.explanation.map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full" size="lg">
                  <Save className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              {riskPrediction.referral_needed && (
                <Button variant="outline" className="flex-1" size="lg">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Create Referral
                </Button>
              )}
              <Link href="/screening/new" className="flex-1">
                <Button variant="outline" className="w-full" size="lg">
                  New Screening
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              New Cervical Cancer Screening
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Steps */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !formData.patientId}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Get AI Prediction
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={currentStep === 1 && !formData.patientId}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
