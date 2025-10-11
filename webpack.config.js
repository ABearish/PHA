const path = require('path');

const config = {
  entry: './client/index.jsx', // Assumes a single entry point named App.jsx
  output: {
    path: path.resolve(__dirname, 'public'), 
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react'
            ]
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Setting devtool to 'source-map' is good for debugging in development mode
  devtool: 'source-map',
};

module.exports = config;