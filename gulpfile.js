var gulp = require('gulp');

gulp.task('default', [ 'sass', 'eslint' ], function(){});

gulp.task('sass', function()
{
    const sass = require('gulp-sass');

    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./build/common/css'));
});

gulp.task('eslint', function()
{
    const eslint = require('gulp-eslint');

    return gulp.src('./latest_src/common/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

