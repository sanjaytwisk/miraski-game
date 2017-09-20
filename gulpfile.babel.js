'use strict';

import config from './config';
import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import cleanCSS from 'gulp-clean-css';
import webpack from 'webpack';
import browsersync from 'browser-sync';
import runSequence from 'run-sequence';
import watch from 'gulp-watch';
import del from 'del';
import rename from 'gulp-rename';
import webpackConfig from './webpack.config';

/**
 * Task: delete dist
 */
gulp.task('del', () =>  del.sync(config.dist));

/**
 * Task: nunjucks to html
 */
gulp.task('html', () =>
   gulp.src(config.html.src)
      .pipe(nunjucks.compile({ baseUrl: config.baseUrl, saveUrl: config.saveUrl }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest(config.html.dist))
      .pipe(browsersync.stream()));

/**
 * Task: scss to css
 */
gulp.task('css', () =>
   gulp.src(config.css.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer()]))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.css.dist))
      .pipe(browsersync.stream())
);

/**
 * Task: bundle js
 */
gulp.task('js:bundle', cb => {
    let setup = false;
    webpack(webpackConfig, (err, stats) => {
         if(err) return console.log(err);
         browsersync.reload();

         if (!setup) {
            cb();
            setup = true;
         }
   });
});

/**
 * Task: copy vendor js
 */
gulp.task('js:vendor', () =>
    gulp.src(config.js.src.vendor)
      .pipe(gulp.dest(config.js.dist))
);

/**
 * Task: copy model files
 */
gulp.task('models', () =>
   gulp.src(config.models.src)
      .pipe(gulp.dest(config.models.dist))
      .pipe(browsersync.stream())
);

/**
 * Task: copy images
 */
gulp.task('images', () =>
   gulp.src(config.images.src)
      .pipe(gulp.dest(config.images.dist))
      .pipe(browsersync.stream())
);

/**
 * Task: copy audio
 */
gulp.task('audio', () =>
   gulp.src(config.audio.src)
      .pipe(gulp.dest(config.audio.dist))
      .pipe(browsersync.stream())
);

/**
 * Task: watch
 */
gulp.task('watch', cb => {
   watch(config.css.watch, () => gulp.start('css'));
   watch(config.html.watch, () => gulp.start('html'));
   watch(config.js.src.vendor, () => gulp.start('js:vendor'));
   watch(config.models.src, () => gulp.start('models'));
   watch(config.audio.src, () => gulp.start('audio'));
   watch(config.images.src, () => gulp.start('images'));
   cb();
});

/**
 * Task: start browsersync
 */
gulp.task('browsersync', () =>{
   browsersync.init({
      server: {
         baseDir: config.dist
      },
      ui: false,
      open: false
   });
});

gulp.task('dist', cb => {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
    runSequence(
        'del',
        ['html', 'css', 'js:bundle', 'js:vendor', 'models', 'images', 'audio'],
        cb
    );
});

gulp.task('dev', cb => {
    webpackConfig.watch = true;
    runSequence(
        'del',
        ['html', 'css', 'js:bundle', 'js:vendor', 'models', 'images', 'audio'],
        'watch',
        'browsersync',
        cb
    );
});
