const http = require('http');

http.createServer(function(request, response){
    console.log('request name',request.url);

    if(request.url === '/'){
        response.writeHead(302, { 
            // or 301 需要慎用，使用之后，会直接使用缓存，需要取决于用户使用浏览器的情况，要不要清缓存
            'Location': '/new'
        })
        response.end();
    }
    if(request.url === '/new'){
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('<div>this is content</div>');
    }
}).listen(8888);

console.log('server listening on 8888');