/// <reference path="./typings/tsd.d.ts" />

var gulp = require('gulp');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var del = require('del');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var concatJs = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var stripDebug = require('gulp-strip-debug');
var uglifyJs = require('gulp-uglify');

var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var sourceMaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var inject = require('gulp-inject');

//
// Toggle production / debug builds

// var isProduction = argv.prod ? true : false;
// var resetInject = argv.resetinject ? true : false;

//
// Sources

var jsServerSrc = [
    './server.js',
    './server/**/*.js'
];

// var buildFolder = './bld';
// var lessSrc = './app/less/app.less';



//
// Sub Tasks

gulp.task('js-server', function () {
    return gulp
        .src(jsServerSrc)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// gulp.task('less', function () {
//     return gulp
//         .src(lessSrc)
//         //.pipe(gulpif(!isProduction, sourceMaps.init()))
//         .pipe(less())
//         .pipe(autoprefix({ browsers: ['last 3 versions'] }))
//         .pipe(gulpif(isProduction, minifyCss()))
//         .pipe(gulpif(isProduction, rev()))
//         //.pipe(gulpif(!isProduction, sourceMaps.write()))
//         .pipe(gulp.dest(buildFolder));
// });

//
// Main Tasks

gulp.task('server', ['js-server']);

gulp.task('watch', ['server'], function () {
    gulp.watch(jsServerSrc, ['js-server']);    
});