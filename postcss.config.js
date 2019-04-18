
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }),
    require('autoprefixer')(),
  ]
};
