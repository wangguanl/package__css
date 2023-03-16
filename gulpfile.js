// 引入依赖模块
const fs = require('fs'),
  gulp = require('gulp'),
  buildCSS = require('./build/buildCSS');

const config = {
  input: __dirname + '/src',
  output: __dirname + '/dist',
};
gulp.task('buildCSS', () =>
  buildCSS([`${config.input}/*.css`, `${config.input}/*.scss`], config.output)
);
gulp.task('buildSCSS', () =>
  gulp.src([`${config.input}/static/*.scss`]).pipe(gulp.dest(config.output))
);

gulp.task('removeDir', done => {
  removeDir(config.output);
  done();
});
function removeDir(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        removeDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
gulp.task(
  'default',
  gulp.series('removeDir', gulp.parallel('buildCSS', 'buildSCSS'))
);
