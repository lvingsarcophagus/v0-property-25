"use client"

import ListingGrid from "../components/ListingGrid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../context/TranslationContext"

export default function ListingsPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("propertyListings")}</h1>
      <div className="flex gap-4 mb-8">
        <Input placeholder={t("searchProperties")} className="flex-grow" />
        <Button>{t("searchProperties")}</Button>
      </div>
      <ListingGrid />
    </div>
  )
}

