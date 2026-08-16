import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "ar";

type Messages = {
  home: string;
  portfolio: string;
  about: string;
  services: string;
  contact: string;
  control: string;
  switchLanguage: string;
  seniorDesigner: string;
  closeMenu: string;
  openMenu: string;
};

const messages: Record<Locale, Messages> = {
  en: {
    home: "Home",
    portfolio: "Portfolio",
    about: "About",
    services: "Services",
    contact: "Contact",
    control: "Control",
    switchLanguage: "Switch language",
    seniorDesigner: "Senior Graphic Designer",
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },
  ar: {
    home: "الرئيسية",
    portfolio: "الأعمال",
    about: "نبذة عني",
    services: "الخدمات",
    contact: "تواصل",
    control: "التحكم",
    switchLanguage: "تبديل اللغة",
    seniorDesigner: "مصمم جرافيك أول",
    closeMenu: "إغلاق القائمة",
    openMenu: "فتح القائمة",
  },
};

const LocaleContext = createContext<{ locale: Locale; dir: "ltr" | "rtl"; toggleLocale: () => void; t: Messages }>({
  locale: "en",
  dir: "ltr",
  toggleLocale: () => undefined,
  t: messages.en,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("emad-locale") === "ar" ? "ar" : "en";
  });
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("is-rtl", locale === "ar");
    window.localStorage.setItem("emad-locale", locale);
  }, [locale, dir]);

  const value = useMemo(() => ({ locale, dir, toggleLocale: () => setLocale(current => current === "en" ? "ar" : "en"), t: messages[locale] }), [locale, dir]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
