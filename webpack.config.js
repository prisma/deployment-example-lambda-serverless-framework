const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isLocal = slsw.lib.webpack.isLocal;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true
        }
      }
    ],
  },
//   node: false,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  target: 'node',
};

// module.exports = {
//   output: {
//     libraryTarget: 'commonjs2',
//     path: path.join(__dirname, '.webpack'),
//     filename: '[name].js'
//   },
//   cache: {
//     type: 'filesystem',
//     allowCollectingMemory: true,
//     cacheDirectory: path.resolve('.webpackCache')
//   },
//   module: {
//     rules: [
//       {
//         // Include ts, tsx, js, and jsx files.
//         test: /\.(ts|js)x?$/,
//         exclude: /node_modules/,
//         use: ['babel-loader']
//       }
//     ]
//   },
// };