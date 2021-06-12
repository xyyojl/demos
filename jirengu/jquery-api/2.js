// 封装成函数
// 一开始不知道取什么名字，就先写个 x，然后再修改
function getSiblings(node) { /* API */
    var allChildren = node.parentNode.children;
    var array = { length: 0 };
    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i] !== node) {
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array;
}


function addClass(node) {
    var classes = { 'a': true, 'b': false, 'c': true };
    for (let key in classes) {
        var value = classes[key];
        // 优化代码：如果存在类似的代码，就有优化的可能
        // 优化前的代码
        /* if (value) {
            node.classList.add(key);
        } else {
            node.classList.remove(key);
        } */

        // 根据 value，得到对应的方法名
        var methodName = value ? 'add': 'remove';
        node.classList[methodName](key);
        
    }
}

console.log(getSiblings(item1));
addClass(item3);