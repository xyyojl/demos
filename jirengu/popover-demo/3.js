$(clickMe).on('click', function() {
    $(popover).show();
    console.log('show');
    setTimeout(() => {
        console.log('添加 one click');
        $(document).one('click', function() {
            console.log('我觉得这里不会执行');
            console.log('document');
            $(popover).hide();
        })
    }, 0)
})
// 解决 bug，点击 checkbox 的时候，会隐藏掉浮层
$(popover).on('click', function (e) {
    e.stopPropagation();
})