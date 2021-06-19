let divs = $('div').get();
let n = 0;
// 事件捕获
for(let i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', () => {
        setTimeout(() => {
            divs[i].classList.add('active');
        }, n * 500)
        n += 1;
    }, true)
}

// 事件冒泡
for(let i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', () => {
        setTimeout(() => {
            divs[i].classList.remove('active');
        }, n * 500)
        n += 1;
    })
}
