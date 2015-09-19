var fs = require('fs');
var file = require('./file');
var _stylus = require('stylus');
var log = console.log;

module.exports = stylus

function stylus(_path,cb){

    if(!file.exists(_path)) return cb&&cb("no such file or directory '" + _path +"'")

    var str = file.read(_path);

    _stylus(str)
        .set('filename',_path)
        .render(function(err, css){
            cb&&cb(err,css);
        });
}