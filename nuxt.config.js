
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { innerHTML: `window.NODE_ENV = 'MAINNET'; window.INFURA_PROJECT_ID = "590812d0023e4798aba2a764c477f504"; window["MAINNET.DB_URL"] = "https://ganache.arcology.nyc:7001"`, type: 'text/javascript',
         },
      { src: 'https://cdn.jsdelivr.net/npm/@invisible-college/keythereum@1.1.3/dist/keythereum-1.0.4.min.js',
        type: 'text/javascript',
      },
      { src: 'https://cdn.jsdelivr.net/npm/demo-webify@0.3.5-alpha.4/dist/democracy.0.3.5_alpha.4.min.js',
        type: 'text/javascript',
      }
    ],
     __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
