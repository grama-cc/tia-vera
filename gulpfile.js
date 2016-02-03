'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require('del');


var isProduction = false;


gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(gulpif(isProduction, minifyCss({compatibility: 'ie10'})))
    .pipe(gulpif(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
  gulp.src([
      './js/main.js'
    ])
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest('./build/js'));

  gulp.src([
      './node_modules/jquery/dist/jquery.js',
    ])
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(concat('libs.js'))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('clean:map', function () {
  return del([
    './build/**/*.map'
  ]);
});

gulp.task('set:production', function () {
  isProduction = true;
});

gulp.task('default', ['sass', 'js']);

gulp.task('watch', ['default'], function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('production', ['set:production', 'default', 'clean:map']);
