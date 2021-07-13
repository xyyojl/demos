!(function () {
    var view = document.querySelector('#topNavBar');

    var controller = {
        view: null,
        init() {
            this.view = view;
            this.bindEvents();
            // this.bindEvents.call(this);
        },
        bindEvents() {
            window.addEventListener('scroll', (e) => {
                if (window.scrollY > 0) {
                    // 添加 class
                    this.active();
                } else {
                    // 去除 class
                    this.disactive();
                }
                // 箭头函数没有 this
            })
        },
        active() {
            this.view.classList.add('sticky');
        },
        disactive() {
            this.view.classList.remove('sticky');
        }
    };

    controller.init();
    // controller.init.call(controller, view);    
}).call()