// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {

    public: {
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      HASH: process.env.HASH,
      PUBLIC_KEY: process.env.PUBLIC_KEY,
    },


  },
})
