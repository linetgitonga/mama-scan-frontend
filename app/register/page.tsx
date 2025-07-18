// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import {
//   UserPlus,
//   Mail,
//   Lock,
//   User,
//   Phone,
//   MapPin,
//   Building,
//   AlertCircle,
//   CheckCircle,
//   Eye,
//   EyeOff,
// } from "lucide-react"

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     username: "",
//     phone_number: "",
//     password: "",
//     confirmPassword: "",
//     user_type: "",
//     county: "",
//     subCounty: "",
//     // facility: "",
//     // licenseNumber: "",
//     // specialization: "",
//     // experience: "",
//     // bio: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const router = useRouter()

//   const counties = [
//     "Nairobi",
//     "Mombasa",
//     "Kisumu",
//     "Nakuru",
//     "Eldoret",
//     "Thika",
//     "Malindi",
//     "Kitale",
//     "Garissa",
//     "Kakamega",
//     "Machakos",
//     "Meru",
//     "Nyeri",
//     "Kericho",
//     "Embu",
//     "Migori",
//     "Homa Bay",
//     "Naivasha",
//     "Kitui",
//     "Kapenguria",
//     "Moyale",
//     "Chuka",
//     "Kiambu",
//     "Murang'a",
//   ]

//   const roles = [
//     { value: "CHV", label: "Community Health Volunteer (CHV)" },
//     // { value: "nurse", label: "Nurse" },
//     { value: "CLINICIAN", label: "Clinician" },
//     { value: "PATIENT", label: "Patient" },
//     { value: "SPECIALIST", label: "Specialist" },
//     { value: "ADMIN", label: "Administrator" },
//   ]

//   const specializations = [
//     "General Practice",
//     "Gynecology",
//     "Oncology",
//     "Public Health",
//     "Community Health",
//     "Nursing",
//     "Midwifery",
//     "Pathology",
//   ]

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     setError("")
//   }

//   const validateForm = () => {
//     if (!formData.first_name || !formData.last_name) {
//       setError("First name and last name are required")
//       return false
//     }

//     if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//       setError("Please enter a valid email address")
//       return false
//     }

//     if (!formData.phone_number || !/^(\+254|0)[17]\d{8}$/.test(formData.phone_number)) {
//       setError("Please enter a valid Kenyan phone number")
//       return false
//     }

//     if (!formData.password || formData.password.length < 8) {
//       setError("Password must be at least 8 characters long")
//       return false
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match")
//       return false
//     }

//     if (!formData.user_type) {
//       setError("Please select your role")
//       return false
//     }

//     if (!formData.county || !formData.subCounty) {
//       setError("Please select your county and sub-county")
//       return false
//     }

//     return true
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     setIsLoading(true)
//     setError("")

//     try {
//       // const response = await fetch("https://mamascan-backend.onrender.com/api/auth/register/", {
//       const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed")
//       }

//       setSuccess("Registration successful! Please check your email to verify your account.")

//       // Redirect to login after 3 seconds
//       setTimeout(() => {
//         router.push("/login")
//       }, 3000)
//     } catch (error: any) {
//       setError(error.message || "Registration failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <Card className="w-full max-w-2xl shadow-xl">
//         <CardHeader className="text-center space-y-2">
//           <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//             <UserPlus className="h-6 w-6 text-white" />
//           </div>
//           <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Join MAMA-SCAN
//           </CardTitle>
//           <CardDescription>Create your account to start screening and saving lives</CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {error && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {success && (
//             <Alert className="border-green-200 bg-green-50 text-green-800">
//               <CheckCircle className="h-4 w-4" />
//               <AlertDescription>{success}</AlertDescription>
//             </Alert>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <User className="h-5 w-5" />
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First Name *</Label>
//                   <Input
//                     id="firstName"
//                     type="text"
//                     value={formData.firstName}
//                     onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     placeholder="Enter your first name"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Last Name *</Label>
//                   <Input
//                     id="lastName"
//                     type="text"
//                     value={formData.lastName}
//                     onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     placeholder="Enter your last name"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address *</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleInputChange("email", e.target.value)}
//                       placeholder="your.email@example.com"
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number *</Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={formData.phone_number}
//                       onChange={(e) => handleInputChange("phone", e.target.value)}
//                       placeholder="+254......."
//                       className="pl-10"
//                       // required
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Account Security */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <Lock className="h-5 w-5" />
//                 Account Security
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password *</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={(e) => handleInputChange("password", e.target.value)}
//                       placeholder="Create a strong password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password *</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       value={formData.confirmPassword}
//                       onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                       placeholder="Confirm your password"
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Professional Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <Building className="h-5 w-5" />
//                 Professional Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="role">Role *</Label>
//                   <Select value={formData.user_type} onValueChange={(value) => handleInputChange("user_type", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {roles.map((role) => (
//                         <SelectItem key={role.value} value={role.value}>
//                           {role.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* <div className="space-y-2">
//                   <Label htmlFor="specialization">Specialization</Label>
//                   <Select
//                     value={formData.specialization}
//                     onValueChange={(value) => handleInputChange("specialization", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select specialization" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {specializations.map((spec) => (
//                         <SelectItem key={spec} value={spec}>
//                           {spec}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div> */}
//               </div>

//               {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="licenseNumber">License Number</Label>
//                   <Input
//                     id="licenseNumber"
//                     type="text"
//                     value={formData.licenseNumber}
//                     onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
//                     placeholder="Professional license number"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="experience">Years of Experience</Label>
//                   <Input
//                     id="experience"
//                     type="number"
//                     value={formData.experience}
//                     onChange={(e) => handleInputChange("experience", e.target.value)}
//                     placeholder="Years of experience"
//                     min="0"
//                     max="50"
//                   />
//                 </div>
//               </div> */}
//             </div>

//             {/* Location Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold flex items-center gap-2">
//                 <MapPin className="h-5 w-5" />
//                 Location & Facility
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="county">County *</Label>
//                   <Select value={formData.county} onValueChange={(value) => handleInputChange("county", value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your county" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {counties.map((county) => (
//                         <SelectItem key={county} value={county}>
//                           {county}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="subCounty">Sub-County *</Label>
//                   <Input
//                     id="subCounty"
//                     type="text"
//                     value={formData.subCounty}
//                     onChange={(e) => handleInputChange("subCounty", e.target.value)}
//                     placeholder="Enter your sub-county"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* <div className="space-y-2">
//                 <Label htmlFor="facility">Health Facility</Label>
//                 <Input
//                   id="facility"
//                   type="text"
//                   value={formData.facility}
//                   onChange={(e) => handleInputChange("facility", e.target.value)}
//                   placeholder="Name of your health facility"
//                 />
//               </div> */}

//               {/* <div className="space-y-2">
//                 <Label htmlFor="bio">Professional Bio (Optional)</Label>
//                 <Textarea
//                   id="bio"
//                   value={formData.bio}
//                   onChange={(e) => handleInputChange("bio", e.target.value)}
//                   placeholder="Brief description of your professional background and experience..."
//                   rows={3}
//                 />
//               </div> */}
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Creating Account...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <UserPlus className="h-4 w-4" />
//                   Create Account
//                 </div>
//               )}
//             </Button>
//           </form>

//           <div className="text-center space-y-2">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link href="/login" className="text-primary hover:underline font-medium">
//                 Sign in here
//               </Link>
//             </p>
//             <p className="text-xs text-muted-foreground">
//               By creating an account, you agree to our{" "}
//               <Link href="/terms" className="text-primary hover:underline">
//                 Terms of Service
//               </Link>{" "}
//               and{" "}
//               <Link href="/privacy" className="text-primary hover:underline">
//                 Privacy Policy
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Building,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    password: "",
    password_confirm: "",
    user_type: "",
    county: "",
    sub_county: "",
    date_of_birth: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", 
    "Malindi", "Kitale", "Garissa", "Kakamega", "Machakos", "Meru", 
    "Nyeri", "Kericho", "Embu", "Migori", "Homa Bay", "Naivasha", 
    "Kitui", "Kapenguria", "Moyale", "Chuka", "Kiambu", "Murang'a"
  ]

  const roles = [
    { value: "CHV", label: "Community Health Volunteer (CHV)" },
    { value: "CLINICIAN", label: "Clinician" },
    { value: "PATIENT", label: "Patient" },
    { value: "SPECIALIST", label: "Specialist" },
    { value: "ADMIN", label: "Administrator" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name) {
      setError("First name and last name are required")
      return false
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    if (!formData.phone_number || !/^(\+254|0)[17]\d{8}$/.test(formData.phone_number)) {
      setError("Please enter a valid Kenyan phone number (e.g., +254712345678 or 0712345678)")
      return false
    }

    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }

    if (formData.password !== formData.password_confirm) {
      setError("Passwords do not match")
      return false
    }

    if (!formData.date_of_birth) {
      setError("Please enter your date of birth")
      return false
    }

    if (!formData.user_type) {
      setError("Please select your role")
      return false
    }

    if (!formData.county || !formData.sub_county) {
      setError("Please select your county and sub-county")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      const payload = {
        // ...formData,
        // username: formData.email, // Using email as username if not provided
        // // confirmPassword: undefined // Remove confirmPassword before sending


        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.email, // Using email as username
        phone_number: formData.phone_number,
        password: formData.password,
        password_confirm: formData.password_confirm, // Using password_confirm
        user_type: formData.user_type,
        county: formData.county,
        sub_county: formData.sub_county,
        date_of_birth: formData.date_of_birth,
      }

      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 
          data.detail || 
          (data.password_confirm ? data.password_confirm[0] : "Registration failed")

          // (data.errors ? Object.values(data.errors).join(', ') : "Registration failed")
        )
      }

      setSuccess("Registration successful! Please check your email to verify your account.")
      setTimeout(() => router.push("/login"), 3000)
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join MAMA-SCAN
          </CardTitle>
          <CardDescription>Create your account to start screening and saving lives</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange("phone_number", e.target.value)}
                      placeholder="+254712345678"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                    className="w-full"
                    required
                  />
                  </div>

              </div>

              
            </div>

            {/* Account Security */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Account Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="At least 8 characters"
                      className="pl-10 pr-10"
                      required
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                          <div className="space-y-2">
                <Label htmlFor="password_confirm">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password_confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.password_confirm}
                    onChange={(e) => handleInputChange("password_confirm", e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>


              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="h-5 w-5" />
                Professional Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="user_type">Role *</Label>
                <Select value={formData.user_type} onValueChange={(value) => handleInputChange("user_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Select value={formData.county} onValueChange={(value) => handleInputChange("county", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sub_county">Sub-County *</Label>
                  <Input
                    id="sub_county"
                    type="text"
                    value={formData.sub_county}
                    onChange={(e) => handleInputChange("sub_county", e.target.value)}
                    placeholder="Enter your sub-county"
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </div>
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}