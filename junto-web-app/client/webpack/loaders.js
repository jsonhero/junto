const ExtractTextPlugin = require('extract-text-webpack-plugin');


const BUILD = process.env.NODE_ENV;

function babelLoader() {
  return {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime']
    },
  };
}

function cssLoader() {
  if (['development'].includes(BUILD)) {
    return {
      test: /\.s?css$/,
      exclude: /node_modules/,
      loader: 'style!css!postcss!sass',
    };
  } else if (['production'].includes(BUILD)) {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract([
        'css-loader?sourceMap',
        'postcss-loader!sass-loader',
      ]),
      exclude: /node_modules/,
    };
  }
}

function jsonLoader() {
  return {
    test: /\.json$/,
    loader: 'json',
    exclude: /node_modules/,
  };
}

function urlLoaders() {
  return [
    {
      test: /\.woff(\d+|\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }
  ]
}

function fileLoaders() {
  return [
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    },
    {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
      exclude: /node_modules/,
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'file?name=[path][name].[ext]',
      exclude: /node_modules/,
    }
  ];
}


module.exports = () => {
  return {
    module: {
      loaders: [
        babelLoader(),
        jsonLoader(),
        cssLoader(),
        ...fileLoaders(),
        ...urlLoaders(),
      ]
    }
  }
}
