var NodeMod = process.env.DEPENDENCY_BASE + '/node_modules/';

var gulp = require('gulp');

// CSS plugins
//var cssnano = require(NodeMod + 'gulp-cssnano');
//var sass = require(NodeMod + 'gulp-sass');
//var autoprefixer = require(NodeMod + 'gulp-autoprefixer');

// JS plugins
//var uglify = require(NodeMod + 'gulp-uglify');

//var imagemin = require(NodeMod + 'gulp-imagemin');

//var paths = {
  //styles: './resources/style/*.scss',
  //scriptdeps: './resources/js/**/*',
  //scripts: './resources/js/**/*.js',
  //images: './resources/branding/**/*.svg'
//};

/*gulp.task('copydeps', function() {
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
});*/

gulp.task('default', function () { console.log('Hello Gulp!') });
