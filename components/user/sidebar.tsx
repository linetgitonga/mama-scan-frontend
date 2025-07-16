"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/users", icon: Home },
  { name: "Chatbot", href: "/users/chatbot", icon: MessageSquare },
  { name: "My Screenings", href: "/users/screenings", icon: Activity },
  { name: "Appointments", href: "/users/appointments", icon: Calendar },
  { name: "Referrals", href: "/users/referrals", icon: FileText },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Payments", href: "/users/payments", icon: CreditCard },
  { name: "Notifications", href: "/users/notifications", icon: Bell },
  { name: "Profile", href: "/users/profile", icon: User },
  { name: "Settings", href: "/users/settings", icon: Settings },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/users" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">MS</span>
          </div>
          <span className="font-bold text-xl sidebar-text">MamaScan</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "sidebar-text hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 sidebar-primary", className)}>
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
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
