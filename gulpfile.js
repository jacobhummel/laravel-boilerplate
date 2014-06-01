/*
    Compiles less to compressed css with autoprefixing
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

// livereload
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

//Source Asset directories
var assetDir = 'app/assets';

//Target Asset directories
var targetCSSDir = 'public/css';

// js directory
var jsDir = 'public/js';

// blade directory
var bladeDir = 'app/views';

// Tasks
/* less compile */
gulp.task('less', function() {
    return gulp.src(assetDir + '/less/*.less')
        .pipe(less({ style: 'compressed'}).on('error', gutil.log))
        .pipe(autoprefix('last 10 versions'))
        .pipe(gulp.dest(targetCSSDir))
        .pipe(livereload(server))
        .pipe(notify('CSS compiled, prefixed, and minified.'));
});


/* Blade Templates */
gulp.task('blade', function() {
    return gulp.src(bladeDir + '/**/*.blade.php')
        .pipe(livereload(server));
});

/* JS */
gulp.task('js', function() {
    return gulp.src(jsDir + '/**/*.js')
        .pipe(livereload(server));
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
        gulp.watch(assetDir + '/**/*.less', ['less']);
        gulp.watch(jsDir + '/**/*.js', ['js']);
    });

    gulp.watch('app/**/*.php', ['phpunit']);
});

/* Default Task */
gulp.task('default', ['less', 'phpunit', 'watch']);
