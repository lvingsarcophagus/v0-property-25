"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { UserCircle, Home, List, LayoutDashboard, Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "./LanguageSelector"
import { useTranslation } from "../context/TranslationContext"
import { useAuth } from "../context/AuthContext"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { t } = useTranslation()
  const { isAuthenticated, user, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    // Close mobile menu if open
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 shadow-sm"
          : "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50",
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Home className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-primary">PropertyFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-foreground/70 hover:text-primary transition-colors relative group py-1">
              {t("home")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/listings"
              className="text-foreground/70 hover:text-primary transition-colors relative group py-1"
            >
              {t("listings")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-foreground/70 hover:text-primary transition-colors relative group py-1"
              >
                {t("dashboard")}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />

            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <UserCircle className="w-5 h-5" />
                      <span className="max-w-[100px] truncate">{user?.name || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all"
                    asChild
                  >
                    <Link href="/login">
                      <UserCircle className="w-5 h-5 mr-2" />
                      {t("login")}
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 transition-all" asChild>
                    <Link href="/signup">{t("signup")}</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-4 border-t border-border/40 animate-in slide-in-from-top duration-300">
            <Link
              href="/"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 text-primary" />
              <span>{t("home")}</span>
            </Link>
            <Link
              href="/listings"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <List className="h-5 w-5 text-primary" />
              <span>{t("listings")}</span>
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5 text-primary" />
                <span>{t("dashboard")}</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/profile"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 text-primary" />
                <span>My Profile</span>
              </Link>
            )}

            <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
              {isAuthenticated ? (
                <Button variant="destructive" onClick={handleLogout} className="justify-start">
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/login">
                      <UserCircle className="w-5 h-5 mr-2" />
                      {t("login")}
                    </Link>
                  </Button>
                  <Button variant="default" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/signup">{t("signup")}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

