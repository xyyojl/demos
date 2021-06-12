// 第一版
var allChildren = item3.parentNode.children;
var array = {length: 0};
for(let i = 0; i < allChildren.length; i++) {
    if(allChildren[i] !== item3) {
        array[array.length] = allChildren[i];
        array.length += 1;
    }
}

var classes = {'a': true, 'b': false, 'c': true};
for(let key in classes) {
    var value = classes[key];
    if (value) {
        item3.classList.add(key);
    } else {
        item3.classList.remove(key);
    }
}

console.log('array', array);