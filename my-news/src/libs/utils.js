function tplReplace(template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        // node {{ url }} key: 大括号里面的内容
        return templateObject[key.trim()];
    })
}

export {
    tplReplace
}