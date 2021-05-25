module.exports = {
  devServer: {
    port: 4000
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        assets: '@/assets',
        views: '@/views',
        common: '@/common',
        network: '@/network'
      },
    },
  }
}