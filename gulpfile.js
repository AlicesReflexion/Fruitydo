var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');

gulp.task('default', function() {
  return gulp.src('./resources/style/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./static/style'));
});
