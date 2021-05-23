/* 
    实现思路

    怎么知道用户有没有在画画【按下去、动鼠标、松开鼠标】 =>使用 div，打个点 => 有小圆圈，但是位置不对 => 鼠标出现在圆心
    => 要鼠标按下，然后鼠标移动才打点。开关 painting => 问题：用户动的很快，点就不连续 => 使用 canvas 画一个矩形，不要用 css 控制 canvas 宽高 
    => 画圆形 => 描边、填充、清除矩形 => 画圆 => 不连续 => 记录 x1，y1，x2，y2【实时更新最新的点】=> canvas 全屏 
    => 做橡皮擦，用一个变量标记用户有没有使用 => 优化代码 autoSetCanvasSize、listenToMouse 
*/

var div = document.getElementById('canvas');
var painting = false;
div.onmousedown = function(e) {
    painting = true;
    var x = e.clientX;
    var y = e.clientY;
    console.log(x, y);
    var divA = document.createElement('div');
    divA.style = `width: 6px; height: 6px; background: #000; border-radius: 50%;
        position: absolute; top: ${y-3}px; left: ${x-3}px;`
    div.appendChild(divA)
}
div.onmousemove = function(e) {
    console.log('动了');
    if(!painting) return;
    var x = e.clientX;
    var y = e.clientY;
    console.log(x, y);
    var divA = document.createElement('div');
    divA.style = `width: 6px; height: 6px; background: #000; border-radius: 50%;
        position: absolute; top: ${y-3}px; left: ${x-3}px;`
    div.appendChild(divA)
}
div.onmouseup = function() {
    console.log('松了');
    painting = false;
}