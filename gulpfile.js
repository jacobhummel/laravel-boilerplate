/*
    Compiles less to compressed css with autoprefixing and source maps
    Concatinates Javascript into one, minified file.
    Livereloads on changes to coffee, less, and blade templates
    Runs PHPUnit tests
    Watches less, js, blade, and phpunit
    Default tasks less, phpunit, watch
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var phpunit = require('gulp-phpunit');
var concat = require('gulp-concat');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var path = require('path');
var clean = require('gulp-clean');

// livereload
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

//Source less directories
var lessDir = 'app/assets/less';

//Target css directories
var targetCSSDir = 'public/css';

// js directory
var jsDir = 'app/assets/js';

// Target js directory
var targetJsDir = 'public/js';


// blade directory
var bladeDir = 'app/views';

// Tasks

/* LESS */
gulp.task('clean-css', function () {
  return gulp.src(targetCSSDir, {read: false})
    .pipe(clean());
});

gulp.task('less', ['clean-css'], function() {
  return gulp.src(lessDir + '/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      style: 'compressed',
      sourceMap: true
    }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(targetCSSDir))
    .pipe(livereload(server))
    .pipe(notify('LESS compiled, prefixed, compressed.'));
});

/* Blade Templates */
gulp.task('blade', function() {
    return gulp.src(bladeDir + '/**/*.blade.php')
        .pipe(livereload(server));
});

/* JS */
gulp.task('clean-scripts', function () {
  return gulp.src(targetJsDir, {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function() {
    return gulp.src(jsDir + '/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(targetJsDir))
        .pipe(notify('JS minified.'));
});

/* PHPUnit Tests */
gulp.task('phpunit', function() {
    var options = {debug: false, notify: true};
    gulp.src('app/tests/*.php')
        .pipe(phpunit('', options))
        .on('error', notify.onError({
            title: "Failed Tests!",
            message: "Error(s) occurred during testing..."
        }));
});

/* Watcher */
gulp.task('watch', function() {

    server.listen(35729, function(err) {
        if(err) {console.log(err);}

        gulp.watch(bladeDir + '/**/*.blade.php', ['blade']);
        gulp.watch(lessDir + '/**/*.less', ['less']);
        gulp.watch(jsDir + '/**/*.js', ['scripts']);
    });
});

/* Default Task */
gulp.task('default', ['less', 'scripts', 'watch']);
