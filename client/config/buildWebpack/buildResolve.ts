import { Configuration } from 'webpack';
import { BuildOptions } from '../types';

export function buildResolve({ paths }: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': [
        `${paths.src}/components`,
        `${paths.src}/modulооe`,
        paths.src,
      ],
    },
  };
}