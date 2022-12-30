const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	pug = require('gulp-pug'),
	gutil = require('gulp-util'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();
// PATH
const path = {
	// Пути, куда складывать готовые после сборки файлы
	build: {
		html: 'build/',
		css: 'build/css/',
		js: 'build/js/',
		fonts: 'build/fonts/',
		img: 'build/images/',
	},
	// Пути откуда брать исходники
	src: {
		pug: 'src/pug/*.pug',
		scss: 'src/scss/*.scss',
		js: 'src/js/*.js',
		fonts: 'src/fonts/**/*.*',
		img: 'src/images/**/*.*',
	},
};

function styles() {
	return gulp
		.src(path.src.scss)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				includePaths: [path.src.scss],
				outputStyle: 'expanded',
				indentWidth: 4,
				errLogToConsole: true,
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
				cascade: false,
			})
		)
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
}
function html() {
	return gulp
		.src(path.src.pug)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.on('error', function (err) {
			gutil.log(gutil.colors.red(err));
		})
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream());
}
function js() {
	return gulp
		.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream());
}
function fonts() {
	return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
}
function img() {
	return gulp
		.src(path.src.img)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3, // 0 to 7
			})
		)
		.pipe(gulp.dest(path.build.img));
}
function watcher() {
	browserSync.init({
		server: {
			baseDir: './build',
			index: '/index.html',
		},
	});
	gulp.watch(path.src.scss, styles).on('change', browserSync.reload);
	gulp.watch(path.src.pug, html);
	gulp.watch(path.src.js, js);
	gulp.watch(path.src.fonts, fonts);
	gulp.watch(path.src.img, img);
}
exports.styles = styles;
exports.html = html;
exports.js = js;
exports.fonts = fonts;
exports.img = img;
exports.watch = watcher;
