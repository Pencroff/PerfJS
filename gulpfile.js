/**
 * Created by Pencroff on 04-Sep-16.
 */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var dotify = require('gulp-dotify');
var watch = require('gulp-watch');
var transform = require('gulp-transform');
var wrapper = require('gulp-wrapper');

var destination = 'assets';

gulp.task('generate-data-file', function() {
    global.window = {};
    return gulp.src('tests/*.js')
        .pipe(plumber())
        .pipe(transform(function (content) {
            eval(content);
            var test = global.window.test;
            return [
                '{ ',
                    'id:"', test.id, '",',
                    'name:"', test.name, '",',
                    'description:"', test.description, '",',
                    'tags:', '["', test.tags.join('","'), '"],',
                    'url:"', test.url, '"',
                ' }'
            ].join('');
        }, {encoding: 'utf8'}))
        .pipe(concat('data.js', {newLine: ','}))
        .pipe(wrapper({
            header: '(function (r) {r.data=[',
            footer: '];})(window.PerformanceJs);'
        }))
        .pipe(gulp.dest(destination));
});

gulp.task('templates', function() {
    return gulp.src('src/views/**/*.html')
        .pipe(plumber())
        .pipe(dotify({
            dictionary: 'r.JST'
        }))
        .pipe(concat('templates.min.js'))
        .pipe(uglify())
        .pipe(wrapper({
            header: '(function (r) {r.JST={},',
            footer: '})(window.PerformanceJs);'
        }))
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
        'assets/js/domtastic.min.js', 'assets/js/prism.js'],
    destination: destination,
});

makeTask({
    name: 'benchmark',
    files: ['assets/js/benchmark.js', 'assets/js/platform.js'],
    destination: destination
});

gulp.task('engine', ['app', 'vendor', 'benchmark', 'templates', 'generate-data-file']);

gulp.task('engine-watch', ['app-watch', 'templates-watch']);

function makeTask(options) {
    gulp.task(options.name, function() {
        var stream = gulp.src(options.files)
            .pipe(plumber())
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
