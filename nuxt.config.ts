import en from './lang/en'
import ru from './lang/ru'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/interval-timer/',
    buildAssetsDir: "/i/",

    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, user-scalable=no'
        },
      ],
      link: [
        {
          rel: 'icon',
          href: 'favicon.ico',
          type: "image/x-icon"
        },
      ],
    },
  },

  css: [
    '~/assets/css/index.css',
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],

  tailwindcss: {
    viewer: false,
  },

  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',

    vueI18n: {
      legacy: false,
      globalInjection: true,
      messages: { ru, en },
    },

    // detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: true,
      fallbackLocale: 'en',
      redirectOn: 'root',
    },
  },

  colorMode: {
    classSuffix: '',
  }
})
