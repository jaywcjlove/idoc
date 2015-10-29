var cheerio = require('cheerio');
var file = require("./file");
var log = console.log;

module.exports = imgPath

function imgPath(str,_path){
    
    var $ = cheerio.load(str),
        imgsrc = '';

    $('img').each(function(i, e) {
        imgsrc = $(e).attr('src');
        if(!/^(http:\/\/|https:\/\/)/.test(imgsrc))
        $(e).attr('src',file.relativePath(_path,process.cwd()) + imgsrc );
    });

    // 返回HTML
    return $.html();
}
