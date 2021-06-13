let allButtons = $('#buttons span');

for (let i = 0; i < allButtons.length; i++) {
    // 给每个 span 绑定 click 事件
    $(allButtons[i]).on('click', function (e) {
        let index = $(e.currentTarget).index();
        let distance = index * -300;
        $('#images').css({
            transform: 'translateX(' + distance + 'px)'
        })
        // 给当前选中的按钮，加上class，给 class 的 red 的元素，移除 class
        allButtons.eq(index)
            .addClass('red')
            .siblings('.red').removeClass('red');
    })
}


// 自动播放
let n = 0;
let size = allButtons.length;
allButtons.eq(n % size).trigger('click')
    // 添加 class
    .addClass('red')
    // 移除 class
    .siblings('.red').removeClass('red');

let timerId = setInterval(() => {
    n += 1;
    allButtons.eq(n % size).trigger('click')
        .addClass('red')
        .siblings('.red').removeClass('red');
}, 3000);

$('.window').on('mouseenter', function() {
    window.clearInterval(timerId);
})

$('.window').on('mouseleave', function() {
    // 开启闹钟
    timerId = setInterval(() => {
        n += 1;
        allButtons.eq(n % size).trigger('click')
            .addClass('red')
            .siblings('.red').removeClass('red');
    }, 3000);
    
})