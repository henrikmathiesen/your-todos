/// <reference path="./typings/tsd.d.ts" />

module.exports = function (config) { 
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            './bld/lib.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bld/app-templates.js',
            './bld/app.js',
            './tst/**/*.js'
        ],
        logLevel: config.LOG_DISABLE,
        singleRun: true,
        autoWatch: false
    });
}