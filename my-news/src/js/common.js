import FastClick from './fastclick';

// 初始化 FastClick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

// 多指操作，会报错，所以做下处理
document.documentElement.addEventListener('touchmove', function(e) {
    if(e.touches.length > 1) {
        e.preventDefault();
    }
}, false);

// 给移动端设置 rem
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';