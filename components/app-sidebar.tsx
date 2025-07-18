"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Users,
  UserCheck,
  TrendingUp,
  Settings,
  LogOut,
  Home,
  Plus,
  Search,
  Bell,
  User,
  Shield,
  Calendar,
  FileText,
  Heart,
  Brain,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Icon,

} from "lucide-react"

import { useAuth } from "../hooks/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "../components/ui/sidebar"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible"

// Navigation data
const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      badge: null,
    },
    {
      title: "Add Patients",
      url: "/patients/new",
      icon: Users,
      badge: "",
      // items: [
      //   {
      //     title: "All Patients",
      //     url: "/patients",
      //     icon: Users,
      //   },
      //   {
      //     title: "Add New Patient",
      //     url: "/patients/new",
      //     icon: Plus,
      //   },
      //   {
      //     title: "Search Patients",
      //     url: "/patients/search",
      //     icon: Search,
      //   },
      // ],
    },
    {
      title: "Screening",
      url: "/screening",
      icon: UserCheck,
      badge: "New",
      items: [
        {
          title: "New Screening",
          url: "/screening/new",
          icon: Plus,
        },
        {
          title: "Screening History",
          url: "/screening/history",
          icon: FileText,
        },
        {
          title: "Risk Assessment",
          url: "/screening/risk",
          icon: Brain,
        },
      ],
    },
    {
      title: "Referrals",
      url: "/referrals",
      icon: TrendingUp,
      badge: "47",
      items: [
        {
          title: "All Referrals",
          url: "/referrals",
          icon: TrendingUp,
        },
        {
          title: "Create New Referral",
          url: "/referrals/new",
          icon: Plus,
        },
        {
          title: "Pending",
          url: "/referrals/pending",
          icon: Calendar,
          badge: "12",
        },
        {
          title: "Completed",
          url: "/referrals/completed",
          icon: Shield,
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      badge: null,
    },
  ],
  secondary: [
    {
      title: "Health Resources",
      items: [
        {
          title: "Guidelines",
          url: "/resources/guidelines",
          icon: FileText,
        },
        {
          title: "Training Materials",
          url: "/resources/training",
          icon: Heart,
        },
        
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
        
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [openGroups, setOpenGroups] = React.useState<string[]>(["Patients", "Screening", "Referrals"])

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => (prev.includes(groupTitle) ? prev.filter((g) => g !== groupTitle) : [...prev, groupTitle]))
  }

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(url)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-blue-600 dark:text-blue-400">MAMA-SCAN</span>
                  <span className="truncate text-xs text-muted-foreground">AI-Powered Screening</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => {
                const Icon = item.icon
                const hasSubItems = item.items && item.items.length > 0
                const isGroupOpen = openGroups.includes(item.title)

                if (hasSubItems) {
                  return (
                    <Collapsible key={item.title} open={isGroupOpen} onOpenChange={() => toggleGroup(item.title)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive(item.url)} className="w-full">
                            <Icon className="size-4" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="ml-auto h-5 px-1.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            {isGroupOpen ? (
                              <ChevronDown className="ml-auto size-4" />
                            ) : (
                              <ChevronRight className="ml-auto size-4" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                              const SubIcon = subItem.icon
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                                    <Link href={subItem.url}>
                                      <SubIcon className="size-4" />
                                      <span>{subItem.title}</span>
                                      {subItem.badge && (
                                        <Badge
                                          variant="secondary"
                                          className="ml-auto h-4 px-1 text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                        >
                                          {subItem.badge}
                                        </Badge>
                                      )}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              )
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild isActive={isActive(item.url)}>
                      <Link href={item.url}>
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto h-5 px-1.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Secondary Navigation */}
        {navigationData.secondary.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title} asChild isActive={isActive(item.url)}>
                        <Link href={item.url}>
                          <Icon className="size-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="ml-auto h-5 px-1.5 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarSeparator />

        {/* Quick Actions */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="New Screening" asChild>
                  <Link href="/screening/new">
                    <Plus className="size-4" />
                    <span>New Screening</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Add Patient" asChild>
                  <Link href="/patients/new">
                    <User className="size-4" />
                    <span>Add Patient</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.username || "User"}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.user_type || "Healthcare Worker"}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notifications" className="cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                    {/* Add notification badge if needed */}
                  </Link>
                </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                  <Link href="/chatbot" className="cursor-pointer">
                    <Brain className="mr-2 h-4 w-4" />
                    Chatbot
                    {/* Add notification badge if needed */}
                  </Link>
                </DropdownMenuItem>




                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
