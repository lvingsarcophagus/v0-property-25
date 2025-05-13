"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, Mail, Phone, MapPin, Camera, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "../context/TranslationContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import UserProfile from "../../components/UserProfile"

// Mock user data - in a real app, this would come from your backend
const mockUserData = {
  name: "John Smith",
  email: "john@example.com",
  phone: "+370 612 34567",
  address: "Vilnius, Lithuania",
  bio: "Real estate professional with over 10 years of experience in the Lithuanian property market. Specializing in residential properties in Vilnius and surrounding areas.",
  profilePicture: "/placeholder.svg?height=200&width=200",
  listings: 5,
  viewsThisMonth: 320,
  inquiriesThisMonth: 15,
}

// This would typically come from an API or database
const user = {
  id: 1,
  name: "John Doe",
  type: "user" as const,
  rating: 4.5,
  profilePicture: "/images/agent1.jpg",
}

export default function ProfilePage() {
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(true) // Start in edit mode by default
  const [editedData, setEditedData] = useState(mockUserData)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Will redirect in the useEffect
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For demo purposes, we'll use a local URL
      const imageUrl = URL.createObjectURL(file)
      setEditedData((prev) => ({ ...prev, profilePicture: imageUrl }))
    }
  }

  const handleSaveChanges = () => {
    setUserData(editedData)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })
  }

  const handleCancelEdit = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 group">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden">
                      <Image
                        src={isEditing ? editedData.profilePicture : userData.profilePicture || "/placeholder.svg"}
                        alt="Profile picture"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {isEditing && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-8 w-8 text-white" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                        />
                      </div>
                    )}
                  </div>

                  <h2 className="text-xl font-bold">{isEditing ? editedData.name : userData.name}</h2>
                  <p className="text-muted-foreground">{isEditing ? editedData.email : userData.email}</p>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" onClick={handleSaveChanges}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-primary mr-3" />
                    <span>{isEditing ? editedData.name : userData.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>{isEditing ? editedData.email : userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>{isEditing ? editedData.phone : userData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>{isEditing ? editedData.address : userData.address}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold">{userData.listings}</p>
                    <p className="text-xs text-muted-foreground">Listings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.viewsThisMonth}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.inquiriesThisMonth}</p>
                    <p className="text-xs text-muted-foreground">Inquiries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile / Activity */}
          <div className="md:col-span-2">
            <Tabs defaultValue="edit">
              <TabsList className="mb-4">
                <TabsTrigger value="edit">Edit Profile</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
              </TabsList>

              <TabsContent value="edit">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={editedData.name} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={editedData.phone} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={editedData.address} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={editedData.bio}
                          onChange={handleInputChange}
                          className="min-h-[150px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start p-3 rounded-lg bg-muted">
                        <div className="mr-3 bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Profile updated</p>
                          <p className="text-sm text-muted-foreground">You updated your profile information</p>
                          <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start p-3 rounded-lg bg-muted">
                        <div className="mr-3 bg-primary/10 p-2 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Listing edited</p>
                          <p className="text-sm text-muted-foreground">You updated "Modern Apartment in Downtown"</p>
                          <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start p-3 rounded-lg bg-muted">
                        <div className="mr-3 bg-primary/10 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">New inquiry</p>
                          <p className="text-sm text-muted-foreground">
                            You received an inquiry about "Spacious Family Home"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Property Listings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 rounded-lg border">
                        <div>
                          <h3 className="font-medium">Modern Apartment in Downtown</h3>
                          <p className="text-sm text-muted-foreground">Vilnius, City Center</p>
                          <p className="text-sm font-medium text-primary">$250,000</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/1">View</a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/1/edit">Edit</a>
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg border">
                        <div>
                          <h3 className="font-medium">Spacious Family Home</h3>
                          <p className="text-sm text-muted-foreground">Kaunas, Žaliakalnis</p>
                          <p className="text-sm font-medium text-primary">$450,000</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/2">View</a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/2/edit">Edit</a>
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg border">
                        <div>
                          <h3 className="font-medium">Cozy Studio Apartment</h3>
                          <p className="text-sm text-muted-foreground">Vilnius, Old Town</p>
                          <p className="text-sm font-medium text-primary">$1,200/month</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/4">View</a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href="/property/4/edit">Edit</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button asChild>
                        <a href="/listings/new">Add New Listing</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

