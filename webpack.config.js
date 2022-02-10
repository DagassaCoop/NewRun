const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


const PAGES_DIR_H = `${path.join(__dirname, 'src')}/pug/pages/home/`
const PAGES_DIR_S = `${path.join(__dirname, 'src')}/pug/pages/settings/`
const PAGES_DIR_A = `${path.join(__dirname, 'src')}/pug/pages/account/`
const PAGES_DIR_QR = `${path.join(__dirname, 'src')}/pug/pages/qrCode/`
const PAGES_H = fs.readdirSync(PAGES_DIR_H).filter(fileName => fileName.endsWith('.pug'))
const PAGES_S = fs.readdirSync(PAGES_DIR_S).filter(fileName => fileName.endsWith('.pug'))
const PAGES_A = fs.readdirSync(PAGES_DIR_A).filter(fileName => fileName.endsWith('.pug'))
const PAGES_QR = fs.readdirSync(PAGES_DIR_QR).filter(fileName => fileName.endsWith('.pug'))

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
        ...PAGES_H.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR_H}/${page}`,
            filename: `./home/${page.replace(/\.pug/,'.html')}`
        })),
        ...PAGES_S.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR_S}/${page}`,
            filename: `./settings/${page.replace(/\.pug/,'.html')}`
        })),
        ...PAGES_A.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR_A}/${page}`,
            filename: `./account/${page.replace(/\.pug/,'.html')}`
        })),
        ...PAGES_QR.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR_QR}/${page}`,
            filename: `./qrCode/${page.replace(/\.pug/,'.html')}`
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