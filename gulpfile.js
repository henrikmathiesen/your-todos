/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var del = require('del');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var sourceMaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var inject = require('gulp-inject');

var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

//
// Toggle production / debug builds

var isProduction = argv.prod ? true : false;
var resetInject = argv.resetinject ? true : false;

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