// 点击按钮，发送 AJAX 请求
myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest();
    // http://frank.com:8001 的前端，向 http://jack.com:8002/ 网站的后端接口，发起请求
    request.open('get', 'http://jack.com:8002/xxx'); // 配置 request
    // request.open('get', 'http://localhost:8002/xxx'); // 配置 request
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState === 4) {
            if(request.status >= 200 & request.status < 300) {
                let string = request.responseText;
                // 把符合 JSON 语法的字符串转换成 JS 对应的值
                let object = window.JSON.parse(string);
                // JSON.parse 是浏览器提供的
                console.log(object);
            } else if(request.status >= 400) {
                console.log('说明请求失败');
            }
        }
    }
})