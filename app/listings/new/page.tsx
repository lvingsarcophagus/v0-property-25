"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "../../context/TranslationContext"
import { useAuth } from "../../context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewListingPage() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [listingType, setListingType] = useState<"sell" | "rent">("sell")
  const [showAddressInfo, setShowAddressInfo] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(["/placeholder.svg?height=200&width=300"])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: "",
    propertyType: "apartment",
    // Address
    city: "",
    cityPart: "",
    street: "",
    houseNumber: "",
    // Building info
    yearBuilt: "",
    totalFloors: "",
    buildingMaterial: "",
    // Property specs
    heatingType: "",
    floor: "",
    rooms: "",
    area: "",
    // Pricing
    salePrice: "",
    rentPrice: "",
    ownerInvoice: false,
    renterInvoice: false,
    // Description
    description: "",
    amenities: [""] as string[],
  })

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            You need to be logged in to add a new listing. Please log in to continue.
          </p>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAddressLookup = () => {
    // In a real app, this would be an API call to get building information
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      setShowAddressInfo(true)
      setFormData((prev) => ({
        ...prev,
        yearBuilt: "2010",
        totalFloors: "5",
        buildingMaterial: "Brick",
      }))
      toast({
        title: "Address information found",
        description: "Building details have been automatically filled",
      })
    }, 1000)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // In a real app, you would upload these to a server
      // For demo purposes, we'll use local URLs
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedPhotos((prev) => [...prev, ...newPhotos])
      toast({
        title: "Photos uploaded",
        description: `${files.length} photo(s) added to your listing`,
      })
    }
  }

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, ""],
    }))
  }

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...formData.amenities]
    newAmenities[index] = value
    setFormData((prev) => ({
      ...prev,
      amenities: newAmenities,
    }))
  }

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    console.log("Submitting new listing:", {
      ...formData,
      listingType,
      photos: uploadedPhotos,
    })

    toast({
      title: "Listing created successfully",
      description: "Your new property listing has been created",
    })

    // Redirect to listings page after successful submission
    setTimeout(() => {
      router.push("/listings")
    }, 1500)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />
      <div className="mb-6">
        <Link href="/listings" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToListings")}
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Property Listing</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Modern Apartment in City Center"
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, propertyType: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>

                  <div>
                    <Label>Listing Type</Label>
                    <RadioGroup
                      defaultValue={listingType}
                      onValueChange={(value) => setListingType(value as "sell" | "rent")}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sell" id="sell" />
                        <Label htmlFor="sell">For Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent">For Rent</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Property Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Vilnius"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cityPart">City Part</Label>
                      <Input
                        id="cityPart"
                        name="cityPart"
                        value={formData.cityPart}
                        onChange={handleInputChange}
                        placeholder="e.g. City Center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="street">Street</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="e.g. Gedimino Avenue"
                      />
                    </div>
                    <div>
                      <Label htmlFor="houseNumber">House/Flat Number</Label>
                      <Input
                        id="houseNumber"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 15A"
                      />
                    </div>
                  </div>

                  <Button type="button" onClick={handleAddressLookup} className="mt-4">
                    Lookup Address Info
                  </Button>

                  {showAddressInfo && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <h3 className="text-md font-medium mb-3">Building Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="yearBuilt">Year Built</Label>
                          <Input
                            id="yearBuilt"
                            name="yearBuilt"
                            value={formData.yearBuilt}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="totalFloors">Total Floors</Label>
                          <Input
                            id="totalFloors"
                            name="totalFloors"
                            value={formData.totalFloors}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="buildingMaterial">Building Material</Label>
                          <Input
                            id="buildingMaterial"
                            name="buildingMaterial"
                            value={formData.buildingMaterial}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Property Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Property Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heatingType">Heating Type</Label>
                      <Input
                        id="heatingType"
                        name="heatingType"
                        value={formData.heatingType}
                        onChange={handleInputChange}
                        placeholder="e.g. Central, Gas, Electric"
                      />
                    </div>
                    <div>
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        name="floor"
                        type="number"
                        value={formData.floor}
                        onChange={handleInputChange}
                        placeholder="e.g. 3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Number of Rooms</Label>
                      <Input
                        id="rooms"
                        name="rooms"
                        type="number"
                        value={formData.rooms}
                        onChange={handleInputChange}
                        placeholder="e.g. 3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area (m²)</Label>
                      <Input
                        id="area"
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="e.g. 75"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Amenities</Label>
                    <div className="space-y-2 mt-2">
                      {formData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={amenity}
                            onChange={(e) => handleAmenityChange(index, e.target.value)}
                            placeholder="e.g. Elevator, Parking, Balcony"
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveAmenity(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={handleAddAmenity} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Amenity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salePrice">Sale Price (€)</Label>
                      <Input
                        id="salePrice"
                        name="salePrice"
                        type="number"
                        value={formData.salePrice}
                        onChange={handleInputChange}
                        placeholder="e.g. 250000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rentPrice">Rent Price (€/month)</Label>
                      <Input
                        id="rentPrice"
                        name="rentPrice"
                        type="number"
                        value={formData.rentPrice}
                        onChange={handleInputChange}
                        placeholder="e.g. 1200"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Invoice Options</Label>
                    <div className="flex flex-col space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ownerInvoice"
                          checked={formData.ownerInvoice}
                          onCheckedChange={(checked) => handleCheckboxChange("ownerInvoice", checked as boolean)}
                        />
                        <Label htmlFor="ownerInvoice">Invoice from owner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="renterInvoice"
                          checked={formData.renterInvoice}
                          onCheckedChange={(checked) => handleCheckboxChange("renterInvoice", checked as boolean)}
                        />
                        <Label htmlFor="renterInvoice">Invoice from renters</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Property Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-40 w-full rounded-md overflow-hidden">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Property photo ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemovePhoto(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div
                      className="h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-muted-foreground">Upload Photos</span>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload high-quality photos of your property. You can upload multiple photos at once.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Description Tab */}
            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Property Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your property in detail. Include key features, recent renovations, neighborhood information, etc."
                      className="min-h-[200px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={() => router.push("/listings")}>
              Cancel
            </Button>
            <Button type="submit">Create Listing</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

