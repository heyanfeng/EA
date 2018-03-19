'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const defaultPort = 8000;

function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '/../src')]
      }, {
        test: /\.css$/,
        exclude: path.resolve(__dirname, '/../src/theme/styles'),
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:5]!postcss-loader'
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, '/../src/theme/styles'),
        loader: 'style-loader!css-loader!postcss-loader'
      }, {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      }, {
        test: /\.scss/,
        exclude: path.resolve(__dirname, '/../src/styles'),
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:5]!sass-loader?outputStyle=expanded!postcss-loader'
      }, {
        test: /\.scss/,
        include: path.resolve(__dirname, '/../src/styles'),
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded!postcss-loader'
      }, {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader!postcss-loader'
      }, {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader!postcss-loader'
      }, {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ],
    postLoaders: [{
      test: /\.(js|jsx)$/,
      loaders: ['es3ify-loader'],
      include: [
        path.join(__dirname, '/../src'),
        // 重新编译node_modules下的一些库，让他们支持ie8
        path.join(__dirname, '/../node_modules/@sdp.nd'),
        path.join(__dirname, '/../node_modules/axios'),
        path.join(__dirname, '/../node_modules/redux-action')
      ]
    }]
  };
}
const browsers = ["> 5%", "ie >= 8"]
function getDefaultPostcss() {
  return [
    require('postcss-import')({
      path: srcPath + '/theme/styles'
    }),
    require('postcss-assets')({
      relative: true,
      loadPaths: [srcPath + '/static/images']
    }),
    require('postcss-cssnext')({
      browsers,
      features: {
        customProperties: {
          variables: require(srcPath + '/theme/styles/variables.js')
        },
        autoprefixer: true
      }
    }),
    // require('autoprefixer')({ browsers: browsers }),
    require('postcss-browser-reporter'),
    require('postcss-reporter')
  ]
}

module.exports = {
  srcPath: srcPath,
  publicPath: process.env.NODE_ENV === 'production' ? 'assets/' : '/assets/', // dist时使用相对路径
  port: defaultPort,
  getDefaultModules: getDefaultModules,
  getDefaultPostcss: getDefaultPostcss
};
