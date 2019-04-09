const pkg = require('./package')

module.exports = {
  mode: 'universal',

  server: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'theme-color', content: '#1c79c0' },
    ],
    link: [
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'shortcut icon', sizes: '48x48', href: 'https://staticv4.imgix.net/partners/amp_favicon.png?v=3' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: 'https://staticv4.imgix.net/partners/amp_favicon.png?v=3' }
    ]
  },

  // Disable loading bar since AMP will not use client side navigation
  loading: false,

  render: {
    // Disable resourceHints since we don't load any scripts for AMP
    resourceHints: false
  },

  /*
  ** Global CSS
  */
  css: [],

  loaders: {},

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/globals'
  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'section',
        path: '/:section/:page?',
        component: resolve('pages/index.vue')
      })
    }
  },

  serverMiddleware: [
    './middleware/redirect'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // inject custom props from server request
    './modules/appConfigInjector',
    // inject required AMP boilerplate in head tag
    './modules/ampBoilerplate',
    // to avoid {{}} interpolator clashes, inject mustache templates as script (not compiled)
    './modules/ampMustacheTemplates',
    // clean and validate HTML output against AMP rules
    './modules/ampHtmlSanitizer'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, { isClient, isServer, isDev, loaders }) {
      // Automatically resolve certain extensions
      config.resolve.extensions = ['.js', '.vue', 'css', '.scss', '*']
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
