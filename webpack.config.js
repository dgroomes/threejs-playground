const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', entry: './src/index.ts', plugins: [new HtmlWebpackPlugin({
        title: 'Development',
    }),], module: {
        rules: [{
            test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,
        },],
    }, devtool: 'inline-source-map', output: {
        filename: '[name].bundle.js', path: path.resolve(__dirname, 'dist'), clean: true,
    }, devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
};
