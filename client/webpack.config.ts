import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/buildWebpack/buildWebpack';
import { BuildMode, BuildPaths, BuildPlatform } from './config/types';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyze?: boolean,
  platform?: BuildPlatform;
}

export default (env: EnvVariables): webpack.Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
    config: path.resolve(__dirname, 'eslint.config.js'),
  };

  return buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    platform: env.platform ?? 'desktop',
    analyze: env.analyze,
  });
};
