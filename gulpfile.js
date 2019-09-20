//подключение пакетов

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('server', function() {
    browserSync.init({
      server: {baseDir: './build/'}
    });

    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['scss']);

    gulp.watch('src/js/**/*.*', ['copy:js']);
    gulp.watch('src/libs/**/*.*', ['copy:libs']);
    gulp.watch('src/img/**/*.*', ['copy:img']);
    gulp.watch('src/fonts/**/*.*', ['copy:font']);

    //gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('copy:js', function() {
    return gulp.src('src/js/**/*.*')
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream());;
});

gulp.task('copy:libs', function() {
    return gulp.src('src/libs/**/*.*')
      .pipe(gulp.dest('./build/libs'))
      .pipe(browserSync.stream());;
});

gulp.task('copy:img', function() {
    return gulp.src('src/img/**/*.*')
      .pipe(gulp.dest('./build/img'))
      .pipe(browserSync.stream());;
});

gulp.task('copy:font', function() {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.stream());;
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe( plumber({
      errorHandler: notify.onError( function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.stream());
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/style.scss')
    .pipe( plumber({
      errorHandler: notify.onError( function(err){
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
      .pipe(sourcemaps.init())
      .pipe(scss())
      .pipe(autoprefixer({
        browsers: ['last 3 version'],
        cascade: false
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/css/'))
      .pipe(browserSync.stream());
});



gulp.task('default', function(callback){
  runSequence(
    'clean:build',
    ['scss', 'html', 'copy:js', 'copy:libs', 'copy:img', 'copy:font'],
    'server',
    callback
    )
});

gulp.task("start", gulp.series("server"));
