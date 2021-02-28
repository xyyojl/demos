function tplReplace(template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        // node {{ url }} key: 大括号里面的内容
        return templateObject[key.trim()];
    })
}

function scrollTop() {
    // 为什么要异步？
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0)
}

function setPageData(data, count) {
    const len = data.length;
    let pageData = [];
    let index = 0;

    while (index < len) {
        pageData.push(data.slice(index, index += count));
    }

    return pageData;
}
// 判断是否到底条件
function scrollToBottom(callback) {
    // _getScrollTop() + _getWindowHeight() == _getScrollHeight() 
    // 上面这个存在问题，有可能不相等，所以采用下面的方式，设置一个误差值：5

    if (_getScrollTop() + _getWindowHeight() >= _getScrollHeight() - 5) {
        callback();
    }
}

function getItemNode(target) {
    while(target = target.parentNode) {
        if(target.className.split(' ')[0] === 'news-item') {
            return target;
        }
    }
}

export {
    tplReplace,
    scrollTop,
    setPageData,
    scrollToBottom,
    getItemNode
}


// 内部方法
function _getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

function _getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}