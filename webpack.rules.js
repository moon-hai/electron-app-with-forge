const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: 'node-loader',
  },

  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },

  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          exclude: /node_modules/,
          presets: ['@babel/preset-react'],
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  // CSS
  {
    test: /\.(scss|css)$/,
    exclude: /\.module.(scss|css)$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDevelopment,
          importLoaders: 1,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDevelopment,
          sassOptions: {
            includePaths: [path.resolve(__dirname, 'src'), 'node_modules'],
          },
        },
      },
    ],
  },

  // SCSS MODULES
  {
    test: /\.module\.(scss|css)$/i,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[name]_[local]_[hash:base64:8]',
          },
          sourceMap: !isDevelopment,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isDevelopment,
        },
      },
    ],
  },
];
