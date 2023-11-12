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
          slogan:"We connect IT professionals now",
          name: "Name",
          email: "Email",
          password: "Password",
          cellphone: "Cellphone number",
          dialect: "Language",
          country: "Country",
          skill: "Skill",
          personality: "Personality",
          login: "Log In",
          account: "Do you have an account?",
          signupButton: "Sign Up",
          namePlaceholder: "My name",
          personalityPlaceholder: "Tell us your personality",
          companyName: "Company Name",
          companyEmail: "Corporate Email",
          companyNamePlaceholder: "Name of the company",
          companySize:"Number of employees",
          location: "Company headquarters location",
          webPage: "Web Page",
          webPagePlaceholder: "  Web site of the company",
        }
      },
      es: {
        translation: {
          // here we will place our translations...
          language: "Español",
          registrationTitle: "Registro",
          companySignup:"Accede como empresa",
          candidateSignup:"Accede como aspirante",
          slogan:"Conectamos profesionales de TI",
          name: "Nombre",
          email: "Correo electrónico",
          password: "Contraseña",
          cellphone: "Teléfono celular",
          dialect: "Idioma",
          country: "País",
          skill: "Habilidad",
          personality: "Personalidad",
          login: "Iniciar sesión",
          account: "¿Ya tienes una cuenta?",
          signupButton: "Registrarse",
          namePlaceholder: "Mi nombre",
          personalityPlaceholder: "Selecciona tu personalidad",
          companyName: "Nombre de la empresa",
          companyEmail: "Correo corporativo",
          companyNamePlaceholder: "Nombre de la empresa",
          companySize:"Tamaño de la empresa",
          location: "Ubicación",
          webPage: "Sitio web",
          webPagePlaceholder: "  Ingresa el sitio web de la empresa",
        }
      }
    }
  });

export default i18next;