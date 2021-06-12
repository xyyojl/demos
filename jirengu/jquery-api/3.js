// 命名空间方式
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


function addClass(node, classes) {
    for (let key in classes) {
        var value = classes[key];
        var methodName = value ? 'add': 'remove';
        node.classList[methodName](key);
        
    }
}

// 避免使用全局函数，可以改成
// ffdom.getSiblings = function () {}
var ffdom = {};
var classes = { 'a': true, 'b': false, 'c': true };
ffdom.getSiblings = getSiblings;
ffdom.addClass = addClass;

console.log(ffdom.getSiblings(item1));
ffdom.addClass(item3, classes);