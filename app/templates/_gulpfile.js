var gulp = require('gulp');
var coffee = require('gulp-coffee');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');

// For dealing with Mocha errors
var watching = false;

function onError(err) {
    console.log(err.toString());
    if (watching) {
        this.emit('end');
    } else {
        // if you want to be really specific
        process.exit(1);
    }
}
// End Mocha errors


// compiles everything - tests and builds
gulp.task('compile', function(){
    return gulp.src(['src/**/*.coffee'])
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('build'));
});




gulp.task('test', ['compile'], function () {
    return gulp.src('build/test/**/*.js', { read: false })
        .pipe(cover.instrument({
            pattern: ['build/app/**/*.js'],
            debugDirectory: 'build/debug'
        }))
        .pipe(mocha().on("error", onError))
        .pipe(cover.report({
            outFile: 'build/coverage.html'
        }))
        .pipe(cover.enforce({
            statements: 75,
            blocks: 75,
            lines: 75,
            uncovered: 1
        }));
});


gulp.task('watch', function(){
    watching = true;
    gulp.watch(['src/**/*.coffee'],['compile','test']);
});