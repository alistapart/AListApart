'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './assets/sass/**/*.scss';
var output = './assets/css';
var sassOptions = { outputStyle: 'expanded' }; //expanded
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function () {
  return gulp.src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

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

gulp.task('default', ['sass', 'watch']);