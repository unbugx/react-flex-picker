const path = require('path');

module.exports = {
  // devtool: '#source-map',
  // context: path.resolve(__dirname, '../src'),
  resolve: {
    extensions: ['.js', '.scss', '.ts', '.tsx', '.styl'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        // exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'tslint-loader',
            options: {
              tsConfigFile: './tsconfig.json',
              failOnHint: false,
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.styl$/,
        // include: path.resolve(__dirname, '../src'),
        use: [
          'style-loader',
          /*{
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              localIdentName: '[name]___[local]'
            }
          },*/
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]___[local]'
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
};