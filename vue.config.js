/**
 * 
 * 项目配置详情
*/
const conf = require('./config/projectConfig');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  productionSourceMap: false,
  outputDir: conf.outputDir,
  pages: conf.pages,
  publicPath: conf.publicPaths,
  lintOnSave: false,
  devServer: {
    open: true
  },
  chainWebpack: config => {
    // if (isProduction) {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //     .end();
    //   config.plugins.delete('prefetch');
    // }
  }
};
