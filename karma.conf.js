/// <reference path="./typings/tsd.d.ts" />

module.exports = function (config) { 
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            './bower_components/jquery/dist/jquery.js',
            './bower_components/angular/angular.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bld/templates.js',
            './bld/app.js',
            './tst/**/*.js'
        ]
    });
}