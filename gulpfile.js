var gulp = require('gulp');
var server = require('gulp-server-livereload');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


//server
gulp.task('server', function() {
  gulp.src('app')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

//bower
gulp.task('bower', function () {
  gulp.src('app/*.html')
    .pipe(wiredep({
      directory:'app/bower_components'
    }))
    .pipe(gulp.dest('app'));
});
//sass
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

//autoprefixer
gulp.task('autoprefixer', function () {
	return gulp.src('app/css')
		.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'));
});

// //styles
// gulp.task('styles', function() {
//     return gulp.src('app/sass/**/*.sass')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
// 					browsers: ['last 15 versions'],
// 					cascade: false
// 				}))
//         .pipe(gulp.dest('app/css'));
// });