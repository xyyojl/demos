/* 
    改写原型的方式，实现下面这种效果
    item3.getSiblings();
    item3.addClass(['a', 'b', 'c']);
*/
Node.prototype.getSiblings = function() {
    var allChildren = this.parentNode.children;
    var array = { length: 0 };
    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i] !== this) {
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array;
}
Node.prototype.addClass = function(classes) {
    for (let key in classes) {
        var value = classes[key];
        var methodName = value ? 'add': 'remove';
        this.classList[methodName](key);
    }
}

function addClass(node, classes) {
    for (let key in classes) {
        var value = classes[key];
        var methodName = value ? 'add': 'remove';
        node.classList[methodName](key);
        
    }
}


console.log(item3.getSiblings.call(item3));
// 等价于 console.log(item3.getSiblings());

item3.addClass.call(item3, { 'a': true, 'b': false, 'c': true });
// 等价于 item3.addClass({ 'a': true, 'b': false, 'c': true });