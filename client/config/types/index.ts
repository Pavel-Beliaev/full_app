export interface BuildPaths {
  entry: string,
  output: string,
  template: string,
  src: string,
  config: string,
  public: string
}

export type BuildMode = 'development' | 'production';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
  port: number,
  paths: BuildPaths,
  mode: BuildMode,
  platform: BuildPlatform;

}