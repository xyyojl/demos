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