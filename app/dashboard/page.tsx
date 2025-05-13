"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EnhancedUserDashboard from "../components/EnhancedUserDashboard"
import LoadingAnimation from "../components/LoadingAnimation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    // Add a slight delay to show the loading animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            You need to be logged in to view the dashboard. Please log in to continue.
          </p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back, {user?.name || "User"}</p>
      <EnhancedUserDashboard />
    </div>
  )
}

