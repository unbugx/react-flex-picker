const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.styl'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
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
        include: path.resolve(__dirname, '../src'),
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          'style-loader',
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