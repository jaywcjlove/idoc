// var ghpages = require('gh-pages');
var path = require('path');
var log = console.log;


module.exports = deploy


function deploy(commander){
    
    var util   = require('util'),
        exec  = require('child_process').exec,
        child;

    child = exec('git add -A && git commit -m "'+new Date()+'" && git push -f origin gh-pages');

    child.stdout.on('data', function (data) {
        log("commit:",data)
    });

    child.stderr.on('data', function (data) {
        log(data);
    });
}