var init = require('./lib/init')

module.exports = function(commander){

    if (commander.init) {
        init.init(commander);
    }
}