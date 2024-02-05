import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import {buildBabelLoader} from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const {isDev, isTsx} = options;
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const codeBabelLoader = buildBabelLoader({...options, isTsx: false});
    const typescriptLoader = buildBabelLoader({...options, isTsx: true});

    const cssLoader = buildCssLoader(isDev);

    // const babelLoader = {
    //     test: /\.(js|jsx|ts|tsx)$/,
    //     // test: isTsx? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    //         exclude: /node_modules/,
    //     use: {
    //     loader: 'babel-loader',
    //         options: {
    //         presets: ['@babel/preset-env'],
    //             plugins: [
    //             [
    //                 'i18next-extract',
    //                 {
    //                     locales: ['ru', 'en'],
    //                     keyAsDefaultValue: true,
    //                 },
    //             ],
    //             "@babel/plugin-transform-runtime",
    //             isDev && require.resolve('react-refresh/babel'),
    //         ].filter(Boolean),
    //     },
    // },
    // };

    // // Если не используем тайпскрипт - нужен babel-loader
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        // babelLoader,
        codeBabelLoader,
        typescriptLoader,
        cssLoader,
    ];
}
