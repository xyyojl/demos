function tplReplace(template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        // node {{ url }} key: 大括号里面的内容
        return templateObject[key.trim()];
    })
}

function scrollTop() {
    // 为什么要异步？
    setTimeout(() => {
        window.scrollTo(0,0);
    },0 )
}

function setPageData(data, count) {
    const len = data.length;
    let pageData = [];
    let index = 0;

    while(index < len) {
        pageData.push(data.slice(index, index+=count));
    }

    return pageData;
}

export {
    tplReplace,
    scrollTop,
    setPageData
}