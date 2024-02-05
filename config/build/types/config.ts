export type BuildMode = 'production' | 'development';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string,
    buildLocales: string
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiURL: string;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    isTsx?: boolean;
    port: number;
    apiURL: string
}
