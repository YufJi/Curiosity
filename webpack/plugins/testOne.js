// const webpack = require('webpack');

// const { Template } = webpack;

const { RawSource } = require('webpack-sources');


const pluginName = 'DonePlugin';

class DonePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, next) => {
      const { assets } = compilation;
      const entries = [];
      for (const [, entrypoint] of compilation.entrypoints.entries()) {
        console.log(entrypoint.name, '----entrypoint');
        entries.push(entrypoint.name);
      }
      for (const key of Object.keys(assets)) {
        const content = assets[key].source();
        if (key.substr(key.lastIndexOf('.')) === '.js') {
          if (entries.some(item => key.indexOf(item) > -1)) {
            assets[key] = new RawSource(`console.log('jyf xxx'); ${content}`);
          }
        }
      }
      next();
    });
  }
}

module.exports = DonePlugin;
