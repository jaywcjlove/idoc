// var phantom = require('phantom')
var fs = require('fs')

module.exports = pdf;

function pdf(commander){
    var wkhtmltopdf = require('wkhtmltopdf');

    // URL
// HTML
var ht = wkhtmltopdf('<h1>Test</h1><p>Hello world</p>')

// wkhtmltopdf(file.contents.toString(enc), options);

console.log(ht);


    // var html5pdf = require("html5-to-pdf");
    // var fs = require("fs");
    // html5pdf({
    //     "cssPath" : process.cwd() + '/static/css/main.css'
    // }).from(process.cwd() + '/index.html').to(process.cwd() + '/index.pdf', function () {
    //     console.log("Done")
    // });




    // var pdf = require('phantomjs-pdf');

    // var options = {
    //     "html" : process.cwd() + '/index.html',
    //     "css" : process.cwd() + '/static/css/main.css',
    // }
     
    // pdf.convert(options, function(result) {
        
    //     /* Using a buffer and callback */
    //     result.toBuffer(function(returnedBuffer) {});
     
    //     /* Using a readable stream */
    //     var stream = result.toStream();
     
    //     /* Using the temp file path */
    //     var tmpPath = result.getTmpPath();
     
    //     /* Using the file writer and callback */
    //     result.toFile(process.cwd() + '/index.pdf', function() {});
    // });





    // require("jsreport").render({
    //     template: {
    //         content: "<h1>Hello world from </h1>",
    //         recipe: "html"
    //     },
    //     data: { name: "jsreport" }
    // }).then(function(out) {
    //     //pipes plain text with Hello world from jsreport
    //     out.stream.pipe(out);
    // });

}