var fs = require('fs');
var chokidar = require('chokidar');
var color = require('colorful');
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
    log(color.blue("idoc is running. Press Ctrl+C to stop."));
    log();

    var now = new Date();

    var watcher = chokidar.watch(process.cwd()+'/md', {
        ignored: /[^\.md]$/,
        persistent: true
    });
    
    watcher
        .on('add', function(path) { log('File', path.replace(process.cwd(),''), 'has been added'); })
        .on('change', function(path) { 
            build(commander,path);
            log('File', path.replace(process.cwd(),''), 'has been changed'); 
        })
        .on('unlink', function(path) { log('File', path.replace(process.cwd(),''), 'has been removed'); })
        // More events. 
        .on('addDir', function(path) { log('Directory', path.replace(process.cwd(),''), 'has been added'); })
        .on('unlinkDir', function(path) { log('Directory', path.replace(process.cwd(),''), 'has been removed'); })
        .on('error', function(error) { log('Error happened', error); })
        .on('ready', function() { log('Initial scan complete. Ready for changes.'); })

}

module.exports = watch;