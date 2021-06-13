let allButtons = $('#buttons span');

for (let i = 0; i < allButtons.length; i++) {
    // 给每个 span 绑定 click 事件
    $(allButtons[i]).on('click', function (e) {
        // 找到当前元素的索引
        let index = $(e.currentTarget).index();
        let distance = index * -300;
        $('#images').css({
            transform: 'translateX(' + distance + 'px)'
        })
        activeButton(allButtons.eq(index));
    })
}


// 自动播放
let n = 0;
let size = allButtons.length;
allButtons.eq(n % size).trigger('click')

let timerId = setTimer();


$('.window').on('mouseenter', function() {
    // 砸掉闹钟
    window.clearInterval(timerId);
})

$('.window').on('mouseleave', function() {
    // 开启闹钟
    timerId = setTimer();
})

// 定时器 - 闹钟
function setTimer() {
    return setInterval(() => {
        n += 1;
        allButtons.eq(n % size).trigger('click');
    }, 3000);
}
// 激活按钮
function activeButton($button) {
    // 给当前选中的按钮，加上class，给 class 的 red 的元素，移除 class
    $button
        .addClass('red')
        .siblings('.red').removeClass('red');
}
