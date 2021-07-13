!(function () {
    var view = document.querySelector('nav.menu');
    var controller = {
        view: null,
        aTags: null,
        init() {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        bindEvents() {
            // 点击导航栏菜单项，自己滚动到对应 div
            let aTags = this.view.querySelectorAll('li > a');
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (e) => {
                    // 阻止默认事件
                    e.preventDefault();
                    // 获取到 a 标签的 href 值，找到对应的元素，获取到对应元素距离顶部的高度
                    let a = e.currentTarget;
                    let id = a.getAttribute('href');
                    // 没有 id，直接跳过
                    if (id === '#') return;
                    let element = document.querySelector(id);
                    this.scrollElement(element);
                }
            }
        },
        initAnimation() {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollElement(element) {
            let top = element.offsetTop;

            /* let n = 25; // 一共动多少次
            let duration = 500 / n; // 多长时间动一次
            let currentTop = window.scrollY; // 当前高度
            let targetTop = top - 80; // 目标高度
            let distance = (targetTop - currentTop) / n; // 每次滚动的距离
            let i = 0; */

            let currentTop = window.scrollY; // 当前高度
            let targetTop = top - 80;   // 目标高度
            let s = targetTop - currentTop; // 路程
            const coords = { y: currentTop } // 起始位置
            let t = Math.abs((s / 100) * 300); // 时间
            if (t > 500) { t = 500 }
            const tween = new TWEEN.Tween(coords) // 起始位置
                .to({ y: targetTop }, t) // 结束位置 和 时间
                .easing(TWEEN.Easing.Cubic.InOut) // 欢动类型
                .onUpdate(() => {
                    // coords.y 已经变了
                    window.scrollTo(0, coords.y); // 如何更新界面
                })
                .start() // 开始缓动
        }
    };

    controller.init(view);
}).call()