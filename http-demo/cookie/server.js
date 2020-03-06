const http = require('http');
const fs = require('fs');

http.createServer(function(request, response){
    console.log('request name',request.url);

    const host = request.headers.host;
    console.log('host:',host)
    console.log('cookie',request.headers.cookie)
    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf8');
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['id=123; max-age=2', 'abc=456;domain=test.com','qqq=111;HttpOnly']
        })
        // if(host === 'test.com'){
        //    pass
        // }
        response.end(html);
        
    }
    
}).listen(8888);

console.log('server listening on 8888');
