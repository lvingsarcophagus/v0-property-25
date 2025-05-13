import type { Metadata } from "next"
import ListingGrid from "../components/ListingGrid"
import SearchBar from "../components/SearchBar"

export const metadata: Metadata = {
  title: "Search Results | PropertyFinder",
  description: "View properties matching your search criteria",
}

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const filters = {
    location: searchParams.location as string,
    category: searchParams.category as string,
    postType: searchParams.postType as string,
    propertyType: searchParams.propertyType as string,
    minPrice: searchParams.minPrice ? Number.parseInt(searchParams.minPrice as string) : undefined,
    maxPrice: searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice as string) : undefined,
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="mb-8">
        <SearchBar />
      </div>
      <ListingGrid filters={filters} />
    </div>
  )
}

