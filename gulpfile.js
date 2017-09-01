var gulp = require('gulp');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');
var bootlint = require('gulp-bootlint');

gulp.task('lint', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('scss-lint', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(scsslint());
});
gulp.task('bootlint', function() {
    return gulp.src(['index.html', '404.html'])
        .pipe(bootlint());
});

gulp.task('default', ['lint', 'scss-lint', 'bootlint']);
gulp.task('travis', ['lint', 'scss-lint', 'bootlint']);