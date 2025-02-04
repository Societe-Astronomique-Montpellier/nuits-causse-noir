import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    typeCheck: true,
  },  
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/prismic",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/leaflet",
    "@nuxt/icon",
    "@nuxt/scripts",
    "nuxt-nodemailer",
    "@nuxtjs/device",
    "@nuxt/image"
  ],
  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: false,
    toolbar: false,
  },
  imports: {
    dirs: ["composables", "composables/**", "types/*.d.ts"],
  },
  css: [
    "@/assets/css/tailwind.css",
    "@fontsource/raleway",
    "@fontsource/raleway/200.css",
    "@fontsource/raleway/200-italic.css",
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    locales: [
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json', flag: '🇫🇷' },
      { code: 'en', iso: 'en-GB', name: 'English', file: 'en.json', flag: '🇬🇧' }
    ],
    lazy: true,
    langDir: "locales/",
    vueI18n: "./i18n/i18n.config.ts"
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
      ],
      htmlAttrs: {
        lang: "fr",
      },
    },
  },
  runtimeConfig: {
    smtpHost: process.env.NUXT_SMTP_HOST,
    smtpPort: parseInt(process.env.NUXT_SMTP_PORT || '465', 10),
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPassword: process.env.NUXT_SMTP_PASSWORD,
    public: {
      mailerTo: process.env.NUXT_RECEIVER_MAIL,
      receiverMail: process.env.NUXT_RECEIVER_MAIL,
      internalApiSecret: process.env.NUXT_INTERNAL_API_SECRET,
    }
  }
})