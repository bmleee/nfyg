'use strict';
import gulp from 'gulp';
import gutil from 'gulp-util'; // for logging

// bower
import bower from 'gulp-bower';

// bootstrap
import bsConfig from 'gulp-bootstrap-configurator';

// css
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import bulkSass from 'gulp-sass-bulk-import';
import autoprefixer from 'gulp-autoprefixer';

// font
import googleWebFonts from 'gulp-google-webfonts';

// html, image
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';

import del from 'del'; // to delete dist/ driectory

import babel from 'gulp-babel';
import Cache from 'gulp-file-cache'; // dont't read unchanged file
let cache = new Cache();

import nodemon from 'gulp-nodemon'; // watch and restart express server

import webpack from 'gulp-webpack';
import webpackExpressConfig from './webpack.express.config';
import webpackBrowserConfig from './webpack.browser.config';
import webpackReactConfig from './webpack.react.config';

import browserSync from 'browser-sync';

const DIR = {
  SRC: 'src',
  PUBLIC: 'public',
	BIN: 'bin'
};

const SRC = {
  JS: DIR.SRC + '/assets/js/**/*.js',
  CSS: DIR.SRC + '/assets/css/**/*.css',
  SASS: [DIR.SRC + '/assets/sass/**/*.scss', 'src/react/**/*.scss'],
  FONTS: DIR.SRC + '/assets/fonts/**/*',
  HTML: DIR.SRC + '/**/*.html',
  IMAGES: DIR.SRC + '/assets/images/**/*',
  EXPRESS: 'src/express/**/*.js',
	REACT: 'src/react/**/*.js',
  BOWER: '/bower_components',
};

const DEST = {
  JS: DIR.PUBLIC + '/assets/js/',
  CSS: DIR.PUBLIC + '/assets/css/',
  SASS: DIR.PUBLIC + '/assets/css/',
  FONTS: DIR.PUBLIC + '/assets/fonts/',
  HTML: DIR.PUBLIC + '/',
  IMAGES: DIR.PUBLIC + '/assets/images/',
  EXPRESS: DIR.BIN,
	REACT: DIR.PUBLIC + '/',
  BOWER: DIR.PUBLIC + '/bower_components/',
};

// replaced with webpack-express
gulp.task('babel-express', () => {
  return gulp.src(SRC.EXPRESS)
    // .pipe( cache.filter() )
    .pipe( babel({
      presets: ['es2015'],
      plugins: ["transform-runtime", "transform-async-to-generator"]
    }) )
    // .pipe( cache.cache() )
    .pipe( gulp.dest(DEST.EXPRESS) )
});

gulp.task('webpack-react', () => {
  return gulp.src('src/react/App.js')
    .pipe( cache.filter() )
    .pipe( webpack(webpackReactConfig) )
    .pipe( cache.cache() )
    .pipe( gulp.dest(DEST.REACT) )
});

gulp.task('webpack-browser', () => {
	return gulp.src('src/assets/js/main.js')
    .pipe( cache.filter() )
		.pipe( webpack(webpackBrowserConfig) )
    .pipe( cache.cache() )
		.pipe( gulp.dest(DEST.JS) )
});

gulp.task('webpack-express', () => {
  return gulp.src('src/express/app.js')
    .pipe( cache.filter() )
    .pipe( webpack(webpackExpressConfig) )
    .pipe( cache.cache() )
    .pipe( gulp.dest(DEST.EXPRESS) )
});

gulp.task('bootstrap', ['bootstrap-css', 'bootstrap-js'], () => {
  // Do nothing. Just chaining
})

gulp.task('bootstrap-css', () => {
  return gulp.src('./bootstrap.config.json')
    .pipe( bsConfig.css({
      compress: true,
      bower: false, // use node_modules/bootstrap
    }) )
    .pipe( gulp.dest(DEST.CSS) );
});

gulp.task('bootstrap-js', () => {
  return gulp.src('./bootstrap.config.json')
    .pipe( bsConfig.js({
      compress: true,
      bower: false, // use node_modules/bootstrap
    }) )
    .pipe( gulp.dest(DEST.JS) );
});

gulp.task('css', () => {
  return gulp.src(SRC.CSS)
    .pipe( cleanCSS({compatibility: 'ie8'}) )
    .pipe( autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }) )
    .pipe( gulp.dest(DEST.CSS) );
});

gulp.task('sass', () => {
  return gulp.src(SRC.SASS)
    .pipe( bulkSass() )
    .pipe( sass({ includePaths: ['./src/react/components'] }).on('error', sass.logError) )
    .pipe( autoprefixer({
      // browsers: ['Chrome, FireFox, Explorer, Edge, iOS, Safari, ExplorerMobile'],
      browsers: ['> 5%'],
      cascade: false
    }) )
    .pipe( cleanCSS({compatibility: 'ie8'}) )
    .pipe( gulp.dest(DEST.SASS) )
});

gulp.task('fonts', () => {
  return gulp.src(SRC.FONTS)
    .pipe( gulp.dest(DEST.FONTS) );
});

gulp.task('google-web-fonts', () => {
  return gulp.src('./fonts.list')
    .pipe( googleWebFonts({
      fontsDIr: 'googlefonts/',
      cssFilename: 'googlefonts.css'
    }) )
    .pipe( gulp.dest(DEST.FONTS) );
});

gulp.task('html', () => {
  return gulp.src(SRC.HTML)
    .pipe( htmlmin({collapseWhitespace: true}) )
    .pipe( gulp.dest(DEST.HTML) );
});

gulp.task('images', () => {
  return gulp.src(SRC.IMAGES)
    .pipe( imagemin() )
    .pipe( gulp.dest(DEST.IMAGES) );
});

gulp.task('bower', () => {
  return bower({ directory: './public/bower_components', cwd: __dirname })
    .pipe( gulp.dest(DEST.BOWER) );
});

gulp.task('clean', () => {
  return del.sync([
    'public/assets/',
    'public/bower_components/',
    'public/*.js',
    'public/*.html',
    DIR.BIN,
  ]);
});

gulp.task('watch', () => {
  let watcher = {
    // babel_express: gulp.watch(SRC.EXPRESS, ['babel-express']),
		webpack_react: gulp.watch(SRC.REACT, ['webpack-react']),
		webpack_browser: gulp.watch(SRC.JS, ['webpack-browser']),
    webpack_express: gulp.watch(SRC.EXPRESS, ['webpack-express']),
    css: gulp.watch(SRC.CSS, ['css']),
    sass: gulp.watch(SRC.SASS, ['sass']),
    google_web_fonts: gulp.watch('./fonts.list', ['google-web-fonts']),
    html: gulp.watch(SRC.HTML, ['html']),
    images: gulp.watch(SRC.IMAGES, ['images']),
    bootstrap: gulp.watch('./bootstrap.config.json', ['bootstrap']),
    // babel: gulp.watch(SRC.SERVER, ['babel']),
  };

  let notify = (event) => {
    gutil.log(`File ${gutil.colors.yellow(event.path)} was ${gutil.colors.magenta(event.type)}`);
  }

  for(let key in watcher) watcher[key].on('change', notify);
});



// gulp.task('start', ['babel-express'], () => {
gulp.task('start', ['webpack-express'], () => {
  return nodemon({
    // execMap: {
    //   js: 'node_modules/.bin/node-inspector & node --debug'
    //   // js: 'node --inspect --debug-brk' // for Node.js 6.3+. ref to https://github.com/node-inspector/node-inspector/issues/905 ,https://github.com/node-inspector/node-inspector/issues/905#issuecomment-251864127
    // },
    // ext: 'js',
    // ignore: ['.idea/*', 'node_modules/*'],
    script: DEST.EXPRESS + '/express-server.js',
    watch: DEST.EXPRESS,
    verbose: true,
  })
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    port: 7000
  })
});

gulp.task('default', [
  'clean', 'bower',
  'webpack-browser', 'webpack-react', 'webpack-express',
  'css', 'sass', 'fonts', 'google-web-fonts',
  'html', 'images', 'bootstrap',
  'start', 'watch',
  // 'browser-sync',
], () => {
  gutil.log('Gulp is running')
});
