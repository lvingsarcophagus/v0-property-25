"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, type TranslationKey, translations } from "../translations"

type TranslationContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Only run on client side
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "lt")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("preferredLanguage", language)
      document.documentElement.lang = language
    }
  }, [language, mounted])

  // Translation function
  const t = (key: TranslationKey): string => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  return <TranslationContext.Provider value={{ language, setLanguage, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  return context
}

