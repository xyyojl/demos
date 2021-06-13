let allButtons = $('#buttons span');

for (let i = 0; i < allButtons.length; i++) {
    // 给每个 span 绑定 click 事件
    $(allButtons[i]).on('click', function (e) {
        let index = $(e.currentTarget).index();
        let distance = index * -300;
        $('#images').css({
            transform: 'translateX(' + distance + 'px)'
        })
    })
}
