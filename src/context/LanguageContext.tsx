"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations.en;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("fa");

  useEffect(() => {
    const saved = localStorage.getItem("abehayat-lang") as Language | null;
    if (saved === "en" || saved === "fa") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "fa" : "en";
    setLang(next);
    localStorage.setItem("abehayat-lang", next);
  };

  const isRTL = lang === "fa";
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-persian" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
