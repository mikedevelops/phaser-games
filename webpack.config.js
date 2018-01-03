const path = require('path');
const Html = require('html-webpack-plugin');
const webpack = require('webpack');
const phaserPath = path.join(__dirname, 'node_modules/phaser');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new Html({
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body'
        })
    ],
    devtool: 'inline-source-map'
}
