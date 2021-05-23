/* 
    实现思路

    怎么知道用户有没有在画画【按下去、动鼠标、松开鼠标】 =>使用 div，打个点 => 有小圆圈，但是位置不对 => 鼠标出现在圆心
    => 要鼠标按下，然后鼠标移动才打点。开关 using => 问题：用户动的很快，点就不连续 => 使用 canvas 画一个矩形，不要用 css 控制 canvas 宽高 
    => 画圆形 => 描边、填充、清除矩形 => 画圆 => 不连续 => 记录 x1，y1，x2，y2【实时更新最新的点】=> canvas 全屏 
    => 做橡皮擦，用一个变量标记用户有没有使用 => 优化代码 autoSetCanvasSize、listenToMouse 
    
    将 jsbin 的代码，放到 github 上面=> 开启预览 =>解决按钮小的问题，添加 viewport【搜索：阻止手机 980】 
    => 不能为什么画画？我们监听的是鼠标事件 => 特性检测，支持 mouse 还是 touch => 针对不同的事件做处理 
    => 添加图标画笔、橡皮擦，写 CSS 样式 => 添加画笔颜色 => 实现颜色切换 => 实现画笔粗细，使用变量存储画笔粗细 
    => 实现清屏功能 搜索 js canvas clear => 保存，搜索 js canvas save as image
*/


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5;

// 1. 自动设置 canvas 的尺寸
autoCanvasSize(canvas);

// 2. 监听用户操作
listenToUser();

// 功能：橡皮擦、画笔、垃圾桶、下载
var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    pen.classList.remove('active');
    eraser.classList.add('active');
}
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function () {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画画';
    a.target = '_blank';
    a.click();
}

// 选择画笔颜色
black.onclick = function () {
    context.strokeStyle = 'black';
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = 'red';
    red.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function () {
    context.strokeStyle = 'green';
    green.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue';
    blue.classList.add('active')
    black.classList.remove('active')
    green.classList.remove('active')
    red.classList.remove('active')
}

// 选择画笔粗细
thin.onclick = function () {
    lineWidth = 5;
}
thick.onclick = function () {
    lineWidth = 10;
}

function listenToUser(params) {
    var using = false;
    //上一次的那个点
    var lastPoint = { "x": undefined, "y": undefined };
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备，因为 document.body.ontouchstart 的值为 null
        canvas.ontouchstart = function (e) {
            using = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            lastPoint = { "x": x, "y": y };
            // 画圆不是必须的，辅助理解而已
            // drawCircle(x, y, 2.5);
        }
        canvas.ontouchmove = function (e) {
            if (!using) return;
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                // 更新上一次的那个点
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        // 非触屏设备
        canvas.onmousedown = function (e) {
            using = true;
            var x = e.clientX;
            var y = e.clientY;
            lastPoint = { "x": x, "y": y };
            // 画圆不是必须的，辅助理解而已
            // drawCircle(x, y, 2.5);
        }
        canvas.onmousemove = function (e) {
            if (!using) return;
            var x = e.clientX;
            var y = e.clientY;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                // 更新上一次的那个点
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function () {
            using = false;
        }
    }
}


// 下面是工具函数
function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

// 画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1); // 起点
    context.lineTo(x2, y2); // 终点
    context.stroke();
    context.closePath();
}

// 设置canvas的宽高
function autoCanvasSize(canvas) {
    // 首次加载设置下 canvas 的尺寸
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}