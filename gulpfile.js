/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

//
// Sources

var jsServerSrc = [
    './server.js',
    './server/**/*.js'
];

//
// Tasks

gulp.task('js-server', function () {
    return gulp
        .src(jsServerSrc)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

//
// Main Tasks

gulp.task('server', ['js-server']);

gulp.task('watch', ['server'], function () {
    gulp.watch(jsServerSrc, ['js-server']);    
});