var init    = require('./lib/init');
var build   = require('./lib/build');
var watch   = require('./lib/watch');
var server  = require('./lib/server');
var file    = require('./lib/file');
var clean   = require('./lib/clean');
var color   = require('colorful');
var path    = require('path');

module.exports = function(commander){
    var pkgurl = path.resolve('package.json');

    if (commander.init) init(commander);

    if(!commander.init && !file.exists(pkgurl)){
        return console.log( color.red('\n In the project root directory to initialize, run the "IDoc init" command. \n') );
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
    if(commander.clean){
        clean(commander);
    }
}