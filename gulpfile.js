var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var streamqueue = require('streamqueue');
var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var strip = require('gulp-strip-comments');
var clean = require('gulp-remove-empty-lines');
var static = require('node-static');
var header = require('gulp-header');

gulp.task('start', function () {
  var file = new static.Server({cache:-1});
    require('http').createServer(function (request, response) {
        request.addListener('end', function () {

            if(request.url.indexOf('.')>-1){
              if(request.url.indexOf('obp-webapp') > -1) request.url = request.url.slice(11);
              file.serve(request, response);
            }
            else{
              file.serveFile('/index.html', 200, {}, request, response);
            }
        }).resume();
    }).listen(8080);
});
