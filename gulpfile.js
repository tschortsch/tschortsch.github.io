var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var sassLint = require('gulp-sass-lint');
var bootlint = require('gulp-bootlint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('./assets/scss/styles.scss')
        .pipe(sass(
            {
                outputStyle: 'compressed'
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('scripts-website', function() {
    return gulp.src('./assets/js/scripts.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('scripts-fontawesome', function() {
    return gulp.src('./assets/js/fontawesome/packs/custom.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/js/fontawesome/packs'));
});

gulp.task('scripts', ['scripts-website', 'scripts-fontawesome']);

gulp.task('lint', function() {
    return gulp.src('./assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('sass-lint', function() {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sassLint(
            {
                rules: {
                    'property-sort-order': 0,
                    'force-element-nesting': 0,
                    'force-pseudo-nesting': 0,
                    'no-ids': 0
                }
            }
        ))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});
gulp.task('bootlint', function() {
    return gulp.src(['index.html', '404.html'])
        .pipe(bootlint());
});

gulp.task('default', ['lint', 'sass-lint', 'bootlint']);
gulp.task('travis', ['lint', 'sass-lint', 'bootlint']);
