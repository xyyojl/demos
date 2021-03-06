window.jQuery = function(nodeOrSelector) {
    let nodes = {};
    nodes.addClass = function() {}
    nodes.html = function(){}
    return nodes;
}

window.$ = window.jQuery;


window.jQuery.ajax = function({ method, url, body, headers, successFn, failFn}) {
    /* let method = options.method;
    let url = options.url;
    let body = options.body;
    let successFn = options.successFn;
    let failFn = options.failFn; */
    // const { method, url, body, successFn, failFn } = options;

    let request = new XMLHttpRequest();
    request.open(method, url);

    // 设置 headers
    for(let key in headers) {
        let value = headers[key];
        request.setRequestHeader(key, value);
    }
    
    request.send(body);
    request.onreadystatechange = () => {
        if(request.readyState === 4) {
            if(request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText);
            } else {
                failFn.call(undefined, request);
            }
        }
    }
}

myButton.addEventListener('click', (e) => {
    // 第一版：有可能不确定每个参数的意思
    /* window.jQuery.ajax(
        'get',
        '/xxx',
        'a=1&b=2',
        (responseText) => {console.log(1);},
        (request) => {console.log(2);}
    ) */
    // 第二版：让用户传入有结构的参数。也就是一个对象
    /* let options = {
        url: '/xxx',
        method: 'get',
        successFn: (responseText) => {console.log(1);},
        failFn: (request) => {console.log(2);}
    };
    window.jQuery.ajax(options); */
    // 第三版：小技巧优化
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'frank': '18'
        },
        successFn: (responseText) => {console.log(responseText);},
        failFn: (request) => {console.log(request);}
    });
})