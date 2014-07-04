var gulp = require('gulp');
var sass = require('gulp-sass');/*
var livereload = require('gulp-livereload');*/
//var minifyCss = require('gulp-minify-css');



gulp.task('sass', function () {
    gulp.src('styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('styles/css/'));
});
/*
gulp.task('styles', function (){
  gulp.src('styles/css/*.css')
    .pipe(livereload())
});*/

gulp.task('watch', function (){
  //gulp.watch('styles/css/*.css', ['styles']);
    gulp.watch('styles/scss/*.scss', ['sass']);
});


gulp.task('default', ['sass'/*,'styles'*/, 'watch']);