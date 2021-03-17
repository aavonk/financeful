import path from 'path';
import webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
});

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@Components': path.resolve(__dirname, 'src/components/'),
      '@Common': path.resolve(__dirname, 'src/common'),
      '@Context': path.resolve(__dirname, 'src/context'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Constants': path.resolve(__dirname, 'src/constants'),
      '@Images': path.resolve(__dirname, 'src/images'),
      '@Globals': path.resolve(__dirname, 'src/globals'),
      '@Generated': path.resolve(__dirname, 'src/generated'),
      '@Lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  ignoreWarnings: [/Failed to parse source map/],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './public'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [htmlPlugin],
};

export default config;
