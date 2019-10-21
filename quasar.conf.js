const helpers = require('./quasar.helpers')

// Configuration for your app
const path = require('path')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'apollo',
      'i18n',
      'leaflet',
      'vue-i18n',
      'vuelidate',
      'asyncComputed'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QBtn',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QCheckbox',
        'QDialog',
        'QDrawer',
        'QHeader',
        'QIcon',
        'QImg',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QList',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QSelect',
        'QSeparator',
        'QSpinner',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip'
      ],

      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Cookies',
        'Dialog'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      env: {
        API: helpers.getAPI(ctx.dev)
      },
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      analyze: false,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })

        // config for using embedded <i18n> template components
        // https://quasar-framework.org/components/internationalization.html#Setting-up-Translation-Blocks-in-your-SFCs
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          use: [
            { loader: '@kazupon/vue-i18n-loader' },
            { loader: 'yaml-loader' }
          ]
        })

        cfg.module.rules.push({
          test: /\.(graphql)$/,
          loader: 'graphql-tag/loader',
          exclude: /(node_modules)/
        })

        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          '@gql': path.resolve(__dirname, './graphql'),
          '@test': path.resolve(__dirname, './test')
        }
      }
    },

    devServer: {
      // https: true,
      port: 4000, // make sure to have a different port than that of the consumer frontend app
      // this is to avoid problems upon pushing code because of the pre-push hook
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [
      'shake',
      'flipOutY',
      'flipInY',
      'bounceIn',
      'bounceOut'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
