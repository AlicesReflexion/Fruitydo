var gulp = require('gulp');
var cssnano = require('gulp-cssnano');

gulp.task('default', function() {
  return gulp.src('./resources/style/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./static/style'));
});
