"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "../context/TranslationContext"
import { Card, CardContent } from "@/components/ui/card" // Import Card component

const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    image: "/images/studio1.jpg",
    price: "$250,000",
    location: "Downtown, City",
    beds: 2,
    baths: 2,
    sqft: 1200,
  },
  {
    id: 2,
    title: "Spacious Family Home",
    image: "/images/studio2.jpg",
    price: "$450,000",
    location: "Suburbs, City",
    beds: 4,
    baths: 3,
    sqft: 2500,
  },
  {
    id: 3,
    title: "Luxury Condo with Ocean View",
    image: "/images/studio3.jpg",
    price: "$750,000",
    location: "Beachfront, City",
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
]

export default function FeaturedProperties() {
  const { t } = useTranslation()

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{t("featuredProperties")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property) => (
          <Link
            href={`/property/${property.id}`}
            key={property.id}
            className="transition duration-300 hover:shadow-lg"
          >
            <Card className="overflow-hidden"> {/* Use Card component for theming */}
              <div className="relative h-48">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} layout="fill" objectFit="cover" />
              </div>
              <CardContent className="p-4"> {/* Use CardContent for theming */}
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-muted-foreground mb-2">{property.location}</p>
                <p className="text-primary font-bold mb-2">{property.price}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{property.beds} beds</span>
                  <span>{property.sqft} sqft</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

