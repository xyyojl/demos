window.jQuery = function(nodeOrSelector) {
    let nodes = {};
    nodes.addClass = function() {}
    nodes.html = function(){}
    return nodes;
}

window.$ = window.jQuery;

console.log(window.$);

window.jQuery.ajax = function(method, url, body, successFn, failFn) {
    let request = new XMLHttpRequest();
    request.open(method, url);
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
    window.jQuery.ajax(
        'get',
        '/xxx',
        'a=1&b=2',
        (responseText) => {console.log(1);},
        (request) => {console.log(2);}
    )
})