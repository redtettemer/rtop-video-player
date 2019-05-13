 var gulp         = require('gulp'),
     sass         = require('gulp-sass'),
     plumber      = require('gulp-plumber'),
     combine      = require('gulp-scss-combine'),
     concat       = require('gulp-concat'),
     notify       = require('gulp-notify');

 var config = {
     src           : './src/*.scss',
     dest          : './dist/css/'
 };

 // Error message
 var onError = function (err) {
     notify.onError({
         title   : 'Gulp',
         subtitle: 'Failure!',
         message : 'Error: <%= error.message %>',
         sound   : 'Beep'
     })(err);

     this.emit('end');
 };

 // Compile CSS
   gulp.task('styles', function () {
       var stream = gulp
           .src([config.src])
           .pipe(plumber({errorHandler: onError}))
           .pipe(combine())
           .pipe(concat('rtop.videoPlayer.1.0.1.min.scss'))
           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError));
    
       return stream
           .pipe(gulp.dest('./dist/css/'));
   });

  gulp.task('watch', function() {
    gulp.watch(config.src, gulp.series('styles'));
  });