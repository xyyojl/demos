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
        if (value) {
            node.classList.add(key);
        } else {
            node.classList.remove(key);
        }
    }
}

console.log(getSiblings(item1));
addClass(item3);