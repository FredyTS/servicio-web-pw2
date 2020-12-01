var http = require('http');
var fs = require ('fs');
var path = require ('path');

http.createServer(function (request, response){
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './'){
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
    var mimeTypes = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.json' : 'application/json',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg',
        '.wav' : 'audio/wav',
        '.mp4' : 'video/mp4',
        '.woff' : 'application/font-woff',
        '.ttf' : 'application/font-ttf',
        '.eot' : 'application/vnd.ms-fontobject',
        '.otf' : 'application/font-oft',
        '.svg' : 'application/images/svg+xml',
    };

    contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, function(error, content){
        if (error) {
            if(error.code == 'ENOENT'){
               fs.readFile('./404.html', function(error, content){
                   response.writeHead(200, {'content-Type': contentType});
                   response.end(content, 'utf-8');
               }); 
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.message);// aqui no se si es error porque en el video no se veía, por lo que toca preguntar
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);
console.log('Server running at http://25.62.250.178:3000');
