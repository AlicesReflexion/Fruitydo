var gulp = require('gulp');

// CSS plugins
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// JS plugins
var uglify = require('gulp-uglify');

var paths = {
  styles: './resources/style/*.scss',
  scriptdeps: './resources/js/**/*',
  scripts: './resources/js/**/*.js'
};

gulp.task('copydeps', function() {
  return gulp.src(paths.scriptdeps, {base: './resources/js'})
    .pipe(gulp.dest('./static/js'));
});

gulp.task('stylegen', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(cssnano())
    .pipe(gulp.dest('./static/style'));
});

gulp.task('jsgen', ['copydeps'], function() {
  return gulp.src(paths.scripts, {base: './resources/js'})
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['stylegen']);
  gulp.watch(paths.scripts, ['jsgen']);
});

gulp.task('default', ['watch', 'stylegen', 'jsgen']);
