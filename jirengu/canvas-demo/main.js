/* 
    实现思路

    怎么知道用户有没有在画画【按下去、动鼠标、松开鼠标】 =>使用 div，打个点 => 有小圆圈，但是位置不对 => 鼠标出现在圆心
    => 要鼠标按下，然后鼠标移动才打点。开关 painting => 问题：用户动的很快，点就不连续 => 使用 canvas 画一个矩形，不要用 css 控制 canvas 宽高 
    => 画圆形 => 描边、填充、清除矩形 => 画圆 => 不连续 => 记录 x1，y1，x2，y2【实时更新最新的点】=> canvas 全屏 
    => 做橡皮擦，用一个变量标记用户有没有使用 => 优化代码 autoSetCanvasSize、listenToMouse 
*/


// 按下画个圆
// 移动再画个圆 => 线

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var painting = false;

// 1. 自动设置 canvas 的尺寸
autoCanvasSize(canvas);




//上一次的那个点
var lastPoint = {"x": undefined, "y": undefined};

canvas.onmousedown = function(e) {
    painting = true;
    var x = e.clientX;
    var y = e.clientY;
    lastPoint = {"x": x, "y": y};
    // 画圆不是必须的，辅助理解而已
    // drawCircle(x, y, 2.5);
}
canvas.onmousemove = function(e) {
    if(!painting) return;
    var x = e.clientX;
    var y = e.clientY;
    var newPoint = {"x": x, "y": y};
    // drawCircle(x, y, 2.5);
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    // 更新上一次的那个点
    lastPoint = newPoint;
}
canvas.onmouseup = function() {
    painting = false;
}


// 下面是工具函数
function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
}

// 画线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = '#000';
    context.lineWidth = 5;
    context.moveTo(x1, y1); // 起点
    context.lineTo(x2, y2); // 终点
    context.stroke();
}

// 设置canvas的宽高
function autoCanvasSize(canvas) {
    // 首次加载设置下 canvas 的尺寸
    setCanvasSize();
    
    window.onresize = function() {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}