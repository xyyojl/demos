let n;
init();
let timer = setInterval(() => {
    makeLeave(getImage(n))
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget));
        })
    
    makeCurrent(getImage(n+1));
    n += 1;
}, 3000);


document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 砸掉闹钟
        clearInterval(timer);
    } else {
        // 重新定个闹钟
        timer = setInterval(() => {
            makeLeave(getImage(n))
                .one('transitionend', (e) => {
                    makeEnter($(e.currentTarget));
                })
            
            makeCurrent(getImage(n+1));
            n += 1;
        }, 3000);
    }
})




// 工具函数
function init() {
    n = 1;
    $(`.images > img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter');
}
function getImage(n) {
    return $(`.images > img:nth-child(${x(n)})`);
}
function makeCurrent($node) {
    return $node.removeClass('leave enter').addClass('current');
}
function makeEnter($node) {
    return $node.removeClass('current leave').addClass('enter');
}
function makeLeave($node) {
    return $node.removeClass('current enter').addClass('leave');
}
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