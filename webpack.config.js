const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/js/main.js',
        polyfill: './src/js/polyfill.js'
    },
    output: {
       path: `${__dirname}/dist/static/js`,
       filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('commons')
    ]
}
