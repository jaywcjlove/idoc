var init = require('./lib/init');
var build = require('./lib/build');
var watch = require('./lib/watch');
var server = require('./lib/server');

module.exports = function(commander){

    if (commander.init) {
        init(commander);
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