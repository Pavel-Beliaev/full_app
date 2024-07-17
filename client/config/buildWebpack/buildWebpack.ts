import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildOptimization } from './buildOptimization';
import { buildResolve } from './buildResolve';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { BuildOptions } from '../types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const {mode, paths} = options
  const isDev = mode === 'development';

  return {
    mode: mode || 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolve(options),
    devtool: isDev ? 'eval-source-map' : 'source-map',
    optimization: buildOptimization(options),
    devServer: isDev
      ? buildDevServer(options)
      : undefined,
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000
    }
  };
}