import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          language: "English",
          registrationTitle: "Sign up",
          companySignup:"Sign up as company",
          candidateSignup:"Sign up as candidate",
        }
      },
      es: {
        translation: {
          // here we will place our translations...
          language: "Español",
          registrationTitle: "Registro",
          companySignup:"Accede como empresa",
          candidateSignup:"Accede como aspirante",
        }
      }
    }
  });

export default i18next;