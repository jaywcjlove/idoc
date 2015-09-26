var init    = require('./lib/init');
var build   = require('./lib/build');
var watch   = require('./lib/watch');
var server  = require('./lib/server');
var color   = require('colorful');
var path    = require('path');
var file    = require('./lib/file');

module.exports = function(commander){
    var pkgurl = path.resolve('package.json');

    if (commander.init) init(commander);

    if(!file.exists(pkgurl)){
        return console.log( color.red('\n Please initialization! Please run "idoc build" command! \n') );
    }
    if(commander.build){
        build(commander);
    }
    if(commander.watch){
        watch(commander,build);
    }
    if(commander.server){
        server(commander);
        watch(commander,build);
    }
}