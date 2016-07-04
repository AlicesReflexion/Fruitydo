var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');

// CSS plugins
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS plugins
var uglify = require('gulp-uglify');

var paths = {
  styles: './resources/style/*.scss',
  scripts: './resources/js/*.js'
};

gulp.task('stylegen', function() {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./static/style'));
});

gulp.task('jsgen', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['stylegen']);
  gulp.watch(paths.scripts, ['jsgen']);
});

gulp.task('default', ['watch', 'stylegen', 'jsgen']);
