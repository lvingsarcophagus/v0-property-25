"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const listings = [
  { id: 1, title: "Modern Apartment", status: "Active" },
  { id: 2, title: "Cozy House", status: "Pending" },
  { id: 3, title: "Luxury Condo", status: "Active" },
]

export default function DashboardContent() {
  const [favorites] = useState([
    { id: 3, title: "Luxury Condo", price: "$500,000" },
    { id: 4, title: "Beachfront Villa", price: "$1,200,000" },
  ])

  return (
    <Tabs defaultValue="listings" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="listings">My Listings</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>
      <TabsContent value="listings">
        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Manage your property listings</CardDescription>
          </CardHeader>
          <CardContent>
            {listings.map((listing) => (
              <div key={listing.id} className="flex justify-between items-center mb-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">Status: {listing.status}</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            ))}
            <Button className="w-full mt-4">Add New Listing</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="favorites">
        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
            <CardDescription>Your saved properties</CardDescription>
          </CardHeader>
          <CardContent>
            {favorites.map((favorite) => (
              <div key={favorite.id} className="flex justify-between items-center mb-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{favorite.title}</h3>
                  <p className="text-sm text-muted-foreground">{favorite.price}</p>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

