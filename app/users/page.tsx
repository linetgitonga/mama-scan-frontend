import { DashboardLayout } from "@/components/user/dashboard-layout"
import { StatsCard } from "@/components/user/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Calendar, FileText, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

export default function UserDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="hero-gradient rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Jane!</h1>
          <p className="text-muted-foreground">Stay on top of your health with regular screenings and check-ups.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Screenings" value={3} description="Completed screenings" icon={Activity} />
          <StatsCard title="Next Appointment" value="Dec 15" description="Upcoming screening" icon={Calendar} />
          <StatsCard title="Risk Level" value="Low" description="Current assessment" icon={CheckCircle} />
          <StatsCard title="Follow-ups" value={1} description="Pending actions" icon={Clock} />
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Screenings */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Recent Screenings</CardTitle>
              <CardDescription>Your latest screening results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium">Cervical Cancer Screening</p>
                  <p className="text-sm text-muted-foreground">November 15, 2024</p>
                </div>
                <Badge className="badge-low-risk">Low Risk</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium">Follow-up Consultation</p>
                  <p className="text-sm text-muted-foreground">October 20, 2024</p>
                </div>
                <Badge className="badge-primary">Completed</Badge>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View All Screenings
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start btn-primary">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                View Test Results
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="mr-2 h-4 w-4" />
                Health Resources
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="mr-2 h-4 w-4" />
                Track Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Health Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg alert-info">
                <div>
                  <p className="font-medium">Annual Screening Due</p>
                  <p className="text-sm opacity-80">Your next cervical cancer screening is due in 2 months</p>
                </div>
                <Button size="sm">Schedule</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg alert-success">
                <div>
                  <p className="font-medium">Vaccination Complete</p>
                  <p className="text-sm opacity-80">HPV vaccination series completed successfully</p>
                </div>
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
