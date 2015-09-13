var init = require('./lib/init');
var build = require('./lib/build');

module.exports = function(commander){

    if (commander.init) {
        init(commander);
    }
    if(commander.build){
        build(commander);
    }
}