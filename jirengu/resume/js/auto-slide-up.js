!(function () {

    // 添加 offset 类
    let specialTags = document.querySelectorAll('[data-x]');
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }

    findClosestAndRemoveOffset();
    // 监听用户滚动
    window.addEventListener('scroll', function() {
        // 滚动时自动高亮导航栏
        findClosestAndRemoveOffset();
    })

    // helper
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]');
        let minIndex = 0;
        for (let i = 0; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                // 1. 获取距离顶部最近的元素的索引
                minIndex = i;
            }
        }

        // minIndex 就是距离窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset');
        // 2. 根据元素的 id 获取 a 标签
        let id = specialTags[minIndex].id;
        let a = document.querySelector('a[href="#' + id + '"]');
        // 3. 找到 a 标签的爸爸
        let li = a.parentNode;
        let brothersAndMe = li.parentNode.children;
        // 遍历所有 li，去除 class
        for (let i = 0; i < brothersAndMe.length; i++) {
            brothersAndMe[i].classList.remove('highlight');
        }
        // 给对应的 li，添加 .highlight
        li.classList.add('highlight');
    }

    // 鼠标移动到菜单项，添加 class
    let liTags = document.querySelectorAll('ul.menu > li');
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (e) {
            e.currentTarget.classList.add('active');
        }
        liTags[i].onmouseleave = function (e) {
            e.currentTarget.classList.remove('active');
        }
    }
}).call()