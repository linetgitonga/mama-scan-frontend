"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/user/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, MapPin, Phone, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { apiClient } from "@/lib/api"

interface Appointment {
  id: string
  patient_name: string
  appointment_date: string
  appointment_time: string
  service_type: string
  provider_name: string
  location: string
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW"
  notes?: string
  phone_number?: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      // Since there's no specific appointments endpoint, we'll simulate with follow-ups
      const response = await apiClient.getFollowUps()

      // Transform follow-up data to appointment format
      const appointmentData: Appointment[] =
        response.results?.map((followUp: any, index: number) => ({
          id: followUp.id?.toString() || index.toString(),
          patient_name: "Current User", // Since this is user dashboard
          appointment_date: followUp.follow_up_date,
          appointment_time: "10:00 AM", // Default time since not in API
          service_type: "Follow-up Consultation",
          provider_name: "Dr. Health Provider",
          location: "Main Clinic",
          status:
            followUp.status === "COMPLETED" ? "COMPLETED" : followUp.status === "CANCELLED" ? "CANCELLED" : "SCHEDULED",
          notes: followUp.notes || "",
          phone_number: "+254-700-123-456",
        })) || []

      setAppointments(appointmentData)
    } catch (err) {
      setError("Failed to fetch appointments")
      console.error("Error fetching appointments:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTime || !serviceType) return

    setIsSubmitting(true)
    try {
      // Create a follow-up record as appointment
      await apiClient.createFollowUp({
        screening_record: 1, // Default screening record
        follow_up_date: selectedDate,
        status: "SCHEDULED",
        contact_method: "PHONE",
        notes: notes || `${serviceType} appointment scheduled for ${selectedTime}`,
      })

      // Refresh appointments
      await fetchAppointments()

      // Reset form
      setSelectedDate("")
      setSelectedTime("")
      setServiceType("")
      setNotes("")
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Error scheduling appointment:", err)
      setError("Failed to schedule appointment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "CANCELLED":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "NO_SHOW":
        return <XCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "badge-low-risk"
      case "CANCELLED":
      case "NO_SHOW":
        return "badge-high-risk"
      default:
        return "badge-primary"
    }
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "SCHEDULED" && new Date(apt.appointment_date) >= new Date(),
  ).length

  const completedAppointments = appointments.filter((apt) => apt.status === "COMPLETED").length
  const cancelledAppointments = appointments.filter(
    (apt) => apt.status === "CANCELLED" || apt.status === "NO_SHOW",
  ).length

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="spinner-primary animate-spin rounded-full h-8 w-8 border-b-2"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-muted-foreground">Manage your healthcare appointments and consultations</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>Book your next healthcare appointment</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-primary"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 border rounded-md input-primary"
                  >
                    <option value="">Select time</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="service">Service Type</Label>
                  <select
                    id="service"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-2 border rounded-md input-primary"
                  >
                    <option value="">Select service</option>
                    <option value="Cervical Cancer Screening">Cervical Cancer Screening</option>
                    <option value="Follow-up Consultation">Follow-up Consultation</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Lab Results Review">Lab Results Review</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-primary"
                    rows={3}
                    placeholder="Any specific concerns or requests..."
                  />
                </div>

                <Button
                  onClick={handleScheduleAppointment}
                  disabled={!selectedDate || !selectedTime || !serviceType || isSubmitting}
                  className="w-full btn-primary"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="alert-error p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Appointment Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments}</div>
              <p className="text-xs text-muted-foreground">Scheduled appointments</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppointments}</div>
              <p className="text-xs text-muted-foreground">Finished appointments</p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cancelledAppointments}</div>
              <p className="text-xs text-muted-foreground">Cancelled/No-show</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <Card className="card-gradient">
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Appointments Yet</h3>
                <p className="text-muted-foreground mb-4">Schedule your first appointment to get started</p>
                <Button onClick={() => setIsDialogOpen(true)} className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            appointments.map((appointment) => (
              <Card key={appointment.id} className="card-gradient">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{appointment.service_type}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadgeClass(appointment.status)} variant="outline">
                      {getStatusIcon(appointment.status)}
                      <span className="ml-1">{appointment.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.provider_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.location}</span>
                      </div>
                      {appointment.phone_number && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.phone_number}</span>
                        </div>
                      )}
                    </div>

                    {appointment.notes && (
                      <div>
                        <h4 className="font-medium mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {appointment.status === "SCHEDULED" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
