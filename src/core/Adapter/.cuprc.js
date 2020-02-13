module.exports = {
  cjs: 'babel',
  extraBabelPlugins: [
    require.resolve('@babel/plugin-proposal-optional-chaining')
  ]
};
