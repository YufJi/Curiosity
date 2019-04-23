class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', () => {
      console.log('全部编译完成');
    });
  }
}
module.exports = DonePlugin;
