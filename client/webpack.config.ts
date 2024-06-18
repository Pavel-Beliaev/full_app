import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import webpack from 'webpack';

type Mode = 'development' | 'production';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode == 'development';

  const paths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.template,
      }),
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/i,
          include: paths.src,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'assets/images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev
      ? {
          static: {
            directory: paths.output,
          },
          port: env.port ?? 3000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true,
          client: {
            overlay: {
              errors: true,
              warnings: false,
            },
          },
        }
      : undefined,
  };
  return config;
};
