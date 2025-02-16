
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: "en",  // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function translate(key) {
  return i18next.t(key);
}

export default i18next;
