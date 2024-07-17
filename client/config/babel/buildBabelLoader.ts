import { BuildOptions } from '../types';

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === 'development';

  return {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              'runtime': isDev ? 'automatic' : 'classic',
            },
          ],
        ],
      },
    },
  };
}