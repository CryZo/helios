const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const { spawn } = require('child_process')
const fs = require('fs');


function buildBackend() {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
}

function buildLogo(cb) {
    if (!fs.existsSync('logo/dist')) {
        const child = spawn('npx', ['gulp'], {cwd: 'logo'});

        child.addListener('exit', () => {
            cb();
        });
    }
    else {
        cb();
    }
}

function copyLogo() {
    return gulp.src('./logo/dist/*.png')
      .pipe(gulp.dest('./gui/public/img/logos'));
}

function buildGui(cb) {
    const child = spawn('npx', ['vue-cli-service', 'build'], {cwd: 'gui'});
    child.addListener('exit', () => {
        cb();
    });
}

function copyGui() {
    return gulp.src('./gui/dist/**/*.*')
      .pipe(gulp.dest('./dist/public'));
}

gulp.task("buildAll", gulp.parallel(
    buildBackend,
    gulp.series(
        buildLogo,
        copyLogo,
        buildGui,
        copyGui
    )
));
