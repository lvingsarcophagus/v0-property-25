"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card" // Import Card

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", { location, category, propertyType, priceRange })
    // Redirect to results page with query parameters
    router.push(
      `/results?location=${location}&category=${category}&propertyType=${propertyType}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`,
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      price,
    )
  }

  return (
    <Card className="p-6 rounded-lg shadow-md"> {/* Use Card for theming */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger id="propertyType">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-full space-y-2">
            <Label htmlFor="minPrice">Minimum Price</Label>
            <Input
              id="minPrice"
              type="number"
              min={0}
              max={1000000}
              step={1000}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
            />
          </div>
          <div className="col-span-full space-y-2">
            <Label htmlFor="maxPrice">Maximum Price</Label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              max={1000000}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          <Search className="mr-2" />
          Search Properties
        </Button>
      </form>
    </Card>
  )
}

