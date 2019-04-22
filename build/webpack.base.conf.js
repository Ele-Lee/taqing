'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    // test: /\.(js|vue)$/,
    // loader: 'eslint-loader',
    // enforce: 'pre',
    // include: [resolve('src'), resolve('test')],
    // options: {
    //     formatter: require('eslint-friendly-formatter'),
    //     emitWarning: !config.dev.showEslintErrorsInOverlay
    // }
});

// 兼容IOS 10↓ 不能识别部分ES语法，如果有需求再加多些，避免生产文件过大！
const coreJsArr = [
    'core-js/es/object/entries',
    'core-js/es/array/includes',
    'core-js/es/array/from',
    'core-js/es/string/includes'
    // 'core-js/es/string/repeat',
];

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: [...coreJsArr, './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@components': resolve('src/components'),
            '@c': resolve('src/components'),
            '@pages': resolve('src/pages'),
            '@imgs': resolve('src/assets/img'),
            '@audios': resolve('src/assets/audio'),
            '@common': resolve('src/common'),
            '@static': resolve('static')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.(png|jpe?g|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            // gif 单独处理，应对重复播放不循环的gif情况
            {
                test: /\.(gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 35000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
