// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/interval-timer/',
    buildAssetsDir: "/i/",

    head: {
      link: [
        {
          rel: 'icon',
          href: 'favicon.ico',
          type: "image/x-icon"
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/index.css',
  ],

})
