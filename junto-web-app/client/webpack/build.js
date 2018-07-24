const merge = require('webpack-merge');
const postCSSReporter = require('postcss-reporter');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = require('./loaders');

const BUILD = process.env.NODE_ENV;


function webpackCommon(config) {

  const common = {
    bail: true,
    target: 'web',
    context: config.paths.appRoot,
  }

  let combined = merge(common, loaders())

  return combined;
}


function resolve(config) {
  return {
    resolve: {
      alias: config.paths.alias || {},
      root: config.paths.appRoot || [],
      fallback: config.paths.projectRoot || [],
      moduleDirectories: ['node_modules'],
      extensions: ['', '.jsx', '.js', '.scss', '.json'],
    }
  }
}

function entry (config) {
  let e = {
    entry: {}
  };

  if (['development'].includes(BUILD)) {
    e.entry.main = [
      `webpack-dev-server/client?http://${config.host}:${config.port}`,
      'webpack/hot/only-dev-server',
      config.paths.entryFile];
  } else if (['production'].includes(BUILD)) {
    e.entry.main = [config.paths.entryFile]
  }

  return e;
}


function devServer (config) {
  return {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    devtool: '#eval-source-map',
    devServer: {
      contentBase: config.paths.appRoot,
      inline: true,
      historyApiFallback: true,
      cache: true,
      host: config.host,
      hot: true,
      port: config.port,
      publicPath: config.paths.sourceLocation,
    }
  }
}

function setFreeVariable(key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env),
    ]
  };
}

function output (config) {
  let o = {
    output: {
      filename: '[name].bundle.js',
      path: config.paths.build,
      publicPath: config.paths.sourceLocation,
      pathinfo: true,
    }
  }

  if (['development'].includes(BUILD)) {
    o.output.pathinfo = true;
  }

  return o;
}

function configurePostCSS() {
  return {
    postcss: [
      autoprefixer({
        browsers: [
          'last 2 versions',
          'IE > 8',
        ],
      }),
      postCSSReporter({
        clearMessages: true,
      }),
    ],
  }
}

function htmlPlugin (config) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: config.title,
        filename: 'index.html',
        hash: false,
        template: config.paths.template,
        inject: true,
        favicon: config.paths.favicon,
      }),
    ],
  };
};

module.exports.configureWebpack = (config) => {
  return merge(
    webpackCommon(config),
    configurePostCSS(),
    resolve(config),
    output(config),
    entry(config),
    htmlPlugin(config),
    setFreeVariable('process.env.NODE_ENV', process.env.NODE_ENV),
    (['development'].includes(BUILD)) ? devServer(config) : {}
  )
}
