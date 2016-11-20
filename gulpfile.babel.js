'use strict';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util'; // for logging
import environments from 'gulp-environments';
import runSequence from 'run-sequence';

let development = environments.development;
let production = environments.production;


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

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackExpressConfig from './webpack.express.config';
import webpackBrowserConfig from './webpack.browser.config';
import webpackReactConfig from './webpack.react.config';


import browserSync from 'browser-sync';
import { DEV_PORT } from './env';

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

const ENTRY = {
  EXPRESS: 'src/express/app.js',
  REACT: 'src/react/App.js',
  BROWSER: 'src/assets/js/main.js'
}

// helper functions
const buildDone = (err, stats) => {
  if(err) throw new gutil.PluginError("webpack", err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunkModules: false,
    assets: false,
    version: false,
    hash: false
  }))
};

const watcherRunner = (watcher) => {
  let notify = (event) => {
    gutil.log(`File ${gutil.colors.yellow(event.path)} was ${gutil.colors.magenta(event.type)}`);
  }

  for(let key in watcher) watcher[key].on('change', notify);
}


gulp.task('dev', ['dev:react', 'dev:browser', 'dev:express'], () => {})
gulp.task('dev:react', () => {
  return gulp.src(ENTRY.REACT)
    .pipe( cache.filter() )
    .pipe(webpackStream(webpackReactConfig, webpack, buildDone))
    .pipe( cache.cache() )
    .pipe(gulp.dest(DEST.REACT))
})
gulp.task('dev:browser', () => {
  return gulp.src(ENTRY.BROWSER)
    .pipe( cache.filter() )
    .pipe(webpackStream(webpackBrowserConfig, webpack, buildDone))
    .pipe( cache.cache() )
    .pipe(gulp.dest(DEST.JS))
})
gulp.task('dev:express', () => {
  return gulp.src(ENTRY.EXPRESS)
    .pipe( cache.filter() )
    .pipe(webpackStream(webpackExpressConfig, webpack, buildDone))
    .pipe( cache.cache() )
    .pipe(gulp.dest(DEST.EXPRESS))
})

const bundler = webpack(webpackReactConfig);

gulp.task('bootstrap', ['bootstrap:css', 'bootstrap:js'], () => {})
gulp.task('bootstrap:css', () => {
  return gulp.src('./bootstrap.config.json')
    .pipe( bsConfig.css({
      compress: true,
      bower: false, // use node_modules/bootstrap
    }) )
    .pipe( gulp.dest(DEST.CSS) );
});
gulp.task('bootstrap:js', () => {
  return gulp.src('./bootstrap.config.json')
    .pipe( bsConfig.js({
      compress: true,
      bower: false, // use node_modules/bootstrap
    }) )
    .pipe( gulp.dest(DEST.JS) );
});

gulp.task('assets', ['css', 'sass', 'fonts', 'google-web-fonts', 'images', 'html', 'bower']);
gulp.task('assets:watch', ['assets', 'watch:assets']);
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
gulp.task('images', () => {
  return gulp.src(SRC.IMAGES)
    .pipe( imagemin() )
    .pipe( gulp.dest(DEST.IMAGES) );
});
gulp.task('html', () => {
  return gulp.src(SRC.HTML)
    .pipe( htmlmin({collapseWhitespace: true}) )
    .pipe( gulp.dest(DEST.HTML) );
});
gulp.task('bower', () => {
  return bower({ directory: './public/bower_components', cwd: __dirname })
    .pipe( gulp.dest(DEST.BOWER) );
});

gulp.task('clean', () => {
  return del.sync([
    'public/assets/',
    'public/bower_components',
  ]);
});

gulp.task('watch:assets', () => {
  let watcher = {
    css: gulp.watch(SRC.CSS, ['css']),
    sass: gulp.watch(SRC.SASS, ['sass']),
    google_web_fonts: gulp.watch('./fonts.list', ['google-web-fonts']),
    html: gulp.watch(SRC.HTML, ['html']),
    images: gulp.watch(SRC.IMAGES, ['images']),
    bootstrap: gulp.watch('./bootstrap.config.json', ['bootstrap']),
    dist_browser: gulp.watch(SRC.JS, ['dist:browser']),
  };

  watcherRunner(watcher);
});

gulp.task('start', () => {
  return nodemon({
    script: DEST.EXPRESS + '/express-server.js',
    watch: DEST.EXPRESS,
    verbose: true,
    env: { 'DEBUG': 'express:*' }
  })
});

gulp.task('default', [

], () => {
  runSequence(
    'clean',
    ['bower', 'assets:watch'],
    'start',
    'dev',
  );
  gutil.log('Gulp is running');
});
