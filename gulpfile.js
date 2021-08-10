'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var injectHTML = require('gulp-inject-in-html');
var imagemin = require('gulp-imagemin');

function buildStyles() {
  return gulp.src(['src/assets/styles/scss/**/*.scss', 'src/assets/styles/**/*.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browserSync.stream());
};

function copyHtml() {
	return gulp.src('src/**/*.html')
		.pipe(injectHTML())
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream());
};

// function copyImg() {
// 	return gulp.src('src/assets/images/*')
// 		.pipe(gulp.dest('build/assets/images'))
// 		.pipe(browserSync.stream());
// };

function compressImages() {
	return gulp.src('src/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/assets/images'))
		.pipe(browserSync.stream());
};

function copyFonts() {
	return gulp.src('src/assets/fonts/*')
		.pipe(gulp.dest('build/assets/fonts'))
		.pipe(browserSync.stream());
};


function serve() {
	browserSync({
		server: 'build/'
	});

	gulp.watch(['src/assets/styles/**/*.scss', 'src/**/*.html'], gulp.series('buildStyles', 'copyHtml', 'copyFonts', 'compressImages'));
	// gulp.watch(['src/assets/styles/**/*.scss', 'src/**/*.html'], gulp.series(reload));
};


exports.buildStyles = buildStyles;
exports.copyHtml = copyHtml;
// exports.copyImg = copyImg;
exports.serve = serve;
exports.compressImages = compressImages;
exports.copyFonts = copyFonts;