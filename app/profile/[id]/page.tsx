import type { Metadata } from "next"
import UserProfile from "../../components/UserProfile"

export const metadata: Metadata = {
  title: "User Profile | PropertyFinder",
  description: "View user profile and listings",
}

// This would typically come from an API or database
const user = {
  id: 1,
  name: "John Doe",
  type: "user" as const,
  rating: 4.5,
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the user data based on the id
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <UserProfile user={user} />
    </div>
  )
}

