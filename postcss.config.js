module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-plugin-px2rem')({ rootValue: 37.5, minPixelValue: 2}) 
    // require('postcss-px-to-viewport')({ viewportWidth: 75, unitPrecision: 3, viewportUnit: 'vw'})
  ]
};
