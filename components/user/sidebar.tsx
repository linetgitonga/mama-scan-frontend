"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  MessageSquare,
  FileText,
  Calendar,
  CreditCard,
  Bell,
  User,
  BookOpen,
  Activity,
  Menu,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { apiClient } from "@/lib/api"

const navigation = [
  { name: "Dashboard", href: "/users", icon: Home },
  { name: "Chatbot", href: "/users/chatbot", icon: MessageSquare },
  { name: "My Screenings", href: "/users/screenings", icon: Activity },
  { name: "Appointments", href: "/users/appointments", icon: Calendar },
  { name: "Referrals", href: "/users/referrals", icon: FileText },
  { name: "Resources", href: "/users/resources", icon: BookOpen },
  { name: "Payments", href: "/users/payments", icon: CreditCard },
  { name: "Notifications", href: "/users/notifications", icon: Bell },
  { name: "Profile", href: "/users/profile", icon: User },
  { name: "Settings", href: "/users/settings", icon: Settings },
]

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ className, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await apiClient.logout()
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout failed:", error)
      apiClient.clearToken()
      window.location.href = "/login"
    }
  }

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center border-b", isCollapsed && !isMobile ? "px-2" : "px-6")}>
        <Link href="/users" className="flex items-center space-x-2">
          {/* <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div> */}
          {(!isCollapsed || isMobile) && <span className="font-bold text-xl sidebar-text">MAMA-SCAN</span>}
        </Link>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className={cn("ml-auto h-6 w-6", isCollapsed && "ml-2")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <ScrollArea className={cn("flex-1 py-4", isCollapsed && !isMobile ? "px-2" : "px-3")}>
        <nav className="space-y-2">
          <TooltipProvider>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const NavItem = (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "sidebar-text hover:bg-accent hover:text-accent-foreground",
                    isCollapsed && !isMobile ? "justify-center" : "space-x-3",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {(!isCollapsed || isMobile) && <span>{item.name}</span>}
                </Link>
              )

              if (isCollapsed && !isMobile) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return NavItem
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <div className={cn("border-t p-4", isCollapsed && !isMobile && "p-2")}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className={cn(
                  "w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950",
                  isCollapsed && !isMobile ? "justify-center px-2" : "justify-start",
                )}
              >
                <LogOut className="h-4 w-4" />
                {(!isCollapsed || isMobile) && <span className="ml-2">Sign Out</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && !isMobile && (
              <TooltipContent side="right">
                <p>Sign Out</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 sidebar-primary transition-all duration-300",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          className,
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 sidebar-primary">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>
    </>
  )
}
