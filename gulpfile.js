var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var streamqueue = require('streamqueue');
var gulp = require('gulp');
var cssMin = require('gulp-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var strip = require('gulp-strip-comments');
var clean = require('gulp-remove-empty-lines');
var static = require('node-static');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var prop = require('./gulp.json');


function getFolders(dir) {
  return fs.readdirSync(dir)
  .filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}
gulp.task('css',function(){
  
  gulp.src([
    '.dev/js/lib/ripples.min.css',
    '.dev/js/lib/bootstrap/dist/bootstrap.min.css',
    '.dev/js/lib/bootstrap-material-design/dist/bootstrap-material-design.min.css',
    './dev/css/main.css',
    './dev/css/app.css'])
  .pipe(concat('app.css'))
  .pipe(cssMin())
  .pipe(gulp.dest('./css'));
});
gulp.task('scripts',['libs','core']);
gulp.task('libs',function(){
  var libs = prop.libs;
  var srcList = [];
  for (var i = 0; i < libs.length; i++) {
    srcList.push('./dev/js/lib/'+libs[i]+'.js');
  }
  joinJs(srcList,'lib');
});
gulp.task('core',function(){
  var core = prop.core;
  var srcList = [];
  for (var i = 0; i < core.length; i++) {
    srcList.push('./dev/js/'+core[i]+'.js');
  }
  var sec = prop.secciones;
  for (var i = 0; i < sec.length; i++) {
    srcList.push('./dev/js/service/'+sec[i]+'Service.js');
    srcList.push('./dev/js/controller/'+sec[i]+'Ctrl.js');
  }
  minifyJs(srcList,'app');
});
gulp.task('watch', function () {
    watch('dev/js/*.js', batch(function (events, done) {
        gulp.start('core', done);
    }));
    watch(['dev/js/secciones/*.js','dev/js/service/*.js','dev/js/controller/*.js'], batch(function (events, done) {
        gulp.start('secciones', done);
    }));
});

function minifyJs(srcList,filename){

  gulp.src(srcList)
    .pipe(sourcemaps.init())
    .pipe(concat(filename+'.js'))
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'));
    
}
function joinJs(srcList,filename){

  gulp.src(srcList)
    .pipe(sourcemaps.init())
    .pipe(concat(filename+'.js'))
    .pipe(gulp.dest('./js'));
    
}

gulp.task('build',['css','scripts']);

gulp.task('serve',function () {
  var file = new static.Server({cache:-1});
  require('http').createServer(function (request, response) {
   request.addListener('end', function () {

    if(request.url.indexOf('.')>-1){
      if(request.url.indexOf('miparking') > -1) request.url = request.url.slice(11);
      file.serve(request, response);
    }
    else{
      file.serveFile('/index.html', 200, {}, request, response);
    }
  }).resume();
 }).listen(8082);
});

gulp.task('default', ['build','watch','serve']);
