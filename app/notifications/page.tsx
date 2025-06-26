"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  User,
  Settings,
  BookMarkedIcon as MarkAsRead,
  Trash2,
  Filter,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)

  const notifications = [
    {
      id: "1",
      type: "urgent",
      title: "High-Risk Patient Requires Immediate Attention",
      message:
        "Patient Mary Wanjiku Kamau (ID: P001) has been flagged as high-risk with a score of 87%. Immediate referral recommended.",
      timestamp: "2024-01-22 09:15:00",
      isRead: false,
      actionRequired: true,
      relatedPatient: "P001",
    },
    {
      id: "2",
      type: "reminder",
      title: "Follow-up Appointment Due",
      message: "Patient Grace Akinyi Ochieng has a follow-up appointment scheduled for today at 2:00 PM.",
      timestamp: "2024-01-22 08:00:00",
      isRead: false,
      actionRequired: true,
      relatedPatient: "P002",
    },
    {
      id: "3",
      type: "system",
      title: "AI Model Updated",
      message: "The cervical cancer risk assessment model has been updated with improved accuracy. New version: v2.1.3",
      timestamp: "2024-01-22 07:30:00",
      isRead: true,
      actionRequired: false,
    },
    {
      id: "4",
      type: "success",
      title: "Referral Completed Successfully",
      message:
        "Patient Faith Wanjiru Gitau's referral to Nairobi Hospital has been completed. Colposcopy results are available.",
      timestamp: "2024-01-21 16:45:00",
      isRead: false,
      actionRequired: false,
      relatedPatient: "P004",
    },
    {
      id: "5",
      type: "warning",
      title: "Overdue Referral",
      message:
        "Urgent referral for Patient Catherine Wambui Kariuki is now 3 days overdue. Please follow up immediately.",
      timestamp: "2024-01-21 14:20:00",
      isRead: true,
      actionRequired: true,
      relatedPatient: "P009",
    },
    {
      id: "6",
      type: "info",
      title: "Monthly Report Available",
      message: "Your January 2024 screening report is now available for download. Total screenings: 156",
      timestamp: "2024-01-21 10:00:00",
      isRead: true,
      actionRequired: false,
    },
    {
      id: "7",
      type: "reminder",
      title: "Training Session Reminder",
      message: "Mandatory training session on 'Advanced Risk Assessment Techniques' starts in 2 hours.",
      timestamp: "2024-01-21 09:00:00",
      isRead: false,
      actionRequired: true,
    },
    {
      id: "8",
      type: "urgent",
      title: "System Maintenance Scheduled",
      message:
        "MAMA-SCAN will undergo maintenance tonight from 11:00 PM to 2:00 AM. Please sync all offline data before then.",
      timestamp: "2024-01-20 15:30:00",
      isRead: true,
      actionRequired: true,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "system":
        return <Settings className="h-5 w-5 text-purple-600" />
      default:
        return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Urgent</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Warning</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Success</Badge>
      case "reminder":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Reminder</Badge>
      case "system":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">System</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Info</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      searchTerm === "" ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !notification.isRead) ||
      (statusFilter === "read" && notification.isRead) ||
      (statusFilter === "action" && notification.actionRequired)

    return matchesSearch && matchesType && matchesStatus
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    urgent: notifications.filter((n) => n.type === "urgent").length,
    actionRequired: notifications.filter((n) => n.actionRequired).length,
  }

  const notificationSettings = [
    { id: "high-risk", label: "High-risk patient alerts", enabled: true },
    { id: "referrals", label: "Referral status updates", enabled: true },
    { id: "appointments", label: "Appointment reminders", enabled: true },
    { id: "system", label: "System notifications", enabled: true },
    { id: "reports", label: "Monthly reports", enabled: false },
    { id: "training", label: "Training reminders", enabled: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and reminders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MarkAsRead className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
              <div className="h-3 w-3 bg-blue-600 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
                <p className="text-sm text-muted-foreground">Urgent</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.actionRequired}</div>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="action">Action Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          {getNotificationBadge(notification.type)}
                          {notification.actionRequired && (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              Action Required
                            </Badge>
                          )}
                          {!notification.isRead && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          {notification.relatedPatient && (
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              <span>Patient: {notification.relatedPatient}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button variant="ghost" size="sm">
                              <MarkAsRead className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "You're all caught up! No new notifications."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          {showSettings && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Settings</CardTitle>
                <CardDescription>Customize your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="text-sm">
                      {setting.label}
                    </Label>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => {
                        // Handle setting change
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MarkAsRead className="h-4 w-4 mr-2" />
                Mark All as Read
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Read Notifications
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Notification Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Total Notifications:</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Unread:</span>
                <span className="font-medium text-blue-600">{stats.unread}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Urgent:</span>
                <span className="font-medium text-red-600">{stats.urgent}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Action Required:</span>
                <span className="font-medium text-orange-600">{stats.actionRequired}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
