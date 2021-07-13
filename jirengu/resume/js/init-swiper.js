!(function () {
    var view = document.querySelector('#mySlides');

    var controller = {
        view: null,
        swiper: null,
        swiperOptions: {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        init() {
            this.view = view;
            this.initSwiper();
        },
        initSwiper() {
            this.swiper = new Swiper(
                this.view.querySelector('.swiper-container'),
                this.swiperOptions
            )
        }
    };

    
    controller.init(view);
    
}).call()