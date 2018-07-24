const path = require('path');
const config = require('config');
const build = require('./webpack/build');


const buildConfig = {
  title: config.get('title'),
  port: config.get('port'),
  host: config.get('host'),
  paths: {
    entryFile: 'index.js',
    favicon: path.resolve(__dirname, './src/_static/favicon.ico'),
    appRoot: path.resolve(__dirname, './src'),
    build: path.resolve(__dirname, './dist'),
    projectRoot: __dirname,
    sourceLocation: config.get('sourceLocation'),
    template: path.resolve(__dirname, './src/index.html'),
  },
  alias: {},
}


const configure = build.configureWebpack(buildConfig);
module.exports = configure;
