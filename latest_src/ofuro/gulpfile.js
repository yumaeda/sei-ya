var gulp      = require('gulp'), 
    concat    = require('gulp-concat'),
    sass      = require('gulp-sass');

gulp.task('default', [ 'sass' ], function(){});

gulp.task('sass', function()
{
    return gulp.src('../common/sass/**/*.scss')
        .pipe(concat('index.min.css'))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./build'));
});

