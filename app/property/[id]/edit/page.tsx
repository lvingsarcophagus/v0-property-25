"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
import { useTranslation } from "../../../context/TranslationContext"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Checkbox } from "@/components/ui/checkbox"

// This would typically come from an API or database
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    images: ["/images/studio1.jpg", "/images/studio2.jpg"],
    price: 250000,
    rentPrice: 1200,
    category: "sale",
    city: "Vilnius",
    cityPart: "City Center",
    street: "Gedimino Avenue",
    houseNumber: "15A",
    heatingType: "Central",
    floor: 3,
    totalFloors: 5,
    rooms: 3,
    area: 75,
    description:
      "This beautiful modern apartment is located in the heart of the city. It features high ceilings, large windows that allow plenty of natural light, and a recently renovated kitchen with high-end appliances. The building has an elevator and secure parking. Perfect for professionals or small families looking for comfort and convenience in a central location.",
    amenities: ["Elevator", "Parking", "Balcony", "Security System"],
    yearBuilt: 2015,
    buildingMaterial: "Brick",
    propertyType: "apartment",
    status: "available",
    ownerInvoice: true,
    renterInvoice: true,
    owner: {
      name: "John Smith",
      phone: "+370 612 34567",
      email: "john@propertyfinder.com",
      description:
        "Experienced property owner with multiple listings in the city center area. Quick to respond and flexible with viewing times.",
    },
  },
  {
    id: "2",
    title: "Spacious Family Home",
    images: ["/images/studio2.jpg", "/images/studio3.jpg"],
    price: 450000,
    rentPrice: 2500,
    category: "sale",
    city: "Kaunas",
    cityPart: "Žaliakalnis",
    street: "Savanorių Avenue",
    houseNumber: "42",
    heatingType: "Gas",
    floor: 1,
    totalFloors: 2,
    rooms: 5,
    area: 180,
    description:
      "A spacious family home in a quiet neighborhood with excellent schools nearby. The property features a large garden, a double garage, and a newly renovated kitchen. The living room has a fireplace, perfect for cozy family gatherings. The master bedroom has an en-suite bathroom and a walk-in closet. The basement is fully finished and can be used as a home office or entertainment area.",
    amenities: ["Garden", "Garage", "Fireplace", "Basement"],
    yearBuilt: 2008,
    buildingMaterial: "Wood and Brick",
    propertyType: "house",
    status: "available",
    ownerInvoice: true,
    renterInvoice: false,
    owner: {
      name: "Sarah Johnson",
      phone: "+370 698 76543",
      email: "sarah@propertyfinder.com",
      description:
        "Local homeowner with deep knowledge of the neighborhood. Maintains properties to a high standard and is always available for questions.",
    },
  },
  {
    id: "3",
    title: "Luxury Condo with Ocean View",
    images: ["/images/studio3.jpg", "/images/studio4.jpg"],
    price: 750000,
    rentPrice: 3500,
    category: "sale",
    city: "Klaipėda",
    cityPart: "Old Town",
    street: "Danės Street",
    houseNumber: "7",
    heatingType: "Underfloor",
    floor: 6,
    totalFloors: 6,
    rooms: 4,
    area: 120,
    description:
      "Exclusive penthouse apartment with panoramic views of the Baltic Sea. This luxury condo features high-end finishes throughout, including marble countertops, hardwood floors, and designer fixtures. The open-concept living area is perfect for entertaining, with floor-to-ceiling windows that showcase the stunning sea views. The building offers 24/7 security, a fitness center, and a rooftop terrace.",
    amenities: ["Sea View", "Terrace", "Gym", "24/7 Security"],
    yearBuilt: 2020,
    buildingMaterial: "Concrete",
    propertyType: "apartment",
    status: "available",
    ownerInvoice: true,
    renterInvoice: true,
    owner: {
      name: "Michael Brown",
      phone: "+370 655 12345",
      email: "michael@propertyfinder.com",
      description:
        "Professional real estate investor with a portfolio of luxury properties. Provides premium service to all tenants and buyers.",
    },
  },
]

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const resolvedParams = React.use(params)
  const propertyId = resolvedParams.id
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [listingType, setListingType] = useState<"sell" | "rent">("sell")
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
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
    amenities: [] as string[],
    // Owner info
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerDescription: "",
  })

  // Load property data
  useEffect(() => {
    // In a real app, you would fetch the property data based on the id
    const property = properties.find((p) => p.id === params.id)

    if (property) {
      setUploadedPhotos(property.images)
      setListingType(property.category === "sale" ? "sell" : "rent")
      setFormData({
        title: property.title,
        propertyType: property.propertyType,
        city: property.city,
        cityPart: property.cityPart,
        street: property.street,
        houseNumber: property.houseNumber,
        yearBuilt: property.yearBuilt.toString(),
        totalFloors: property.totalFloors.toString(),
        buildingMaterial: property.buildingMaterial,
        heatingType: property.heatingType,
        floor: property.floor.toString(),
        rooms: property.rooms.toString(),
        area: property.area.toString(),
        salePrice: property.price.toString(),
        rentPrice: property.rentPrice.toString(),
        ownerInvoice: property.ownerInvoice,
        renterInvoice: property.renterInvoice,
        description: property.description,
        amenities: property.amenities,
        ownerName: property.owner.name,
        ownerPhone: property.owner.phone,
        ownerEmail: property.owner.email,
        ownerDescription: property.owner.description,
      })
    }
  }, [params.id])

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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
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
    console.log("Updating property:", {
      ...formData,
      listingType,
      photos: uploadedPhotos,
    })

    toast({
      title: "Property updated successfully",
      description: "Your property listing has been updated",
    })

    // Redirect to property page after successful submission
    setTimeout(() => {
      router.push(`/property/${params.id}`)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />
      <div className="mb-6">
        <Link href={`/property/${params.id}`} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Property
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Property Listing</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="details">Property Details</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="owner">Owner Info</TabsTrigger>
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

            {/* Owner Info Tab */}
            <TabsContent value="owner">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone">Phone Number</Label>
                    <Input id="ownerPhone" name="ownerPhone" value={formData.ownerPhone} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="ownerEmail">Email</Label>
                    <Input
                      id="ownerEmail"
                      name="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerDescription">Description</Label>
                    <Textarea
                      id="ownerDescription"
                      name="ownerDescription"
                      value={formData.ownerDescription}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={() => router.push(`/property/${params.id}`)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

