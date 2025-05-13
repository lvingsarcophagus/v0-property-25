import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Profile | PropertyFinder",
  description: "View user profile and listings",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
