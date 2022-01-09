const exec = require('child_process').exec;
const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
var rename = require('gulp-rename');

function render(cb) {
  exec('blender -b logo.blend -o tmp/logo -f 1', function (err, stdout, stderr) {
    cb(err);
  });
}

function scale(cb) {
  [32, 64, 256, 512, 1024].forEach(function (size) {
    gulp.src('tmp/logo0001.png')
      .pipe(imageResize({ height: size, imageMagick: true }))
      .pipe(rename(function (path) { path.basename = `logo_${size}h`; }))
      // .pipe(imagemin())
      .pipe(gulp.dest('dist'))
  });

  [16, 32, 64].forEach(function (size) {
    gulp.src('tmp/logo0001.png')
      .pipe(imageResize({
        height: size,
        width: size,
        imageMagick: true,
        crop: true,
        gravity: 'Center'
      }))
      .pipe(rename(function (path) { path.basename = `fav_${size}`; }))
      // .pipe(imagemin())
      .pipe(gulp.dest('dist'))
  });

  cb();
}

exports.default = gulp.series(render, scale);