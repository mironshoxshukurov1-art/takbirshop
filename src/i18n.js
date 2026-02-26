import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./localization/en/global.json";
import uz from "./localization/uz/global.json";

// const hjsdhj
const resources = {
  en: {
    translation: en
  }, 
  uz: {
    translation: uz
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
