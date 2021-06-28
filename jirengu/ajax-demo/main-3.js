/* 
// 升级你的 jQuery.ajax 满足 Promise 规则
jQuery.ajax({
    url: '/xxx',
    method: 'get'
}).then(success, fail)
*/

window.jQuery = () => { };
window.$ = window.jQuery;

window.jQuery.ajax = function ({ method, url, body, headers }) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open(method, url);

        // 设置 headers
        for (let key in headers) {
            let value = headers[key];
            request.setRequestHeader(key, value);
        }

        request.send(body);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText);
                } else {
                    reject.call(undefined, request);
                }
            }
        }
    })
}


myButton.addEventListener('click', (e) => {
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'frank': '18'
        }
    })
        .then(
            (responseText) => { console.log(responseText); },
            (request) => { console.log(request); }
        )
})