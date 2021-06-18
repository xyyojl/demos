clickMe.addEventListener('click', function() {
    popover.style.display = 'block';
})
wrapper.addEventListener('click', function(e) {
    // 阻止冒泡，实现点击其他地方，关闭掉浮层
    e.stopPropagation();
})
document.addEventListener('click', function() {
    popover.style.display = 'none';
})