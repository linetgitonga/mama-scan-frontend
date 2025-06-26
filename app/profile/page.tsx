"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Edit,
  Save,
  X,
  Activity,
  Users,
  UserCheck,
  TrendingUp,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { apiClient } from "@/lib/api"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    county: "",
    sub_county: "",
    user_type: "",
  })

  const [stats, setStats] = useState({
    totalScreenings: 0,
    patientsRegistered: 0,
    highRiskDetected: 0,
    referralsMade: 0,
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        county: user.county || "",
        sub_county: user.sub_county || "",
        user_type: user.user_type || "",
      })

      // Fetch user statistics
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      // This would be replaced with actual API calls
      setStats({
        totalScreenings: 156,
        patientsRegistered: 89,
        highRiskDetected: 12,
        referralsMade: 8,
      })
    } catch (error) {
      console.error("Failed to fetch user stats:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      await apiClient.updateProfile(formData)
      setSuccess("Profile updated successfully!")
      setIsEditing(false)
    } catch (error: any) {
      setError(error.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        county: user.county || "",
        sub_county: user.sub_county || "",
        user_type: user.user_type || "",
      })
    }
    setIsEditing(false)
    setError("")
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "CLINICIAN":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "CHV":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <AlertDescription className="text-green-700 dark:text-green-400">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{user.username}</h3>
                <Badge className={getUserTypeColor(user.user_type)}>
                  {user.user_type === "CHV" ? "Community Health Volunteer" : user.user_type}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder="+254712345678"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={formData.user_type}
                  onValueChange={(value) => handleInputChange("user_type", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHV">Community Health Volunteer</SelectItem>
                    <SelectItem value="CLINICIAN">Clinician</SelectItem>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="county">County</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) => handleInputChange("county", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subCounty">Sub-County</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="subCounty"
                    value={formData.sub_county}
                    onChange={(e) => handleInputChange("sub_county", e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics and Account Status */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Status</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {user.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Verified</span>
                <Badge
                  className={
                    user.is_verified
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }
                >
                  {user.is_verified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <span className="text-sm text-muted-foreground">{new Date(user.updated_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Your Statistics</CardTitle>
              <CardDescription>Your contribution to the MAMA-SCAN platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">Screenings Conducted</span>
                </div>
                <span className="font-semibold">{stats.totalScreenings}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">Patients Registered</span>
                </div>
                <span className="font-semibold">{stats.patientsRegistered}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-sm">High Risk Detected</span>
                </div>
                <span className="font-semibold">{stats.highRiskDetected}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                  <span className="text-sm">Referrals Made</span>
                </div>
                <span className="font-semibold">{stats.referralsMade}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
