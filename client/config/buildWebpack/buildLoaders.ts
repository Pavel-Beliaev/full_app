import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from '../types';
import { buildBabelLoader } from '../babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  const cssLoader = {
    test: /\.css$/i,
    include: paths.src,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  };

  const babelLoader = buildBabelLoader(options);

  const imgLoader = {
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
  };

  return [
    cssLoader,
    babelLoader,
    imgLoader,
  ];
}