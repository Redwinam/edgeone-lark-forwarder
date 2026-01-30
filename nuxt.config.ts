// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-30',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  nitro: {
    // EdgeOne Functions often work well with 'node-server' or specific edge presets.
    // We'll leave it auto or generic for now.
  },
  runtimeConfig: {
    // Keys that should only be available on the server
    larkWebhookUrl: process.env.LARK_WEBHOOK_URL,
    larkSecret: process.env.LARK_SECRET
  }
})
