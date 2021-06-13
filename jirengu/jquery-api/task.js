// 实现一个 jQuery 的 API的思路及细节：https://www.jianshu.com/p/20b7936efc33

window.jQuery = function(nodeOrSelector) {
    let nodes = {};
    if (typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector);
        for(let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i];
        }
        nodes.length = temp.length;
    } else {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }

    console.log('nodes', nodes);
    nodes.addClass = function(classes) {
        // 判断传进来的参数是字符串还是数组
        if (typeof classes === 'string') {
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].classList.add(classes);
            }
        } else if (classes instanceof Array) {
            classes.forEach(value => {
                for(let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add(value);
                }
            })
        }
        
    }

    nodes.setText = function(value) {
        for(let i = 0; i < nodes.length; i++) {
            nodes[i].textContent = value;
        }
    }

    return nodes;
}

window.$ = jQuery;

var $div = $('ul > li');
$div.addClass(['yellow','green','blue']) //可将所有 div 的 class 添加数组里面的元素
$div.addClass('red'); // 可将所有 div 的 class 添加一个 red
$div.setText('hi'); // 可将所有 div 的 textContent 变为 hi