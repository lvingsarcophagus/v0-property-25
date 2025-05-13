"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "../context/TranslationContext"
import type { Language } from "../translations"
import { cn } from "@/lib/utils"

type LanguageOption = {
  code: Language
  name: string
  flag: string
  nativeName: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Only run on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="flex items-center gap-1">
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline-block">🇬🇧 English</span>
        <span className="md:hidden">🇬🇧</span>
      </Button>
    )
  }

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (lang: LanguageOption) => {
    console.log("Changing language to:", lang.code)
    setLanguage(lang.code)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:bg-primary/10 transition-all">
          <Globe className="h-4 w-4 text-primary" />
          <span className="hidden md:inline-block">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="md:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            className={cn(
              "cursor-pointer flex items-center py-2 px-3 hover:bg-primary/10 transition-colors",
              lang.code === language && "bg-primary/5 font-medium",
            )}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <div className="flex flex-col">
              <span>{lang.name}</span>
              <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

