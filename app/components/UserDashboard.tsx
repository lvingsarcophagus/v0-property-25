"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Upload } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock data for user's listings
const userListings = [
  {
    id: 1,
    title: "Modern Apartment",
    image: "/images/studio1.jpg",
    price: 250000,
    category: "sale",
    status: "approved",
    propertyType: "apartment",
  },
  {
    id: 2,
    title: "Cozy Studio",
    image: "/images/studio2.jpg",
    price: 1200,
    category: "rent",
    status: "pending",
    propertyType: "apartment",
  },
  {
    id: 3,
    title: "Family House",
    image: "/images/studio3.jpg",
    price: 450000,
    category: "sale",
    status: "approved",
    propertyType: "house",
  },
  {
    id: 4,
    title: "Commercial Space",
    image: "/images/studio4.jpg",
    price: 5000,
    category: "rent",
    status: "pending",
    propertyType: "commercial",
  },
]

// Mock data for visualization
const viewsData = [
  { name: "Jan", views: 400 },
  { name: "Feb", views: 300 },
  { name: "Mar", views: 500 },
  { name: "Apr", views: 280 },
  { name: "May", views: 590 },
  { name: "Jun", views: 320 },
]

export default function UserDashboard() {
  const [listings, setListings] = useState(userListings)
  const [selectedPropertyType, setSelectedPropertyType] = useState("all")
  const [editingListing, setEditingListing] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEdit = (listing: any) => {
    setEditingListing(listing)
  }

  const handleSaveEdit = (updatedListing: any) => {
    setListings(listings.map((listing) => (listing.id === updatedListing.id ? updatedListing : listing)))
    setEditingListing(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingListing({ ...editingListing, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const filteredListings = listings.filter(
    (listing) => selectedPropertyType === "all" || listing.propertyType === selectedPropertyType,
  )

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Listings</CardTitle>
          <CardDescription>Manage your property listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
            </TabsList>
            {["all", "sale", "rent"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredListings
                    .filter((listing) => category === "all" || listing.category === category)
                    .map((listing) => (
                      <Card key={listing.id}>
                        <CardContent className="p-0">
                          <div className="relative h-48">
                            <Image
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              layout="fill"
                              objectFit="cover"
                            />
                            <Badge
                              className="absolute top-2 right-2"
                              variant={listing.status === "approved" ? "default" : "secondary"}
                            >
                              {listing.status}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{listing.title}</h3>
                            <p className="text-sm text-gray-500">
                              ${listing.price.toLocaleString()}
                              {listing.category === "rent" ? "/month" : ""}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">{listing.propertyType}</p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => handleEdit(listing)}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Listing</DialogTitle>
                                  <DialogDescription>Make changes to your listing here.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                      Title
                                    </Label>
                                    <Input
                                      id="title"
                                      value={editingListing?.title}
                                      onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                      Price
                                    </Label>
                                    <Input
                                      id="price"
                                      type="number"
                                      value={editingListing?.price}
                                      onChange={(e) =>
                                        setEditingListing({ ...editingListing, price: Number(e.target.value) })
                                      }
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                      Status
                                    </Label>
                                    <Select
                                      value={editingListing?.status}
                                      onValueChange={(value) => setEditingListing({ ...editingListing, status: value })}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                      Image
                                    </Label>
                                    <div className="col-span-3">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        ref={fileInputRef}
                                      />
                                      <Button onClick={triggerFileInput} variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Image
                                      </Button>
                                    </div>
                                  </div>
                                  {editingListing?.image && (
                                    <div className="col-span-4">
                                      <Image
                                        src={editingListing.image || "/placeholder.svg"}
                                        alt="Property"
                                        width={300}
                                        height={200}
                                        objectFit="cover"
                                      />
                                    </div>
                                  )}
                                </div>
                                <Button onClick={() => handleSaveEdit(editingListing)}>Save changes</Button>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listing Views</CardTitle>
          <CardDescription>Monthly views for your listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listing Statistics</CardTitle>
          <CardDescription>Overview of your listing performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.filter((l) => l.status === "approved").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.filter((l) => l.status === "pending").length}</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

