import type { Metadata } from "next"
import AdminDashboard from "../components/AdminDashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard | PropertyFinder",
  description: "Manage properties and users",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}

