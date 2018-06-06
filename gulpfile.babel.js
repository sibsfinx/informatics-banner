'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import pjson from './package.json';
import minimist from 'minimist';
import path from 'path';
import awspublish from 'gulp-awspublish';
import parallelize from 'concurrent-transform';
import keys from './config/keys.js'

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

let config = pjson.config;
let args = minimist(process.argv.slice(2));
//let dirs = config.directories;
let dirs = {
  destination: './dist',
  temporary: './tmp'
}
//let taskTarget = (args.production || args.staging) ? dirs.destination : dirs.temporary;
let taskTarget = dirs.destination;

let build = dirs.destination;
const threads = 10;
let publishers = {};

// Default task
gulp.task('default', [], () => {
});

publishers.production = awspublish.create({
  region: keys.s3.production.region,
  params: {
    Bucket: keys.s3.production.bucket
  },
  accessKeyId: keys.s3.production.key,
  secretAccessKey: keys.s3.production.secret
});

publishers.staging = awspublish.create({
  region: keys.s3.staging.region,
  params: {
    Bucket: keys.s3.staging.bucket
  },
  accessKeyId: keys.s3.staging.key,
  secretAccessKey: keys.s3.staging.secret
});

let upload = function (publisher) {
  return gulp.src([
    path.join(build, '**/*')
  ])
  .pipe(parallelize(publisher.publish(), threads))
  // delete old files from the bucket
  //.pipe(publisher.sync())
  // create a cache file to speed up consecutive uploads
  .pipe(publisher.cache())
  // print upload updates to console
  .on('error', function(err) {
    plugins.util.log(
      plugins.util.colors.red('s3 upload error:'),
      '\n',
      err,
      '\n'
    );
    this.emit('end');
  })
  .pipe(awspublish.reporter());
}

gulp.task('ghPages', function() {
  return gulp.src([
    path.join(build, '**/*')
  ])
  .pipe(ghPages())
  .on('error', function(err) {
    plugins.util.log(
      plugins.util.colors.red('Github pages upload error:'),
      '\n',
      err,
      '\n'
    );
    this.emit('end');
  });
});


// Upload to s3 production
gulp.task('s3:production', function () {
  plugins.util.log(
    'updating:',
    keys.s3.production.bucket + 's3-website.' + keys.s3.production.region + '.amazonaws.com/'
  );
  upload(publishers.production);
});

gulp.task('s3:staging', function () {
  plugins.util.log(
    'updating:',
    keys.s3.staging.bucket + 's3-website.' + keys.s3.staging.region + '.amazonaws.com/'
  );
  upload(publishers.staging);
});


