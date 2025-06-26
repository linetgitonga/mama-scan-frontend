"use client"

import type React from "react"

import { AppSidebar } from "../components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { Separator } from "../components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { ThemeToggle } from "../components/theme-toggle"
import { Button } from "../components/ui/button"
import { Bell, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { Badge } from "../components/ui/badge"
import { Activity } from "lucide-react"

interface SidebarLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Generate breadcrumbs based on pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    if (segments.length === 0) {
      return [{ label: "Dashboard", href: "/", isActive: true }]
    }

    // Add Dashboard as first item if not on dashboard
    breadcrumbs.push({ label: "Dashboard", href: "/", isActive: false })

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")
      const isActive = index === segments.length - 1

      breadcrumbs.push({ label, href, isActive })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 mybackground">
             <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  MAMA-SCAN
                </h1>
        
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700 dark:from-pink-900/50 dark:to-blue-900/50 dark:text-pink-300"
              >
                AI-Powered Screening
              </Badge> 
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                  <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                    {crumb.isActive ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header Actions */}
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
             <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium">{user?.username || "User"}</span>
              </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}
