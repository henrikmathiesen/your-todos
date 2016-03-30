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
// Toggle production / debug builds (example gulp --prod)

var isProduction = (argv.prod) ? (true) : (false);
var resetInject = (argv.resetinject) ? (true) : (false);

//
// Sources

var jsServerSrc = [
    './server.js',
    './server/**/*.js'
];

var jsLibSrc = [
    './bower_components/jquery/dist/jquery.js',
    './bower_components/fastclick/lib/fastclick.js',
    './bower_components/angular/angular.js'
];

var jsAppSrc = [
    './app/**/*.module.js',
    './app/**/*.js'
];

var lessSrc = './app/less/app.less';
var lessSrcWatch = './app/less/**/*.less';

var bldFolder = './bld';

//
// Sub Tasks

gulp.task('clean-bld', function () {
    del.sync(bldFolder);
});

gulp.task('js-server', function () {
    return gulp
        .src(jsServerSrc)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('js-lib', function () {
    return gulp
        .src(jsLibSrc)
        .pipe(gulpif(!isProduction, sourceMaps.init()))
        
        .pipe(concatJs('lib.js'))
        
        .pipe(gulpif(isProduction, uglifyJs()))
        .pipe(gulpif(isProduction, rev()))
        
        .pipe(gulpif(!isProduction, sourceMaps.write()))
        .pipe(gulp.dest(bldFolder));
});

gulp.task('js-app', function () {
    return gulp
        .src(jsAppSrc)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        
        .pipe(gulpif(!isProduction, sourceMaps.init()))
        
        .pipe(concatJs('app.js'))
        .pipe(ngAnnotate())
        
        .pipe(gulpif(isProduction, stripDebug()))
        .pipe(gulpif(isProduction, uglifyJs()))
        .pipe(gulpif(isProduction, rev()))
        
        .pipe(gulpif(!isProduction, sourceMaps.write()))
        .pipe(gulp.dest(bldFolder));
});

gulp.task('less', function () {
    return gulp
        .src(lessSrc)
        .pipe(gulpif(!isProduction, sourceMaps.init()))
        
        .pipe(less())
        .pipe(autoprefix({ browsers: ['last 3 versions'] }))
        
        .pipe(gulpif(isProduction, minifyCss()))
        .pipe(gulpif(isProduction, rev()))
        
        .pipe(gulpif(!isProduction, sourceMaps.write()))
        .pipe(gulp.dest(bldFolder));
});

//
// Main Tasks

gulp.task('default', ['clean-bld', 'js-server', 'js-lib', 'js-app', 'less'], function () {
    if (!isProduction && !resetInject) { return; }
    
    // If in production or reset from revisioned production files to debug mode, then inject links to html file
    
    var sourcesToInject = gulp.src([
        bldFolder + '/lib*.js',
        bldFolder + '/app*.js',
        bldFolder + '/app*.css'
    ], { read: false });
    
    gulp
        .src('./Views/start/index.html')
        .pipe(inject(sourcesToInject))
        .pipe(gulp.dest('./Views/start/'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(jsServerSrc, ['js-server']);
    gulp.watch(jsAppSrc, ['js-app']);
    gulp.watch(lessSrcWatch, ['less']);
});