$('.images > img:nth-child(1)').addClass('current');
$('.images > img:nth-child(2)').addClass('enter');
setTimeout(() => {
    // 给第一个移除 current 类，加上 leave 类
    // 动画结束的时候，移除 leave 类，加上 enter 类
    $('.images > img:nth-child(1)').removeClass('current').addClass('leave')
        .one('transitionend', (e) => {
            $(e.currentTarget).removeClass('leave').addClass('enter');
        })

    // 给第二个移除 enter 类，加上 current 类
    $('.images > img:nth-child(2)').removeClass('enter').addClass('current');
}, 3000);

setTimeout(() => {
    $('.images > img:nth-child(2)').removeClass('current').addClass('leave')
        .one('transitionend', (e) => {
            $(e.currentTarget).removeClass('leave').addClass('enter');
        })
    $('.images > img:nth-child(3)').removeClass('enter').addClass('current');
}, 6000);

setTimeout(() => {
    $('.images > img:nth-child(3)').removeClass('current').addClass('leave')
        .one('transitionend', (e) => {
            $(e.currentTarget).removeClass('leave').addClass('enter');
        })
    $('.images > img:nth-child(1)').removeClass('enter').addClass('current');
}, 9000);

setTimeout(() => {
    $('.images > img:nth-child(1)').removeClass('current').addClass('leave')
        .one('transitionend', (e) => {
            $(e.currentTarget).removeClass('leave').addClass('enter');
        })
    $('.images > img:nth-child(2)').removeClass('enter').addClass('current');
}, 12000);