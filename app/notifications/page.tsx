"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Settings, BookMarkedIcon as MarkAsUnread } from "lucide-react"
import { formatDateTime } from "@/lib/utils"

interface Notification {
  id: number
  title: string
  message: string
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR" | "REMINDER"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  read: boolean
  created_at: string
  action_required?: boolean
  action_url?: string
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Urgent Referral Follow-up",
    message: "Patient Mary Wanjiku requires immediate follow-up. Last screening showed high-risk results.",
    type: "WARNING",
    priority: "URGENT",
    read: false,
    created_at: "2024-01-20T10:30:00Z",
    action_required: true,
    action_url: "/referrals/pending",
  },
  {
    id: 2,
    title: "Screening Reminder",
    message: "5 patients are due for their annual cervical cancer screening this week.",
    type: "REMINDER",
    priority: "MEDIUM",
    read: false,
    created_at: "2024-01-20T09:15:00Z",
    action_required: true,
    action_url: "/patients",
  },
  {
    id: 3,
    title: "System Update Complete",
    message: "MAMA-SCAN system has been successfully updated to version 2.1.0 with improved AI accuracy.",
    type: "SUCCESS",
    priority: "LOW",
    read: true,
    created_at: "2024-01-19T16:45:00Z",
  },
  {
    id: 4,
    title: "Training Session Available",
    message: "New training module on 'Advanced Screening Techniques' is now available in the resources section.",
    type: "INFO",
    priority: "MEDIUM",
    read: false,
    created_at: "2024-01-19T14:20:00Z",
    action_required: true,
    action_url: "/resources/training",
  },
  {
    id: 5,
    title: "Payment Confirmation",
    message: "Payment of KES 1,500 for lab tests has been successfully processed.",
    type: "SUCCESS",
    priority: "LOW",
    read: true,
    created_at: "2024-01-19T11:30:00Z",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length
  const urgentCount = notifications.filter((n) => n.priority === "URGENT" && !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "WARNING":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "ERROR":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "SUCCESS":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "REMINDER":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      LOW: "secondary",
      MEDIUM: "outline",
      HIGH: "default",
      URGENT: "destructive",
    } as const

    return (
      <Badge variant={variants[priority as keyof typeof variants] || "secondary"} className="text-xs">
        {priority}
      </Badge>
    )
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read)
      case "urgent":
        return notifications.filter((n) => n.priority === "URGENT")
      case "reminders":
        return notifications.filter((n) => n.type === "REMINDER")
      default:
        return notifications
    }
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <MarkAsUnread className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold">{urgentCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reminders</p>
                <p className="text-2xl font-bold">{notifications.filter((n) => n.type === "REMINDER").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent ({urgentCount})</TabsTrigger>
          <TabsTrigger value="reminders">
            Reminders ({notifications.filter((n) => n.type === "REMINDER").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "You're all caught up! No notifications to show."
                    : `No ${activeTab} notifications found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${!notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{notification.title}</h3>
                        <div className="flex items-center gap-2 ml-4">
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{formatDateTime(notification.created_at)}</p>
                        <div className="flex gap-2">
                          {notification.action_required && notification.action_url && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={notification.action_url}>Take Action</a>
                            </Button>
                          )}
                          {!notification.read && (
                            <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
