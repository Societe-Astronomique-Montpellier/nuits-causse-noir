import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    typeCheck: true,
  },  
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/prismic",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/leaflet"
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
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
})