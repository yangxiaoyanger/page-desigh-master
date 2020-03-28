const gulp = require('gulp');
// const cleanCSS = require('gulp-clean-css');
// const less = require('gulp-less');
// const rename = require('gulp-rename');
// const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin'); //压缩图片


// 编译less
// gulp.task('css', function () {
//   gulp.src('../src/styles/index.less')
//     .pipe(less())
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'ie > 8']
//     }))
//     .pipe(cleanCSS())
//     .pipe(rename('iview.css'))
//     .pipe(gulp.dest('../dist/styles'));
// });

gulp.task('images', function () {
  return gulp.src('../src/assets/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('../dist/assets'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

// // 拷贝字体文件
// gulp.task('fonts', function () {
//   gulp.src('../src/styles/common/iconfont/fonts/*.*')
//     .pipe(gulp.dest('../dist/styles/fonts'));
// });

// gulp.task('default', ['images']);

gulp.task('default', gulp.series('images'))