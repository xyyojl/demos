// 使用 setInterval 优化代码
$('.images > img:nth-child(1)').addClass('current');
$('.images > img:nth-child(2)').addClass('enter');
$('.images > img:nth-child(3)').addClass('enter');

let n = 1;
setInterval(() => {
    // 给对应的元素移除 current 类，加上 leave 类
    // 动画结束的时候，移除 leave 类，加上 enter 类
    $(`.images > img:nth-child(${x(n)})`).removeClass('current').addClass('leave')
        .one('transitionend', (e) => {
            $(e.currentTarget).removeClass('leave').addClass('enter');
        })
    
    // 给对应的元素移除 enter 类，加上 current 类
    $(`.images > img:nth-child(${x(n + 1)})`).removeClass('enter').addClass('current');
    n += 1;
}, 3000);

// 处理 n，保证 n 的值为 1 2 3
function x(n) {
    // 当 n 大于 3 的时候，做处理
    if (n > 3) {
        n = n % 3;
        if (n === 0) {
            n = 3;
        }
    } // n = 1 2 3
    return n;
}