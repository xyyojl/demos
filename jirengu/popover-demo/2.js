// 使用 jQuery 写法，重写一下
$('#clickMe').on('click', function() {
    $('#popover').show();
})
$('#wrapper').on('click', function(e) {
    // 阻止冒泡，实现点击其他地方，关闭掉浮层
    e.stopPropagation();
})
$(document).on('click', function() {
    $('#popover').hide();
})