const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


const PAGES_DIR_PA = `${path.join(__dirname, 'src')}/pug/pages/personalAccount/`
// const PAGES_DIR_Team = `${path.join(__dirname, 'src').src}/pug/pages/`
// const PAGES_DIR_App = `${path.join(__dirname, 'src').src}/pug/pages/`
const PAGES_PA = fs.readdirSync(PAGES_DIR_PA).filter(fileName => fileName.endsWith('.pug'))
// const PAGES_Team = fs.readdirSync(PAGES_DIR/).filter(fileName => fileName.endsWith('.pug'))
// const PAGES_App = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: './index.js',
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name]-[hash][ext]'
    },
    resolve: {
        extensions: ['.js', '.css', '.scss', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             from: /./, to: '/main.html'
        //         }
        //     ]
        // },
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: "index.html",
                template: "pug/pages/index.pug",
                inject: true,
                minify: false
            }
        ),
        ...PAGES_PA.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR_PA}/${page}`,
            filename: `./personalAccount/${page.replace(/\.pug/,'.html')}`
        })),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
              test: /\.css/i,
              use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                exclude: /(node_modules)/,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            },
            {
                test:/\.(ttf|OTF)/i,
                loader: "file-loader"
            }
        ]
    }
}