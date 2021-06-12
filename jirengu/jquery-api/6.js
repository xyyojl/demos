// 改进2：接受多个 node
window.jQuery = function (nodeOrSelector) {
    var nodes = {};
    // 统一返回结果：伪数组
    if(typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for(let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i];
        }
        nodes.length = temp.length;
    } else {
        nodes = {
            0: nodeOrSelector,
            length: 1
        };
    }

    console.log('nodes', nodes);

    // 封装 addClass 方法
    nodes.addClass = function (classes) {
        // 两层循环，添加 class
        for (let key1 in classes) {
            var value = classes[key1];
            var methodName = value ? 'add': 'remove';
            for(let key2 in nodes) {
                if(nodes[key2] >= nodes.length ) return;
                nodes[key2].classList[methodName](key1);
            }
        }
        // 传入数组的清空
        /* classes.forEach(value => {
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].length.add(value);
            }
        }); */
    }

    nodes.text = function(text) {
        // 不给我参数就是获取，给我参数，就是设置
        if (text === undefined) {
            // 获取
            var texts = [];
            for (let i = 0; i < nodes.length; i++) {
                texts.push(nodes[i].textContent);
            }
            return texts;
        } else {
            // 设置
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text;
            }
        }
    }

    return nodes;
}

var node2 = jQuery('ul>li');
node2.addClass({'red': false, 'green': true});
console.log(node2.text());
node2.text('hi');