"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
  ArrowLeft,
  MapPin,
  Thermometer,
  Ruler,
  BedDouble,
  Plus,
  FileText,
  User,
  Phone,
  MessageSquare,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "../../context/TranslationContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAuth } from "../../context/AuthContext"

// This would typically come from an API or database
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    images: ["/images/studio1.jpg", "/images/studio2.jpg"],
    price: 250000,
    rentPrice: 1200,
    currency: "EUR",
    category: "sale",
    city: "Vilnius",
    cityPart: "City Center",
    street: "Gedimino Avenue",
    houseNumber: "15A",
    heatingType: "Central",
    floor: 3,
    totalFloors: 5,
    rooms: 3,
    size: 75,
    sizeUnit: "sqm",
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
    currency: "EUR",
    category: "sale",
    city: "Kaunas",
    cityPart: "Žaliakalnis",
    street: "Savanorių Avenue",
    houseNumber: "42",
    heatingType: "Gas",
    floor: 1,
    totalFloors: 2,
    rooms: 5,
    size: 180,
    sizeUnit: "sqm",
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
    currency: "EUR",
    category: "sale",
    city: "Klaipėda",
    cityPart: "Old Town",
    street: "Danės Street",
    houseNumber: "7",
    heatingType: "Underfloor",
    floor: 6,
    totalFloors: 6,
    rooms: 4,
    size: 120,
    sizeUnit: "sqm",
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

interface PropertyDetailsPageProps {
  params: { id: string }
}

export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [propertyData, setPropertyData] = useState<any>(null)
  const [addressInfo, setAddressInfo] = useState({
    city: "",
    cityPart: "",
    street: "",
    houseNumber: "",
  })
  const [showAddressInfo, setShowAddressInfo] = useState(false)
  const [listingType, setListingType] = useState<"sell" | "rent">("sell")

  useEffect(() => {
    const property = properties.find((p) => p.id === params.id) || properties[0]
    setPropertyData(property)
    setAddressInfo({
      city: property.city,
      cityPart: property.cityPart,
      street: property.street,
      houseNumber: property.houseNumber,
    })
  }, [params.id])

  if (!propertyData) {
    return <div>Loading...</div>
  }

  const handleAddressLookup = () => {
    setTimeout(() => {
      setShowAddressInfo(true)
      toast({
        title: "Address information found",
        description: "Building details have been automatically filled",
      })
    }, 1000)
  }

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index)
  }

  const handlePropertyTypeChange = (value: "sell" | "rent") => {
    setListingType(value)
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={propertyData.images[activeImageIndex] || "/placeholder.svg"}
              alt={propertyData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <Badge className="absolute top-4 right-4 text-sm px-3 py-1">
              {propertyData.category === "sale" ? t("forSale") : t("forRent")}
            </Badge>
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {propertyData.images.map((image: string, index: number) => (
              <div
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${activeImageIndex === index ? "border-primary" : "border-transparent"}`}
                onClick={() => handleImageChange(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
            {isAuthenticated && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="h-20 w-20 flex-shrink-0 cursor-pointer rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Photos</DialogTitle>
                    <DialogDescription>Add new photos to this property listing</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="photos">Select Photos</Label>
                    <Input id="photos" type="file" multiple accept="image/*" />
                    <p className="text-sm text-muted-foreground">
                      You can upload multiple photos at once. Maximum 10 photos allowed.
                    </p>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{propertyData.title}</h1>
          <div className="flex items-center text-xl font-semibold text-primary mb-6">
            {listingType === "sell" ? (
              <>€{propertyData.price.toLocaleString()}</>
            ) : (
              <>€{propertyData.rentPrice.toLocaleString()}/month</>
            )}
            {isAuthenticated && (
              <div className="ml-4">
                <RadioGroup
                  defaultValue={listingType}
                  onValueChange={(value) => handlePropertyTypeChange(value as "sell" | "rent")}
                  className="flex space-x-4"
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
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center p-4">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("location")}</p>
                  <p className="font-medium">{propertyData.city}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <BedDouble className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("rooms")}</p>
                  <p className="font-medium">{propertyData.rooms}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Ruler className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("area")}</p>
                  <p className="font-medium">{propertyData.size} m²</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <Thermometer className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("heating")}</p>
                  <p className="font-medium">{propertyData.heatingType}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="details" className="mb-8">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="owner">Owner Info</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Property Details</h2>

                  {isAuthenticated && (
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="text-md font-medium mb-2">Address Lookup</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={addressInfo.city}
                            onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cityPart">City Part</Label>
                          <Input
                            id="cityPart"
                            value={addressInfo.cityPart}
                            onChange={(e) => setAddressInfo({ ...addressInfo, cityPart: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="street">Street</Label>
                          <Input
                            id="street"
                            value={addressInfo.street}
                            onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="houseNumber">House/Flat Number</Label>
                          <Input
                            id="houseNumber"
                            value={addressInfo.houseNumber}
                            onChange={(e) => setAddressInfo({ ...addressInfo, houseNumber: e.target.value })}
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddressLookup}>Lookup Address Info</Button>

                      {showAddressInfo && (
                        <div className="mt-4 p-4 bg-background rounded-lg border">
                          <h4 className="text-sm font-medium mb-2">Building Information</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="yearBuilt">Year Built</Label>
                              <Input id="yearBuilt" defaultValue={propertyData.yearBuilt} />
                            </div>
                            <div>
                              <Label htmlFor="totalFloors">Total Floors</Label>
                              <Input id="totalFloors" defaultValue={propertyData.totalFloors} />
                            </div>
                            <div>
                              <Label htmlFor="buildingMaterial">Building Material</Label>
                              <Input id="buildingMaterial" defaultValue={propertyData.buildingMaterial} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-md font-medium mb-3">Location</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City:</span>
                          <span>{propertyData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City Part:</span>
                          <span>{propertyData.cityPart}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Street:</span>
                          <span>{propertyData.street}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">House/Flat Number:</span>
                          <span>{propertyData.houseNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-medium mb-3">Property Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Property Type:</span>
                          <span className="capitalize">{propertyData.propertyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year Built:</span>
                          <span>{propertyData.yearBuilt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Building Material:</span>
                          <span>{propertyData.buildingMaterial}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Floor:</span>
                          <span>
                            {propertyData.floor} of {propertyData.totalFloors}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isAuthenticated && (
                      <div className="md:col-span-2">
                        <h3 className="text-md font-medium mb-3">Property Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="heatingType">Heating Type</Label>
                            <Input id="heatingType" defaultValue={propertyData.heatingType} />
                          </div>
                          <div>
                            <Label htmlFor="floor">Floor</Label>
                            <Input id="floor" type="number" defaultValue={propertyData.floor} />
                          </div>
                          <div>
                            <Label htmlFor="rooms">Room Number</Label>
                            <Input id="rooms" type="number" defaultValue={propertyData.rooms} />
                          </div>
                          <div>
                            <Label htmlFor="area">Area (m²)</Label>
                            <Input id="area" type="number" defaultValue={propertyData.size} />
                          </div>
                        </div>
                      </div>
                    )}

                    {isAuthenticated && (
                      <div className="md:col-span-2">
                        <h3 className="text-md font-medium mb-3">Invoice Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="ownerInvoice"
                              defaultChecked={propertyData.ownerInvoice}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="ownerInvoice">Invoice from owner</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="renterInvoice"
                              defaultChecked={propertyData.renterInvoice}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="renterInvoice">Invoice from renters</Label>
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="price">Price (for {listingType === "sell" ? "sale" : "rent"})</Label>
                            <Input
                              id="price"
                              type="number"
                              defaultValue={listingType === "sell" ? propertyData.price : propertyData.rentPrice}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description">
              <Card>
                <CardContent className="p-6">
                  {isAuthenticated ? (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Description</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/property/${params.id}/edit`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Property
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                  )}
                  <p className="text-muted-foreground whitespace-pre-line">{propertyData.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {propertyData.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {isAuthenticated && (
                    <div className="mt-6">
                      <Label htmlFor="newAmenity">Add Amenity</Label>
                      <div className="flex mt-2">
                        <Input id="newAmenity" placeholder="Enter amenity" className="mr-2" />
                        <Button>Add</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="owner">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Owner Information</h2>

                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ownerName">Name</Label>
                        <Input id="ownerName" defaultValue={propertyData.owner.name} />
                      </div>
                      <div>
                        <Label htmlFor="ownerPhone">Phone Number</Label>
                        <Input id="ownerPhone" defaultValue={propertyData.owner.phone} />
                      </div>
                      <div>
                        <Label htmlFor="ownerEmail">Email</Label>
                        <Input id="ownerEmail" defaultValue={propertyData.owner.email} />
                      </div>
                      <div>
                        <Label htmlFor="ownerDescription">Description</Label>
                        <Textarea
                          id="ownerDescription"
                          defaultValue={propertyData.owner.description}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">{propertyData.owner.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">{propertyData.owner.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t("propertyDetails")}</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">{t("location")}</h3>
                  <p className="font-medium">
                    {propertyData.city}, {propertyData.cityPart}
                  </p>
                  <p>
                    {propertyData.street}, {propertyData.houseNumber}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("floor")}</h3>
                    <p>
                      {propertyData.floor} of {propertyData.totalFloors}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("rooms")}</h3>
                    <p>{propertyData.rooms}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("area")}</h3>
                    <p>{propertyData.area} m²</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("heating")}</h3>
                    <p>{propertyData.heatingType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("yearBuilt")}</h3>
                    <p>{propertyData.yearBuilt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{t("type")}</h3>
                    <p className="capitalize">{propertyData.propertyType}</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{t("contactBroker")}</h3>
                  <p className="font-medium">{propertyData.owner.name}</p>
                  <p className="text-sm">{propertyData.owner.phone}</p>
                  <p className="text-sm">{propertyData.owner.email}</p>

                  <div className="mt-4 space-y-2">
                    <Button className="w-full">{t("contactBroker")}</Button>
                    <Button variant="outline" className="w-full">
                      {t("scheduleViewing")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

