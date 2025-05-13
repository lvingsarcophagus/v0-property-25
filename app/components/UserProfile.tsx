"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import ListingGrid from "./ListingGrid"

interface UserProfileProps {
  user: {
    id: number
    name: string
    type: "user" | "agency"
    rating: number
  }
}

export default function UserProfile({ user }: UserProfileProps) {
  const [rating, setRating] = useState(user.rating)

  const handleRate = (newRating: number) => {
    // In a real application, you would send this rating to your backend
    setRating(newRating)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.type === "user" ? "Individual User" : "Real Estate Agency"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                onClick={() => handleRate(star)}
              />
            ))}
            <span>({rating.toFixed(1)})</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="sold">Sold Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ListingGrid
            filters={
              {
                /* Add filters for active listings */
              }
            }
          />
        </TabsContent>
        <TabsContent value="sold">
          <ListingGrid
            filters={
              {
                /* Add filters for sold properties */
              }
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

