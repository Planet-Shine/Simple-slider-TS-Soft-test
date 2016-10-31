'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context      : __dirname + '/app',
    entry        : './simpleSlider.js',
    watch        : true,
    watchOptions : {
        aggrigateTimeout : 300
    },
    output       : {
        filename : './app/build.js',
        library : 'customSlider'
    },
    module       : {
        loaders  : [{
            test   : /\.js$/,
            loader : 'babel-loader',
            query: {
            //    presets: ['es2015'],
            //    plugins: ['transform-runtime']
            }
        },
        {
            test: /\.html/,
            loader: 'raw-loader'
        }]
    }
};