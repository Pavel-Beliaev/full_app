import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from '../types';

export function buildDevServer({ port, paths }: BuildOptions): DevServerConfiguration {
  return {
    static: {
      directory: paths.output,
    },
    port: port ?? 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  }
}