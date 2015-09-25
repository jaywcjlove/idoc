var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 1987;

module.exports = server;

function server(commander){

    http.createServer(function(request, response) {

        var uri = url.parse(request.url).pathname, 
            filename = path.join(process.cwd(), uri);

        // url 解码
        filename = decodeURIComponent(filename);

        fs.exists(filename, function(exists) {
            if(!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }

            if (fs.statSync(filename).isDirectory()) filename += '/index.html';

            fs.readFile(filename, "binary", function(err, file) {
                if(err) {        
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file, "binary");
                response.end();
            });

        });

    }).listen(parseInt(port, 10));

    console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
    // console.log("Server listening on: http://localhost:%s", PORT);

}

