// 将 Node2 改成 jQuery
// 改进1：改掉 document.getElementById，可以传入字符串
window.jQuery = function (nodeOrSelector) {
    var node;
    if(typeof nodeOrSelector === 'string') {
        node = document.querySelector(nodeOrSelector)
    } else {
        node = nodeOrSelector;
    }

    return {
        getSiblings: function () {
            var allChildren = node.parentNode.children;
            var array = { length: 0 };
            for (let i = 0; i < allChildren.length; i++) {
                if (allChildren[i] !== node) {
                    array[array.length] = allChildren[i];
                    array.length += 1;
                }
            }
            return array;
        },
        addClass: function (classes) {
            for (let key in classes) {
                var value = classes[key];
                var methodName = value ? 'add': 'remove';
                node.classList[methodName](key);
            }
        }
    }
}

var node2 = jQuery(item3);
console.log(node2.getSiblings());
node2.addClass({ 'a': true, 'b': false, 'c': true });

console.log(jQuery('#item2').getSiblings());