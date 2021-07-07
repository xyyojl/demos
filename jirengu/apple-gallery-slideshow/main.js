/* 
    实现效果：
    1、点击 buttonWrapper 下面的每一个 li，切换到对应的图片，展示出来
    2、自动轮播
    3、鼠标移动上去的时候，轮播暂停掉
    4、鼠标离开，轮播继续

    思路：
    1、复制第一个和最后一个
    2、绑定按钮点击事件，点击按钮，进行切换，更改 ul 的 transform
    3、封装函数
    4、自动播放
*/
let $liButtons = $('#buttonWrapper > li');
let $slides = $('#slides');
let $liImages = $slides.children('li');
let current = 0;
let distance = 920;

makeFakeSlides();
bindEvents();
$($liButtons).eq(0).addClass('active');

// 自动播放
let timer = setInterval(function() {
    goToSlide(current+1)
}, 2000);
$('main').on('mouseenter', function() {
    clearInterval(timer);
}).on('mouseleave', function() {
    timer = setInterval(function() {
        goToSlide(current+1)
    }, 2000);
})

// 用户离开页面做处理
document.addEventListener('visibilitychange', function () {
    console.log('document.hidden', document.hidden);
    if (document.hidden) {
        window.clearInterval(timer);
    } else {
        timer = setInterval(function() {
            goToSlide(current+1)
        }, 2000);
    }
})


function makeFakeSlides() {
    let $firstCopy = $liImages.eq(0).clone(true);
    let $lastCopy = $liImages.eq($liImages.length - 1).clone(true);

    // 在开头插入最后一个
    $slides.prepend($lastCopy);
    // 在开头插入第一个
    $slides.append($firstCopy);
}
function bindEvents() {
    $('#buttonWrapper').on('click', 'li', function(e) {
        let $liButton = $(e.currentTarget);
        let index = $liButton.index()
        goToSlide(index, $liButton);
    })
}

function goToSlide(index, node) {
    // 处理 index
    if (index > $liButtons.length - 1) {
        // 当实参大于最后一个索引
        index = 0;
    } else if(index < 0) {
        // 当实参小于第一个索引
        index = $liButtons.length - 1;
    }
    // 展示对应的图片
    if (current === $liButtons.length - 1 && index === 0) {
        // 从最后一张到第一张
        $slides.css({ transform: `translateX(${-($liButtons.length+1) * distance}px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index+1) * distance}px)` }).show();
            })
    } else if(current === 0 && index === $liButtons.length - 1) {
        // 从第一张到最后一张
        $slides.css({ transform: `translateX(0px)` })
        .one('transitionend', function () {
            $slides.hide().offset()
            $slides.css({ transform: `translateX(${-(index+1) * distance}px)` }).show();
        })
    } else {
        $slides.css({ transform: `translateX(${-(index+1) * distance}px)` });
    }
    current = index;
    if (node) {
        // 给这个元素添加 active，其他的去除 active
        node.addClass('active').siblings().removeClass('active');
    } else {
        $($liButtons[index]).addClass('active').siblings().removeClass('active');
    }
}