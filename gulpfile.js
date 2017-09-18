"use strict";
var gulp = require('gulp');
var server = require('gulp-server-livereload'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    concatCss = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uncss = require('gulp-uncss'),
    del = require('del'),
    pug = require('gulp-pug'),
    smartgrid = require('smart-grid'),
    gcmq = require('gulp-group-css-media-queries');




//Styles
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        // .pipe(concatCss('main.css'))
        // .pipe(uncss({
        //     html: ['app/**/*.html']
        // }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/html/**/*.pug', ['html']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('bower.json', ['bower']);
});



//Bower
gulp.task('bower', function() {
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});


//HTML
gulp.task('html', function() {
    return gulp.src('app/html/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('app'))
    .pipe(browserSync.stream());
});


//Images
gulp.task('images', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('build/img'));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
});

//Clean
gulp.task('clean', function() {
    return del.sync('build');
});

//Build
gulp.task('build', ['fonts', 'images', 'clean'], function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest('./build'));

});


gulp.task('default', ['watch']);