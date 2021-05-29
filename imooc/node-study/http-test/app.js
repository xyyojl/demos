// 处理 http 请求的综合示例
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    // 设置返回格式为 JSON
    res.setHeader('Content-type', 'application/json');

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }
    if (method === 'GET') {
        res.end(
            JSON.stringify(resData) // 返回 JSON 格式的字符串
        )
    }

    // 使用 postmane 发送 post 请求
    if (method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', chunk => {
            resData.postData = postData;

            res.end(
                JSON.stringify(resData) // 返回 JSON 格式的字符串
            )
        })
    }

})
server.listen(8000);
console.log('OK');



// 处理路由
/* const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    const path = url.split('?')[0];
    console.log('url: ', url);
    console.log('path: ', path);
    res.end(path);
})
server.listen(8000);
console.log('OK');  */

// post 请求
/* const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // 数据格式
        console.log('content-type', req.headers['content-type']);
        // 接收数据
        // chunk 本身是二进制格式
        let postData = "";
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            console.log('postData', postData);
            res.end('hello world') // 在这里返回，因为是异步
        })

    }
})

server.listen(8000);
console.log('OK'); */

// get 请求
/* const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log('method: ', req.method);
    const url = req.url;
    console.log('url: ', url);
    req.query = querystring.parse(url.split('?')[1]);
    console.log('query: ', req.query);
    res.end(
        JSON.stringify(req.query)
    );
})

server.listen(8000);
console.log('OK'); */