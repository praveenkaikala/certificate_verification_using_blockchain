"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    var loginStatus=false
    if(localStorage.getItem("token")) loginStatus=true
    const userRole = localStorage.getItem("role")

    setIsLogin(loginStatus)
    setRole(userRole)
  }, [pathname])

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path)

  /* =============================
     ROLE BASED NAVIGATION
  ============================== */

  const publicItems = [
    { label: "Verify", path: "/verify" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ]

  const adminItems = [
    { label: "Admin", path: "/admin" },
  ]

  const instituteItems = [
    { label: "Institute", path: "/institute" },
  ]

  const studentItems = [
    { label: "Student", path: "/student" },
  ]

  const getNavigationItems = () => {
    if (!isLogin) return publicItems

    switch (role) {
      case "admin":
        return [...adminItems,{ label: "Verify", path: "/verify" }]
      case "institute":
        return [...instituteItems,{ label: "Verify", path: "/verify" }]
      case "student":
        return [...studentItems,{ label: "Verify", path: "/verify" }]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg"></div>
            <span className="hidden sm:inline">ForgeryShield</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
