var fs = require('fs');
var _watch = require('node-watch');
var color = require('colorful')
var log = console.log;

function watch(commander,build){

    // 过滤文件
    var filter = function(pattern, fn) {
        return function(filename) {
            if (pattern.test(filename)) {
                fn(filename);
            }
        }
    }

    var file = fs.readdirSync(process.cwd());

    log(color.green("Waiting...") );

    // only watch for md files
    _watch(file, filter(/\.md$/, function(filename) {
        log();
        console.log(color.blue(filename) + " changed!");
        build(commander);
    }));
}

module.exports = watch;