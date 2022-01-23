const exec = require('child_process').exec;
const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const ggm = require('gulp-gm');
const gm = require('gm');
const rename = require('gulp-rename');
const theme = require('../gui/theme');

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

  [144, 152, 256, 512, 1024].forEach(function (size) {
    gulp.src('tmp/logo0001.png')
      .pipe(ggm(function (/** @type { gm.State } */ gmfile, done) {
        gmfile = gmfile
          .resize(size)
          .background('transparent')
          .fill(theme.themeColors.secondary);
        
        if (size >= 512) {
          gmfile = gmfile
            .fill(theme.themeColors.primary)
            .stroke(theme.themeColors.secondary)
            .strokeWidth(size/334);
        }

        gmfile.size(function (err, imageSize) {
          done(null, gmfile
            .extent(size, size)
            .font('Potra.ttf', size/6)
            .drawText(0, size/64, 'Helios', 'south')
            // .flatten()
          )
        });
      }))
      .pipe(rename(function (path) { path.basename = `logo_${size}wh`; }))
      .pipe(gulp.dest('dist'))
  });

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