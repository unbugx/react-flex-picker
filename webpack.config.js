const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const libraryName = 'react-flex-picker';

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: '',
    libraryTarget: 'umd',
    umdNamedDefine: true
    // libraryTarget: 'commonjs'
    // filename: `${libraryName}.js`,
    // libraryTarget: 'umd',
    // umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.styl'],
  },
  externals: {
    // Don't bundle peerDependencies
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
      root: 'moment'
    },
    classnames: {
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
      root: 'classnames'
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'tslint-loader',
            options: {
              tsConfigFile: './tsconfig.json',
              failOnHint: true,
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.styl$/,
        include: path.resolve(__dirname, 'src'),
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
  optimization:{
    minimize: false
  }
};