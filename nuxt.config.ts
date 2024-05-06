// https://nuxt.com/docs/api/configuration/nuxt-config
import image2css from 'vite-plugin-image2css'

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '.' : '/',
    // buildAssetsDir: '/zx-south-seeding/test/assets/',
    head: {
      title: '财富播种节',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1 user-scalable=no' },
        { name: 'description', content: '种子计划' },
      ],
      script: [
        { src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js' },
        { textContent: `window.vConsole = new window.VConsole();` },
      ],

    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vant/nuxt',
  ],
  devtools: { enabled: false },
  postcss: {
    plugins: {
      'postcss-mobile-forever': {
        viewportWidth: 750,
        appSelector: '#__nuxt',
        maxDisplayWidth: 600,
        exclude: /van/,
      },
    },
  },
  imports: {
    dirs: ['apis'],
  },
  vite: {
    plugins: [
      image2css({
        dir: './assets/imgs', // 图片存放的目录
        cdn: {
          enable: process.env.NODE_ENV === 'production', // 是否开启cdn
        },
      }),
    ],
  },
  router: {
    options: {
      hashMode: true,
    },
  },
})
