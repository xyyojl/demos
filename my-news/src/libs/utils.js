function tplReplace(template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        // node {{ url }} key: 大括号里面的内容
        return templateObject[key.trim()];
    })
}

function scrollTop() {
    // 为什么要异步？
    setTimeout(() => {
        window.scrollTop(0,0);
    },0 )
}

export {
    tplReplace,
    scrollTop
}