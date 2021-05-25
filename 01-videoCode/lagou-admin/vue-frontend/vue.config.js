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
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        prependData: `@import "~@/assets/css/variables.scss";`
      },
    }
  }
}