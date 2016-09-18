/// <reference path="./typings/tsd.d.ts" />

module.exports = function (config) { 
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            './bower_components/jquery/dist/jquery.js',
            './node_modules/moment/moment.js',
            './bower_components/angular/angular.js',
            './node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './bld/app-templates.js',
            './bld/app.js',
            './tst/**/*.js'
        ],
        logLevel: config.LOG_DEBUG
    });
}