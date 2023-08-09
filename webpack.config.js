/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { isLocal } = slsw.lib.webpack

module.exports = {
  target: 'node',
  stats: 'normal',
  entry: slsw.lib.entries,
  // externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './node_modules/.prisma/client/schema.prisma', to: './handlers' },
        { from: './node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node', to: './handlers' },
      ]
    })
  ],
  mode: isLocal ? 'development' : 'production',
  optimization: { concatenateModules: false },
  resolve: { extensions: ['.js', '.ts'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
  },
}
