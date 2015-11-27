'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
//var sassdoc = require('sassdoc');
var concat = require('gulp-concat');
//var jsmin = require('gulp-jsmin');
//var rename = require('gulp-rename');


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './assets/sass/**/*.scss';
var output = './assets/css';
var sassOptions = { outputStyle: 'expanded' }; //expanded
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
//var sassdocOptions = { dest: './public/sassdoc' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp.src(input)
    //.pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat('style.css'))
    //.pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

// gulp.task('sassdoc', function () {
//   return gulp
//     .src(input)
//     .pipe(sassdoc(sassdocOptions))
//     .resume();
// });

// -----------------------------------------------------------------------------
// Minify .js
// -----------------------------------------------------------------------------

// gulp.task('jsmin', function () {
//     gulp.src('src/**/*.js')
//         .pipe(concat('app.js'))
//         .pipe(jsmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('./js'));
// });
// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// -----------------------------------------------------------------------------
// Production build
// -----------------------------------------------------------------------------

gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass((sassOptions)))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);