const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    devtool: "cheap-module-source-map",
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [
            {
                //js파일 만났을때
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                //scss파일을 만났을때
                test: /\.(scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        //webpack이 css이해할 수 있게
                        loader: "css-loader",
                    },
                    {
                        //css를 받아서 postcss변환(호환되게)
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer({ overrideBrowserlist: "cover 99.5%" })],
                            },
                        },
                    },
                    {
                        //scss받아서 css
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
};

module.exports = config;
