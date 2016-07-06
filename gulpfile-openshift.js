var gulp = require('$DEPENDENCY_BASE/node_modules/gulp');

// CSS plugins
var cssnano = require('$DEPENDENCY_BASE/node_modules/gulp-cssnano');
var sass = require('$DEPENDENCY_BASE/node_modules/gulp-sass');
var autoprefixer = require('$DEPENDENCY_BASE/node_modules/gulp-autoprefixer');

// JS plugins
var uglify = require('$DEPENDENCY_BASE/node_modules/gulp-uglify');

var imagemin = require('$DEPENDENCY_BASE/node_modules/gulp-imagemin');

var paths = {
  styles: './resources/style/*.scss',
  scriptdeps: './resources/js/**/*',
  scripts: './resources/js/**/*.js',
  images: './resources/branding/**/*.svg'
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

gulp.task('imggen', function() {
  return gulp.src(paths.images, {base: './resources/branding'})
    .pipe(imagemin())
    .pipe(gulp.dest('./static/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['stylegen']);
  gulp.watch(paths.scripts, ['jsgen']);
});

gulp.task('default', ['stylegen', 'jsgen', 'imggen']);
