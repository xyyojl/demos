// 先实现效果，不管代码怎么样
/* 
    1. 复制第一个和最后一个
    2. 点击按钮，进行切换，更改 ul 的 transform
    3. 优化代码
    4. 点击 "上一张" 或者 "下一张" 按钮，切换到对应的图片

*/

let $buttons = $('#buttonWrapper > button');
let $slides = $('#slides');
let $images = $('#slides').children('img');
let current = 0;

makeFakeSlides();
$slides.css({ transform: 'translateX(-400px)' });
bindEvents();

$('#previous').on('click', function() {
    goToSlide(current-1);
})
$('#next').on('click', function() {
    goToSlide(current+1);
})

// 自动播放
let timer = setInterval(() => {
    goToSlide(current+1);
}, 2000);
$('.container').on('mouseenter', function () {
    clearInterval(timer);
}).on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlide(current+1);
    }, 2000);
})

// 重要逻辑
function goToSlide(index) {
    /* 
        特殊处理
        1. 临界值处理
        2. 从最后一张到第一张
        3. 从第一张到最后一张
    */
    if(index > $buttons.length - 1) {
        index = 0;
    } else if(index < 0) {
        index = $buttons.length - 1;
    }

    if(current === $buttons.length - 1 && index === 0) {
        // 从最后一张到第一张
        // 举例：current = 2
        // $slides.css({ transform: 'translateX(-1600px)' })
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
        .one('transitionend', function () {
            // 障碍法
            $slides.hide();
            $slides.offset();
            $slides.css({ transform: 'translateX(-400px)' })
            $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
                .show();
        })
    } else if(current === 0 && index === $buttons.length - 1) {
        // 从第一张到最后一张
        // 举例：index = 2
        console.log('从第一张到最后一张');
        $slides.css({ transform: 'translateX(0px)' })
        .one('transitionend', function () {
            // 障碍法
            $slides.hide()
            $slides.offset();
            $slides.css({ transform: `translateX(${-(index+1)*400}px)` })
                .show();
        })
    } else {
        // 0 1 2
        // -400 -800 -1200
        $slides.css({ transform: `translateX(${-(index+1)*400}px)` });
    }
    current = index;
}



function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true);
    let $lastCopy = $images.eq($images.length - 1).clone(true);
    $slides.append($firstCopy);
    $slides.prepend($lastCopy);
}

function bindEvents() {
    // 给按钮绑定事件，获取索引，调用 goToSlide 方法
    // 事件委托
    $('#buttonWrapper').on('click', 'button', function(e) {
        let $button = $(e.currentTarget);
        let index = $button.index();
        goToSlide(index);
    })
    /* $buttons.eq(0).on('click', function () {
        console.log('current', current);
        // 从最后一张到第一张
        if (current === 2) {
            console.log('说明你是从最后一张到第一张');
            $slides.css({ transform: 'translateX(-1600px)' })
                .one('transitionend', function () {
                    // 障碍法
                    $slides.hide();
                    $slides.offset();
                    $slides.css({ transform: 'translateX(-400px)' })
                        .show();
                })
        } else {
            $slides.css({ transform: 'translateX(-400px)' });
        }
        current = 0;
    })
    $buttons.eq(1).on('click', function () {
        $slides.css({ transform: 'translateX(-800px)' });
        current = 1;
    })
    $buttons.eq(2).on('click', function () {
        if (current === 0) {
            console.log('说明你是从第一张到最后一张');
            $slides.css({ transform: 'translateX(0px)' })
                .one('transitionend', function () {
                    // 障碍法
                    $slides.hide()
                    $slides.offset();
                    $slides.css({ transform: 'translateX(-1200px)' })
                        .show();
                })
        } else {
            $slides.css({ transform: 'translateX(-1200px)' });
        }
        current = 2;
    }) */
}

