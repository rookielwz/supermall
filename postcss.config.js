module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  // 视窗的宽度，对应的是我们的设计稿的宽度
      viewportHeight: 667, // 视窗的高度，对应的是我们的设计稿的高度（也可以不配置）
      uniPrecision: 5, //指定‘px’转换为视窗单位的小数位数（很多时候无法整除）
      viewportUnit: 'vw',
      selectorBlackList: ['ignore','tab-bar','tab-bar-item','bottom-bar'],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}
