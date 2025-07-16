import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, User, MapPin, Phone, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

const referrals = [
  {
    id: 1,
    date: "2024-11-20",
    referredTo: "Dr. Sarah Johnson",
    specialty: "Gynecologic Oncologist",
    hospital: "City Medical Center",
    location: "Downtown Campus",
    phone: "+254-700-123-456",
    reason: "Follow-up for abnormal screening results",
    status: "Scheduled",
    appointmentDate: "2024-12-05",
    appointmentTime: "10:00 AM",
    priority: "High",
    notes: "Patient requires specialized consultation for HSIL findings. Urgent follow-up recommended.",
  },
  {
    id: 2,
    date: "2024-10-15",
    referredTo: "Dr. Michael Chen",
    specialty: "Gynecologist",
    hospital: "Women's Health Clinic",
    location: "Westside Branch",
    phone: "+254-700-789-012",
    reason: "Routine specialist consultation",
    status: "Completed",
    appointmentDate: "2024-11-01",
    appointmentTime: "2:30 PM",
    priority: "Medium",
    notes: "Regular follow-up completed. Patient advised to continue routine screening schedule.",
  },
  {
    id: 3,
    date: "2024-09-20",
    referredTo: "Dr. Emily Rodriguez",
    specialty: "Colposcopist",
    hospital: "Regional Health Center",
    location: "North Campus",
    phone: "+254-700-345-678",
    reason: "Colposcopy examination",
    status: "Pending",
    appointmentDate: null,
    appointmentTime: null,
    priority: "Medium",
    notes: "Awaiting appointment scheduling. Patient to be contacted within 48 hours.",
  },
]

export default function ReferralsPage() {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-low-risk"
      case "scheduled":
        return "badge-primary"
      case "pending":
        return "badge-moderate-risk"
      default:
        return "badge-primary"
    }
  }

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "badge-high-risk"
      case "medium":
        return "badge-moderate-risk"
      case "low":
        return "badge-low-risk"
      default:
        return "badge-primary"
    }
  }

  const pendingReferrals = referrals.filter((r) => r.status === "Pending").length
  const scheduledReferrals = referrals.filter((r) => r.status === "Scheduled").length
  const completedReferrals = referrals.filter((r) => r.status === "Completed").length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Referrals</h1>
          <p className="text-muted-foreground">Track your specialist referrals and appointments</p>
        </div>

        {/* Referral Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referrals.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReferrals}</div>
              <p className="text-xs text-muted-foreground">Awaiting scheduling</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledReferrals}</div>
              <p className="text-xs text-muted-foreground">Upcoming appointments</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedReferrals}</div>
              <p className="text-xs text-muted-foreground">Finished consultations</p>
            </CardContent>
          </Card>
        </div>

        {/* Referrals List */}
        <div className="space-y-4">
          {referrals.map((referral) => (
            <Card key={referral.id} className="card-gradient">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {referral.referredTo}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {referral.specialty} • {referral.hospital}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityBadgeClass(referral.priority)}>{referral.priority} Priority</Badge>
                    <Badge className={getStatusBadgeClass(referral.status)} variant="outline">
                      {getStatusIcon(referral.status)}
                      <span className="ml-1">{referral.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{referral.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{referral.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Referred: {new Date(referral.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {referral.appointmentDate && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Appointment: {new Date(referral.appointmentDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Time: {referral.appointmentTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Reason for Referral</h4>
                  <p className="text-sm text-muted-foreground">{referral.reason}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Clinical Notes</h4>
                  <p className="text-sm text-muted-foreground">{referral.notes}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  {referral.status === "Scheduled" && (
                    <Button size="sm" className="btn-primary">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Appointment
                    </Button>
                  )}
                  {referral.status === "Pending" && (
                    <Button size="sm" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call to Schedule
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Hospital Info
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Referral
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Need Help with Your Referral?</CardTitle>
            <CardDescription>Get assistance with scheduling or understanding your referral</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-muted-foreground">
                  Our patient coordinators can help you schedule appointments and answer questions about your referrals.
                </p>
                <Button size="sm" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Understanding Referrals</h4>
                <p className="text-sm text-muted-foreground">
                  Learn more about why referrals are made and what to expect during specialist consultations.
                </p>
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
