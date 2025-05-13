"use client"

import Link from "next/link"
import SearchBar from "./components/SearchBar"
import FeaturedProperties from "./components/FeaturedProperties"
import { useTranslation } from "./context/TranslationContext"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t("findYourDreamProperty")}</h1>
      <SearchBar />
      <FeaturedProperties />
      <div className="text-center mt-12">
        <Link
          href="/listings"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          {t("viewAllListings")}
        </Link>
      </div>
    </div>
  )
}

