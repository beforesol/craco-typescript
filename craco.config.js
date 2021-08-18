const path = require('path');
const UitSpritesmithWebpack = require('@uit-spritesmith/webpack');
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CracoAlias = require('craco-alias');

const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
}

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // webpackConfig.entry = [path.resolve('./src/index2.js')];
      if (env === ENV.PRODUCTION) {
        webpackConfig.plugins = [
          ...webpackConfig.plugins,
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './src/assets/img'),
                to: path.resolve(__dirname, './build/static/img')
              },
            ]
          }),
        ]
      }
      return webpackConfig;
    },
    plugins: [
      new UitSpritesmithWebpack({
        spriteSrc: path.resolve('./src/assets/sprite'),
        spriteDest: path.resolve('./src/assets/img/sprite'),
        cssDest: path.resolve('./src/assets/scss/sprite'),
        imgURL: '/src/assets/img/sprite',
        prefix: 'sp_',
        ratio: 3,
        padding: 3,
      }),
      new DefinePlugin({
        'process.env': {
          'device': JSON.stringify('mobile'),
        }
      }),
    ]
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ]
};