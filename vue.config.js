const path = require('path')

module.exports = {
  configureWebpack: (config) => {
    config = {
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
        },
      },
    }
    return config
  },

  transpileDependencies: ['vuetify'],
}
