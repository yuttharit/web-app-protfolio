import i18n from "i18next";

import translationEN from "../public/locales/en/translation.json";
import translationTH from "../public/locales/th/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
};

i18n.init({
  resources,
  lng: "th",

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
