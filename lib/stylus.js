var fs = require('fs');
var file = require('./file');
var _stylus = require('stylus');
var path = require('path')
var log = console.log;
var autoprefixer = require('autoprefixer-stylus');
var browserslist = ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 8', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'];

module.exports = stylus

function stylus(_path,cb){

    var files = file.currentFile(_path)

    for (var i = 0; i < files.length; i++) {

        var _fileurl = _path + files[i],
            _extname = path.extname(_fileurl),
            _filename = path.basename(_fileurl, '.styl');

        if(_extname === '.styl'){
            
            if(!file.exists(_fileurl)) return cb&&cb("no such file or directory '" + _fileurl +"'");

            _stylus(file.read(_fileurl))
                .set('filename',_fileurl)
                .set('compress',true)
                .use(autoprefixer())
                .render(function(err, css){
                    cb&&cb(err,css,_filename,_extname);
                });
        }

    };

}