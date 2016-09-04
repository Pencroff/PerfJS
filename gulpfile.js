/**
 * Created by Pencroff on 04-Sep-16.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var dotify = require('gulp-dotify');
var header = require('gulp-header');
var watch = require('gulp-watch');

var destination = 'assets';

gulp.task('templates', function() {
    return gulp.src('src/views/**/*.html')
        .pipe(dotify({
            dictionary: 'PerformanceJs.JST'
        }))
        .pipe(concat('templates.min.js'))
        .pipe(uglify())
        .pipe(header('window.PerformanceJs.JST = {};'))
        .pipe(gulp.dest(destination));
});

gulp.task('templates-watch', function () {
        watch('src/views/**/*.html', function () {
            gulp.start('templates')
        })
    }
);

makeTask({
    name: 'app',
    files: 'src/**/*.js',
    destination: destination,
    uglify: true
});

makeTask({
    name: 'vendor',
    files: ['assets/js/lodash.min.js', 'assets/js/bluebird.min.js', 'assets/js/director.min.js',
        'assets/js/domtastic.min.js'],
    destination: destination,
});

makeTask({
    name: 'benchmark',
    files: ['assets/js/benchmark.js', 'assets/js/platform.js'],
    destination: destination
});

gulp.task('engine', ['app', 'vendor', 'benchmark', 'templates']);

gulp.task('engine-watch', ['app-watch', 'templates-watch']);

function makeTask(options) {
    gulp.task(options.name, function() {
        var stream = gulp.src(options.files)
            .pipe(concat(options.name + '.js'))
            .pipe(gulp.dest(options.destination));
        if (options.uglify) {
            stream.pipe(rename(options.name + '.min.js'))
                .pipe(uglify())
                .pipe(gulp.dest(options.destination));
        }
        return stream;
    });
    gulp.task(options.name + '-watch', function () {
            watch(options.files, function () {
                gulp.start(options.name)
            })
        }
    );
}
