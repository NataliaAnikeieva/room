//плагины которые будут использоваться
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
		img: 'build/img/',
	},
	// Пути откуда брать исходники
	src: {
		pug: 'src/pug/*.pug', //берем все файлы с разширением паг из папки паг
		scss: 'src/scss/*.scss', //аналогично
		js: 'src/js/*.js', //аналогично
		fonts: 'src/fonts/**/*.*', //берем все файлы из всех папок с любым разширением
		img: 'src/img/**/*.*', //аналогично
	},
};
// таск для компиляции стилей
function styles() {
	return gulp
		.src(path.src.scss) //берем сцсс файлы
		.pipe(sourcemaps.init()) //строится карта стилей, что бы в браузере показывала с какого файла и на какой строке стиль
		.pipe(
			sass({
				includePaths: [path.src.scss],
				outputStyle: 'expanded',
				indentWidth: 4,
				errLogToConsole: true,
			}).on('error', sass.logError)
		) // компиляция сцсс с выбранными опциями. форматирование файла, отступы
		.pipe(
			autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
				cascade: false,
			})
		) //добавление префиксов для стилей у которых они есть
		.pipe(sourcemaps.write('./maps')) //запись файла карты стилей
		.pipe(gulp.dest(path.build.css)) //запись цсс
		.pipe(browserSync.stream()); //перезагрузка сервера
}
//таск для компиляции паг
function html() {
	return gulp
		.src(path.src.pug) //берем паг файлы
		.pipe(
			pug({
				pretty: true,
			})
		) //компиляция паг
		.on('error', function (err) {
			gutil.log(gutil.colors.red(err));
		}) //сообщение про ошибку если есть
		.pipe(gulp.dest(path.build.html)) //запись хтмл
		.pipe(browserSync.stream()); //перезагрузка сервера
}
//таск для джс
function js() {
	return gulp
		.src(path.src.js) //берем джс файлы
		.pipe(gulp.dest(path.build.js)) //запись джс файлов
		.pipe(browserSync.stream()); //перезагрузка сервера
}
//таск для фонтов
function fonts() {
	return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts)); //берем фонты и переносим их из папки срц в папку билд
}
//таск для ужимания картинок
function img() {
	return gulp
		.src(path.src.img) //берем картинки
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3, // 0 to 7
			}) //манипуляции с картинками
		)
		.pipe(gulp.dest(path.build.img)); //записываем их в папку с билдом после ужимания
}
//таск для вотчера
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
