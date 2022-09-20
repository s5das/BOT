const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://124.220.9.212:9098',
    historyApiFallback: true,
    allowedHosts: 'all'
  },

})
