"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, GraduationCap, Users, ClipboardList, Upload, Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Department Management",
      href: "/admin/departments",
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Program Management",
      href: "/admin/programs",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Faculty Management",
      href: "/admin/faculty",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Appraisal Structure",
      href: "/admin/appraisals",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Mandatory Uploads",
      href: "/admin/uploads",
      icon: <Upload className="h-5 w-5" />,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Sahyadri College of Engineering and Management</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background pt-16 md:hidden">
            <nav className="grid gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <span className="text-lg font-semibold">Sahyadri College</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@college.edu</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <Link href="/login">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-4 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

