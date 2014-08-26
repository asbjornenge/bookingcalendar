var gulp = require('gulp'),
	gutil = require('gulp-util'),
	path = require('path'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	react = require('gulp-react'),
	merge = require('merge-stream');


gulp.task('default', ['build'], function() {});

gulp.task('watch', ['build'], function() {
	gulp.watch(['src/*.js','src/*.jsx'], ['build']);
});

gulp.task('build', ['clean','lint'], function() {
	var jsStream = gulp.src('src/**/*.js');
	var jsxStream = gulp.src('src/**/*.jsx').pipe(react());
	return merge(jsStream, jsxStream)
		.pipe(concat('bookingcalendar.js'))
		.pipe(gulp.dest('dist'))
		.pipe(uglify())
		.pipe(rename('bookingcalendar.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});