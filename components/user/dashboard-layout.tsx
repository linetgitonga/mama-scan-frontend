"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { FloatingChatbot } from "./floating-chatbot"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"}`}>
        <Header />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
      <FloatingChatbot />
    </div>
  )
}
