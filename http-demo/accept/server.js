const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer(function(request, response){
    console.log('request name',request.url);

    const html = fs.readFileSync('test.html');
    // console.log(html) readFileSync如果第二个参数不指定编码（encoding），readFileSync方法返回一个Buffer实例，否则返回的是一个字符串。
    response.writeHead(200, {
        'Content-Type': 'text/html',
        // 'X-Content-Options': 'nosniff'
        // 它的值表示消息主体进行了何种方式的内容编码转换
        'Content-Encoding': 'gzip'
    })
    response.end(zlib.gzipSync(html));
}).listen(8888);

console.log('server listening on 8888');