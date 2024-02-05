import babelRemovePropsPlugin from "../../babel/babelRemovePropsPlugin";

interface BabelLoaderOptions {
    isDev: boolean;
    isTsx?: boolean;
}

export const buildBabelLoader = ({isDev, isTsx}: BabelLoaderOptions) => {
    return  {
        test: isTsx? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'],
                            keyAsDefaultValue: true,
                        },
                    ],
                    [
                        "@babel/plugin-transform-typescript",
                        {
                            isTsx
                        }
                    ],
                    isTsx && !isDev && [
                        babelRemovePropsPlugin(),
                        {
                            props: ['data-testid']
                        }
                    ],
                    "@babel/plugin-transform-runtime",
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}
