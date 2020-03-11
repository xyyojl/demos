// cors/server.js
const url = require('url');

require('http').createServer((req,res) => {
    // 关键在于设置相应头中的 Access-Control-Allow-Origin ，该值与请求头中 Origin 一致才能生效，否则将跨域失败
    res.writeHead(200,{
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.end('这是你要的数据：1111');
}).listen(3000,'127.0.0.1');

console.log('启动服务，监听 127.0.0.1:3000');