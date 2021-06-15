本次任务有 10 道题目，你只能提交一次，满分100分，两周内会得到评阅，如果没有及时评阅，请在班级群找老师反馈。

须知：

1. 本考试为开卷考试，你可以查阅任何资料
2. 不允许与其他人直接讨论答案，但是可以询问资料

1. 所有**代码**都要用 Markdown 的[代码块语法（~~~或三个 `）](https://kennylee26.gitbooks.io/markdown/content/grammar/Code.html) ，方便老师评阅，否则扣分。
2. 你只有一次提交机会，请提交前仔细检查自己的答案！

- 60 分及格，70分普通，80分良好，90分优秀
- 低于 60 分就需要重答

### 第 1 题

请写出一个符合 W3C 规范的 HTML 文件，要求

1. 页面标题为「我的页面」
2. 页面中引入了一个外部 CSS 文件，文件路径为 `/style.css`

1. 页面中引入了另一个外部 CSS 文件，路径为 `/print.css`，该文件仅在打印时生效
2. 页面中引入了另一个外部 CSS 文件，路径为 `/mobile.css`，该文件仅在设备宽度小于 500 像素时生效

1. 页面中引入了一个外部 JS 文件，路径为 `/main.js`
2. 页面中引入了一个外部 JS 文件，路径为 `/gbk.js`，文件编码为 GBK

1. 页面中有一个 SVG 标签，SVG 里面有一个直径为 100 像素的圆圈，颜色随意
2. 注意题目中的路径

提示：本题 5 分

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的页面</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/print.css" media="print">
    <link rel="stylesheet" href="/mobile.css" media="(max-width:500px)">
    <style>
        body{
            margin: 0;
        }
    </style>
</head>
<body>
    <svg>
        <circle cx="50" cy="50" r="50" fill="red"/>
    </svg>
<script src="/main.js"></script>
<script src="/gbk.js" charset="gbk"></script>
</body>
</html>
```

### 第 2 题

[2016年腾讯前端面试题](https://github.com/Bless-L/MyBlog/blob/master/post/2016腾讯实习生前端面试经历及总结（二）.md)：
移动端是怎么做适配的？

回答要点：

1. meta viewport
2. 媒体查询（[CSS深入浅出第五课](https://xiedaimala.com/courses/003b1951-22af-4821-ad80-d2880c0074eb/)）

1. 动态 rem 方案（[CSS深入浅出第九课](https://xiedaimala.com/courses/003b1951-22af-4821-ad80-d2880c0074eb/)）

这三个知识点只有第一个我有讲过，你需要自学第二点和第三点。
如果大家在这道题上都答得不好，我会在考试后直播这两节课的录屏。（因为我觉得视频里已经讲得很好了，没必要重新讲一遍）

提示：本题15分，每个知识点 5 分。你会发现平时不写博客，遇到面试就会变成哑巴。

1、meta viewport

在head标签里面添加下面这个代码

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
//设置meta标签的name为viewport
// width=device-width: 让当前viewport宽度等于设备的宽度
// initial-scale=1.0: 设置页面的初始缩放值为不缩放
// maximum-scale=1.0: 允许用户的最大缩放值为1.0
// minimum-scale=1.0: 允许用户的最小缩放值为1.0 
// user-scalable=no: 禁止用户缩放
```

2、媒体查询

媒体查询包括两方面link元素中的CSS媒体查询和样式表中的CSS媒体查询。当媒体查询为true时，其对应的***\*样式表或样式规则\****就会遵循正常的级联规则进行应用。即使媒体查询返回false，<link> 标签指向的样式表也将会被下载

例如下面的例子，当该style.css文件仅在设备宽度小于 800 像素时生效；当在设备宽度小于 600 像素的时候，使body的背景颜色设置为红色

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="style.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  body{background: red;}
}
</style>
```

3、动态rem方案

1rem等于根元素html的font-size的值，那么可以调整根元素的font-size值来调整页面缩放后的各个元素的尺寸和定位。

在script标签加入这段代码：

```html
<script>
   var pageWidth=window.innerWidth  //获取屏幕宽度
   document.documentElement.style.fontSize= `${pageWidth/10}px`
</script>
```

此处，fontSize 的值为屏幕宽的十分之一，那么在写CSS的时候可以这样写：

```css
.xyy{
    width:0.4rem;
    height:0.2rem;
    margin:0.05rem 0.05rem;
    float:left;
 }
```

还可以使用scss直接把px转换成rem

```
@function px( $px ){
  @return $px/$designWidth*10 + rem;
}
$designWidth: 320px; 

// 那么1rem=32px
```

### 第 3 题

[2017年腾讯前端实习面试题（二面）](https://earthsplitter.github.io/2017/03/31/2017腾讯实习经验总结/)：
用过CSS3吗? 实现圆角矩形和阴影怎么做?

提示：本题 5 分

用过css3，用的比较多的有阴影box-shadow，圆角border-radius，动画animation，渐变（径向渐变、线性渐变）和过渡transition

1、用border-radius实现圆角矩形

```
/* 设置了一个四个圆角角度为5px的圆角矩形 */
border-radius: 5px;
/*等价于下面*/
border-top-left-radius:     5px ;   
border-top-right-radius:    5px ;
border-bottom-right-radius: 5px ;
border-bottom-left-radius:  5px ;
```

2、实现阴影效果阴影

包括box-shadow和text-shadow：下面实现的box-shadow阴影

box-shadow使用一个或多个投影，如果使用多个投影时必须需要用逗号“,”分开，可以叠加。

```
div{box-shadow: 0 0 3px 1px #000;}
/*选择器 {box-shadow:投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色}*/
```

实现圆角和阴影的全部代码

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的页面</title>
    <style>
        body{
            margin: 0;
        }
        div{
            width: 200px;
            margin: 50px auto;
            /* 实现圆角效果 */
            border-radius: 5px;
            /* 实现盒子阴影效果 */
            box-shadow: 0 0 3px 1px #000;
            /*实现文字阴影*/
            text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
            padding: 40px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>海贼王</div>
</body>
</html>
```

3、CSS3圆角的优点

①不必浪费时间去制作这些图片

②减少维护的工作量。图片文件的生成、更新、编写网页代码，这些工作都不再需要了。

③提高网页性能。由于不必再发出多余的HTTP请求，网页的载入速度将变快。

④ 增加视觉可靠性。某些情况下（网络拥堵、服务器出错、网速过慢等等），背景图片会下载失败，导致视觉效果不佳。CSS3就不会发生这种情况。

### 第 4 题

出处同上（一面二面都问了）：
什么是闭包，闭包的用途是什么？

我在课堂上讲过闭包是什么，也演示过闭包的用途，但是并没有帮大家总结。
请自行搜索。

提示：本题 15 分

1、什么是闭包

如果一个函数内部访问函数作用域外（它范围外）的变量，「这个函数」和「这个函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。

例子：

```js
!function(){
    var a = 1
    function fn(){
        console.log(a)
    }
}()
```

2、闭包的用途是什么？

①闭包的用途是间接访问一个变量或隐藏一个变量，我们无法直接访问到一个函数内部的变量，必须通过另一个函数间接的访问到；

②可以把变量的值保存在内存中；即使暂时没有使用。闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。

```js
function foo() {
    var a = 2

    function bar() {
        console.log(a)
    }
    return bar
}

var xxx = foo()
xxx()           // 2
```

上面的代码中，变量a和函数bar组成了一个闭包。

return bar只是为了bar能够被使用，跟闭包无关。

### 第 5 题

出处同上：

call、apply、bind 的用法分别是什么？

提示：本题 15 分

apply、call和bind都是来改变this的指向的。
1、call
①函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。
②call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
③call方法还可以接受多个参数。`func.call(thisValue, arg1, arg2, ...)`
例子：

```js
var obj = {};
var f = function () {
  return this;
};

f() === window // true
f.call(obj) === obj // true
f.call(undefined) //window
```

2、apply
①apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，**它接收一个数组作为函数执行时的参数**，使用格式如下。



```js
func.apply(thisValue, [arg1, arg2, ...])
```

②apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。**原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加。**

```js
function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
```

3、bind
①bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。

```js
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

注：
①apply() 和 call() 能够强制改变函数执行时的当前对象，让 this 指向其他对象。apply() 和 call() 的区别在于，apply() 的入参是一个数组，call() 的入参是一个参数列表。
②apply() 和 call()，它俩都立即执行了函数，而 bind() 函数返回了一个新的函数（bind只是先改变this的指向），它允许创建预先设置好 this 的函数 ，并可以延后调用。

### 第 6 题

出处同上：
请说出至少 8 个 HTTP 状态码，并描述各状态码的意义。

例如：

状态码 200 表示响应成功。

提示：本题 5 分

#### 2xx 成功

这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。
200 OK
请求已成功，请求所希望的响应头或数据体将随此返回。实际的响应将取决于所使用的请求方法。在GET请求中，响应将包含与请求的资源相对应的实体。在POST请求，响应将包含描述或操作结果的实体。
201 Created
请求已经被实现，而且有一个新的资源已经依据请求的需要而创建，且其URI已经随Location头信息返回。
202 Accepted
服务器已接受请求，但尚未处理。最终该请求可能会也可能不会被执行，并且可能在处理发生时被禁止。
203 Non-Authoritative Information（自HTTP / 1.1起）
服务器是一个转换代理服务器（transforming proxy，例如网络加速器），以200 OK状态码为起源，但回应了原始响应的修改版本。
204 No Content
服务器成功处理了请求，没有返回任何内容。表示服务器接收到的请求已经处理完毕，但浏览器页面不会刷新。
205 Reset Content
服务器成功处理了请求，但没有返回任何内容。与204响应不同，此响应要求请求者重置文档视图。
206 Partial Content
服务器已经成功处理了部分GET请求。类似于FlashGet或者迅雷这类的HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。

#### 3xx 重定向

这类状态码代表需要客户端采取进一步的操作才能完成请求。
300 Multiple Choices
被请求的资源有一系列可供选择的回馈信息，每个都有自己特定的地址和浏览器驱动的商议信息。
301 Moved Permanently
被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一。
302 Found
HTTP/1.0就有的，临时性重定向，POST方法的重定向在未询问用户的情况下就会变成GET
303 See Other
HTTP/1.1新加的，都是临时重定向，303和302一样，POST重定向为GET。对应当前请求的响应可以在另一个URI上被找到，当响应于POST（或PUT / DELETE）接收到响应时，客户端应该假定服务器已经收到数据，并且应该使用单独的GET消息发出重定向。
304 Not Modified
表示资源在由请求头中的If-Modified-Since或If-None-Match参数指定的这一版本之后，未曾被修改。在这种情况下，由于客户端仍然具有以前下载的副本，因此不需要重新传输资源。

#### 4xx 客户端错误

这类的状态码代表了客户端看起来可能发生了错误，妨碍了服务器的处理。
400 Bad Request
由于明显的客户端错误（例如，格式错误的请求语法，太大的大小，无效的请求消息或欺骗性路由请求），服务器不能或不会处理该请求。
401 Unauthorized
类似于403 Forbidden，401语义即“未认证”，即用户没有必要的凭据。该状态码表示当前请求需要用户验证。
402 Payment Required
该状态码是为了将来可能的需求而预留的。
403 Forbidden
服务器已经理解请求，但是拒绝执行它。
404 Not Found
请求失败，请求所希望得到的资源未被在服务器上发现，但允许用户的后续请求。

#### 5xx 服务器错误

表示服务器无法完成明显有效的请求。
500 Internal Server Error
通用错误消息，服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。没有给出具体错误信息。
501 Not Implemented
服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。
502 Bad Gateway
作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
503 Service Unavailable
由于临时的服务器维护或者过载，服务器当前无法处理请求
504 Gateway Timeout
作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。
505 HTTP Version Not Supported
服务器不支持，或者拒绝支持在请求中使用的HTTP版本。

### 第 7 题

出处同上：
请写出一个 HTTP post 请求的内容，包括四部分。
其中
第四部分的内容是 username=ff&password=123
第二部分必须含有 Content-Type 字段
请求的路径为 /path

提示：本题 15 分

```
> POST /path HTTP/1.1
> Host: passport.baidu.com
> User-Agent: curl/7.59.0
> Accept: */*
> Content-Length: 24
> Content-Type: application/x-www-form-urlencoded
>
>username=ff&password=123
```

### 第 8 题

请说出至少三种排序的思路，这三种排序的时间复杂度分别为

1. O(n*n)
2. O(n log2 n)

1. O(n + max)

提示：本题 5 分，因为没让你写代码，请自行搜索各排序的时间复杂度

**冒泡排序**，时间复杂度为 O(n*n)

实现思路：

1.比较相邻的元素。如果第一个比第二个大，就交换他们两个位置。

2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。

3.针对所有的元素重复以上的步骤，除了最后一个。

4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

**快速排序**，时间复杂度为 O(n*log2 n)

以一个元素为基准，重新排序数列，比基准值小的元素放左边，大的放右边，然后在对左半边和右半边重复以上操作，直到只有一个数字为止

**基数排序**，时间复杂度为 O(n+max)

①统一数值：将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零

②准备10个桶，分别为0~9号。用来填装不同数位上的值。

③桶内排序：从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后, 数列就变成一个有序序列。

④给桶排序：完成步骤1~3后，对桶按照大小顺序排序，把排序好的数组链接起来即可。

### 第 9 题

著名前端面试题：
一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？

这一题是在挖掘你的知识边界，所以你知道多少就要答多少。

可以先查阅一些资料再查，但是不要把自己不懂的东西放在答案里，面试官会追问的。

提示：本题 5 分，因为目前我们知道的不多。

在浏览器中输入url后发生了什么：
检查浏览器是否有缓存或缓存是否过期
解析DNS，建立IP链接
建立TCP链接
发起HTTP请求
收到服务器端响应
浏览器解析数据
关闭TCP链接

#### 1.解析DNS

在解析DNS的过程中，首先检测系统缓存，如果没有或已过期，则会根据域名从顶级、一级..开始查找，知道找到对应的服务器，然后建立IP链接

#### 2.建立TCP链接

建立TCP链接，就是通常所说的三次握手，首先是客户端向服务器发送请求是否可以建立链接，服务器返回同意后，客户端回馈服务器的响应即完成3次通话。每次建立链接前，客户端和服务端之前都要先进行三次对话，才正式传输内容，三次对话大概是这样的：
①客户端：我要连接你了，可以吗？
②服务端：嗯，我准备好了，连接我吧
③客户端：那我连接你咯
④开头后面的步骤

#### 3.发送HTTP请求

在完成3次握手后，由客户端向服务器端发送http请求，http请求内容包括：
请求行：方法+地址+http版本
请求头
请求体

#### 4.服务器处理请求后返回http报文

服务器端接到http请求后会在作出响应，响应的内容包括：
响应行：http版本+状态码+状态描述
响应头
响应体
其中响应的状态码包括：
2xx 成功
3xx 重定向
4xx 客户端错误
5xx 服务器端错误

#### 5.浏览器渲染

在客户端还没有完全接收完到服务器端的相应内容后，便已经开始在浏览器中渲染页面了，渲染过程包括：
**解析DOM Tree**
**解析CSS Tree**
把DOM+CSS Tree布局绘制到屏幕



在布局中有两个概念，重排和重绘，这两个动作如果频繁的话会非常影响页面性能，所以我们尽量避免以下会引起重排和重绘的操作：增删该DOM，移动DOM位置、修改DOM内容、修改CSS、resize窗口、修改网页默认字体、获取某些属性：width、offset-Top
**解析JS**
在解析html时，遇到js代码会停止解析html进行js解析，但是在js执行之前必须保证css文件已经加载完
js执行都是**单线程的**，因为它的用途决定了它就是个单线程，那么它的异步操作是怎么来的？
js执行时分同步任务和异步任务，在主线程执行同步任务，称其为执行栈。开启浏览器其他线程执行异步任务，称其为任务队列。js执行时先依次执行栈，完成后再从任务队列中提取事件，进行回调执行。

#### 6.关闭TCP链接

### 第 10 题

著名面试题：
如何实现数组去重？
假设有数组 array = [1,5,2,3,4,2,3,1,3,4]
你要写一个函数 unique，使得
unique(array) 的值为 [1,5,2,3,4]
也就是把重复的值都去掉，只保留不重复的值。

要求：

1. 不要做多重循环，只能遍历一次
2. 请给出两种方案，一种能在 ES 5 环境中运行，一种能在 ES 6 环境中运行（提示 ES 6 环境多了一个 Set 对象）

提示：本题 15 分，网上有很多答案可以参考。

```js
//方法1 ES5
var array = [1,5,2,3,4,2,3,1,3,4];
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));

//方法2 ES5
function unique(array) {
    var hash = {};
    var number = [];
    for(var i = 0; i < array.length; i++) {
        if(hash[array[i]] === undefined) {
            number.push(array[i]);
            hash[array[i]] = 1;
        }
    }
    return number
}
//方法3 ES6
function unique(array) {
   return Array.from(new Set(array));
}
console.log(unique(array));
```