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
    "@nuxtjs/device"
  ],
  prismic: {
    endpoint: apiEndpoint || repositoryName
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
    detectBrowserLanguage: false,
    locales: ["fr-fr"],
    defaultLocale: "fr-fr",
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
  // nodemailer: {
  //   from: process.env.NUXT_SMTP_USER,
  //   host: process.env.NUXT_SMTP_HOST,
  //   port: parseInt(process.env.NUXT_SMTP_PORT || '465', 10),
  //   secure: true,
  //   auth: {
  //     user: process.env.NUXT_SMTP_USER,
  //     pass: process.env.NUXT_SMTP_PASSWORD,
  //   }
  // },
  runtimeConfig: {
    smtpHost: process.env.NUXT_SMTP_USER,
    smtpPort: parseInt(process.env.NUXT_SMTP_PORT || '465', 10),
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPwd: process.env.NUXT_SMTP_PASSWORD,
    public: {
      mailerTo: process.env.NUXT_RECEIVER_MAIL,
      internalApiSecret: process.env.NUXT_INTERNAL_API_SECRET,
    }
  }
})