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
var saveLicense = require('uglify-save-license');

var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var sourceMaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var inject = require('gulp-inject');

var Server = require('karma').Server;

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
    './bower_components/bootstrap/js/dropdown.js',
    './bower_components/fastclick/lib/fastclick.js',
    './node_modules/moment/moment.js',
    './bower_components/angular/angular.js',
    './node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js'
];

var jsAppSrc = [
    './app/**/*.module.js',
    './app/**/*.js'
];

var templateSrc = './app/templates/**/*.html';
var templateSrcDatetimepicker = './app/templates-datetimepicker/datetimepicker.html';

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

        .pipe(gulpif(isProduction, uglifyJs({ preserveComments: saveLicense })))
        .pipe(gulpif(isProduction, rev()))

        .pipe(gulpif(!isProduction, sourceMaps.write()))
        .pipe(gulp.dest(bldFolder));
});

//
// Template caching

gulp.task('template-cache-datetimepicker', function () {
    return gulp
        .src(templateSrcDatetimepicker)
        .pipe(templateCache('temp-templates-datetimepicker.js', { module: 'ui.bootstrap.datetimepicker', root: 'templates/', standalone: false }))
        .pipe(gulp.dest(bldFolder));
});

gulp.task('template-cache', function () {
    return gulp
        .src(templateSrc)
        .pipe(templateCache('temp-templates-app.js', { module: 'templatecache', standalone: true }))
        .pipe(gulp.dest(bldFolder));
});

gulp.task('bundle-template-caches', ['template-cache-datetimepicker', 'template-cache'], function(){
    return gulp
        .src('./bld/temp-templates*.js')
        .pipe(concatJs('app-templates.js'))
        .pipe(gulpif(isProduction, rev()))
        .pipe(gulp.dest(bldFolder));
});

gulp.task('finalize-template-cache', ['bundle-template-caches'], function () {
    del.sync('./bld/temp-templates*.js');
});

//
//

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

gulp.task('default', ['clean-bld', 'js-server', 'js-lib', 'finalize-template-cache', 'js-app', 'less'], function () {
    if (!isProduction && !resetInject) { return; }

    // If in production or reset from revisioned production files to debug mode, then inject links to html file

    var sourcesToInject = gulp.src([
        bldFolder + '/lib*.js',
        bldFolder + '/app-templates.js',
        bldFolder + '/app*.js',
        bldFolder + '/app*.css'
    ], { read: false });

    gulp
        .src('./Views/start/index.html')
        .pipe(inject(sourcesToInject))
        .pipe(gulp.dest('./Views/start/'));
});

gulp.task('test', ['template-cache', 'js-app'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        verbose: true
    }, done).start();
});

gulp.task('watch', ['default'], function () {
    gulp.watch(jsServerSrc, ['js-server']);
    gulp.watch(templateSrc, ['finalize-template-cache']);
    gulp.watch(jsAppSrc, ['js-app']);
    gulp.watch(lessSrcWatch, ['less']);
});