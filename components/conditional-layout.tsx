"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { SidebarLayout } from "../components/sidebar-layout"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

// Pages that should NOT have the sidebar
const PUBLIC_PAGES = ["/landing", "/login", "/register", "/forgot-password", "/reset-password", "/users",]

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Check if current page is a public page that shouldn't have sidebar
  const isPublicPage = PUBLIC_PAGES.some((page) => pathname.startsWith(page))

  // If it's a public page, render children without sidebar
  if (isPublicPage) {
    return <>{children}</>
  }

  // Otherwise, render with sidebar layout
  return <SidebarLayout>{children}</SidebarLayout>
}
