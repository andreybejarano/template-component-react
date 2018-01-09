module.exports = () => ({
  plugins: [
    require('postcss-global-import')(),
    require('postcss-import')()
  ]
});
