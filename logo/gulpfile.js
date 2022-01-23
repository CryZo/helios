const exec = require('child_process').exec;
const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const sharpResponsive = require('gulp-sharp-responsive');
const rename = require('gulp-rename');

function render(cb) {
  // exec('blender -b logo.blend -o tmp/logo -f 1', function (err, stdout, stderr) {
  //   cb(err);
  // });
  cb();
}

function scale(cb) {
  [32, 64, 144, 152, 256, 512, 1024].forEach(function (size) {
    gulp.src('tmp/logo0001.png')
      .pipe(imageResize({ height: size }))
      .pipe(rename(function (path) { path.basename = `logo_${size}h`; }))
      .pipe(gulp.dest('dist'))
  });

  // [144, 152, 256, 512, 1024].forEach(function (size) {
  //   gulp.src('tmp/logo0001.png')
  //     .pipe(imageResize({
  //       height: size,
  //       width: size,
  //       cover: true
  //     }))
  //     .pipe(rename(function (path) { path.basename = `logo_${size}wh`; }))
  //     .pipe(gulp.dest('dist'))
  // });

  [16, 32, 64].forEach(function (size) {
    gulp.src('tmp/logo0001.png')
      .pipe(imageResize({
        height: size,
        width: size,
        crop: true,
      }))
      .pipe(rename(function (path) { path.basename = `fav_${size}`; }))
      .pipe(gulp.dest('dist'))
  });

  cb();
}

// function scale(cb) {
//   let formats = [];


//   [32, 64, 144, 152, 256, 512, 1024].forEach(function (size) {
//     formats.push({
//       height: size,
//       rename: {
//         basename: `logo_${size}h`
//       },
//     })
//   });

//   gulp.src('tmp/logo0001.png')
//   .pipe(sharpResponsive({formats}))
//   .pipe(gulp.dest("dist"));


//   // [144, 152, 256, 512, 1024].forEach(function (size) {
//   //   gulp.src('tmp/logo0001.png')
//   //     .pipe(imageResize({
//   //       height: size,
//   //       width: size,
//   //     }))
//   //     .pipe(rename(function (path) { path.basename = `logo_${size}wh`; }))
//   //     .pipe(gulp.dest('dist'))
//   // });

//   // [16, 32, 64].forEach(function (size) {
//   //   gulp.src('tmp/logo0001.png')
//   //     .pipe(imageResize({
//   //       height: size,
//   //       width: size,
//   //       crop: true,
//   //     }))
//   //     .pipe(rename(function (path) { path.basename = `fav_${size}`; }))
//   //     .pipe(gulp.dest('dist'))
//   // });

//   cb();
// }

exports.default = gulp.series(render, scale);