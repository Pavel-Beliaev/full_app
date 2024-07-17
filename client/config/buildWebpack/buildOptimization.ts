import TerserWebpackPlugin from 'terser-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import {Configuration} from 'webpack';
import { BuildOptions } from '../types';


export function buildOptimization({ mode }: BuildOptions):Configuration['optimization'] {
  const isDev = mode === 'development';

  return {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
    minimizer: isDev ? [] : [
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              }],
            ],
          },
        },
      }),
    ],
  }
}