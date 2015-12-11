var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $smap = require('gulp-sourcemaps'),
    $tsc = require('gulp-typescript'),
    $replace = require('gulp-replace'),
    $insert = require('gulp-insert'),
    pkg = require('./package.json'),
    id = pkg.name.split('.')[1].toUpperCase();

$gulp.task('lint', function () {
    return $gulp.src('lib/**/*.ts')
        .pipe($lint())
        .pipe($lint.report('prose'));
});

$gulp.task('dist', function () {
    var ts = $gulp.src('lib/@module.ts')
            .pipe($smap.init())
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                outFile: pkg.name + '.js'
            })));
    return ts.js
        .pipe($replace(/\$\{BIGINE_C2D_VERSION\}/, pkg.version))
        .pipe($insert.prepend('var __Bigine_Util = require("bigine.util");\n'))
        .pipe($insert.append('module.exports = ' + id + ';'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('tsd', ['lint'], function () {
    var ts = $gulp.src('lib/@module.ts')
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                declaration: true,
                removeComments: true
            })));
    return ts.dts
        .pipe($replace('    import Util = __Bigine_Util;\n', ''))
        .pipe($replace('}\ndeclare namespace ' + id + ' {\n', ''))
        .pipe($replace('\ndeclare namespace ' + id + ' {\n', '\ndeclare namespace __Bigine_' + id + ' {\n    import Util = __Bigine_Util;\n'))
        .pipe($insert.append('\ndeclare module "bigine.' + id.toLowerCase() + '" {\n    export = __Bigine_' + id + ';\n}\n'))
        .pipe($gulp.dest('.'));
});

$gulp.task('watch', function () {
    return $gulp.watch('lib/**/*.ts', ['tsd', 'dist']);
});

$gulp.task('default', ['tsd', 'dist']);
