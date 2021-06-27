var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    var string = fs.readFileSync('./index-5.html', 'utf8');
    var amount = fs.readFileSync('./db', 'utf8'); // 金钱 101
    // 将字符串 &&&amount&&& 替换成金额
    string = string.replace('&&&amount&&&', amount);
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/pay-1' && method.toUpperCase() === 'POST') {
    var amount = fs.readFileSync('./db', 'utf8'); // 金钱 101
    var newAmount = amount - 1;
    if (Math.random() > 0.5) {
        fs.writeFileSync('./db', newAmount);
        response.write('success');
    } else {
        response.write('fail');
    }
    response.end()
  } else if(path === '/pay-2') {
    var amount = fs.readFileSync('./db', 'utf8');
    var newAmount = amount - 1;
    fs.writeFileSync('./db', newAmount);
    response.setHeader('Content-Type', 'image/jpg');
    response.statusCode = 200;
    response.write(fs.readFileSync('./yingmu.jpg'));
    // 十分重要，没有写这句代码的话，就会请求失败，比如，没有成功返回图片给浏览器
    response.end()
  } else if(path === '/pay-3') {
    var amount = fs.readFileSync('./db', 'utf8');
    var newAmount = amount - 1;
    fs.writeFileSync('./db', newAmount);
    response.setHeader('Content-Type', 'application/javascript');
    response.statusCode = 200;
    response.write(`
        // 说明 jack.com 的后端程序员需要对 frank.com 的页面细节了解很清楚
        // 耦合，想想两个齿轮，需要解耦
        amount.innerText = amount.innerText - 1;
    `);
    response.end();
  } else if(path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf8');
    var newAmount = amount - 1;
    fs.writeFileSync('./db', newAmount);
    response.setHeader('Content-Type', 'application/javascript');
    response.statusCode = 200;
    response.write(`
        // 说明 jack.com 的后端程序员需要对 frank.com 的页面细节了解很清楚
        // 耦合，想想两个齿轮，需要解耦
        // amount.innerText = amount.innerText - 1;
        // xxx.call(undefined, 'success');
        ${query.callbackName}.call(undefined, 'success');
    `);
    response.end();
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)