const http = require('http');
const fs = require('fs');

const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
}

http.createServer(function(request, response){
    console.log('request name',request.url);

    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf8');
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html);
    }

    if(request.url === '/data'){
        // head里删了个private（功能是只有浏览器才能缓存）
        response.writeHead(200, {
            'Cache-Control': 'max-age=2,s-maxage=20',
            'Vary': 'X-Test-Cache'
        })
        wait(2).then(() => response.end('success'));
    }
}).listen(8888);

console.log('server listening on 8888');