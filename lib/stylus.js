var fs = require('fs');
var file = require('./file');
var _stylus = require('stylus');
var log = console.log;
var autoprefixer = require('autoprefixer-stylus');
var browserslist = ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'];

module.exports = stylus

function stylus(_path,cb){

    if(!file.exists(_path)) return cb&&cb("no such file or directory '" + _path +"'")

    var str = file.read(_path);

    _stylus(str)
        .set('filename',_path)
        .set('compress',true)
        .use(autoprefixer({ browsers: browserslist }))
        .render(function(err, css){
            cb&&cb(err,css);
        });
}