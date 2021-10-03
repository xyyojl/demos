我们将自己构建经典的街机游戏贪吃蛇。在贪吃蛇中，玩家控制一条蛇向上、向下、向左、或向右移动。随着蛇在游戏区域内移动，苹果会出现。当蛇碰到一个苹果，它会吃掉苹果并且会变长。但是，如果蛇碰到了墙壁或者自己身体的某个部分，游戏会结束了。

> 在本章中，我们将介绍游戏的一般结构，并且看看绘制边框和分数以及结束游戏的代码。

## 16.1 游戏逻辑

游戏运行的过程中，需要记录 4 项内容并将其绘制到屏幕上：边框（灰色）、分数（黑色）、贪吃蛇（蓝色）和苹果（浅绿色）。

## 16.2 游戏的结构

在开始编写代码之前，先来看看游戏的整体结构。如下的伪代码描述了程序需要做什么：

```
Set up the canvas
Set score to zero
Create snake
Create apple

Every 100 milliseconds {
	Clear the canvas
	Draw current score on the screen
	Move snake in current direction
	If snake collides with wall or itself {
		End the game
	} Else If snake eats an apple {
		Add one to score
		Move apple to new location
		Make snake longer
	}
	For each segment of the snake {
		Draw the segment
	}
	Draw apple
	Draw border
}

When the user presses a key {
	If the key is an arrow {
		Update the direction of the snake
	}
}
```

下面先来看看程序中的主要组成部分，并且规划处开发它们所需的一些 JavaScript 工具。

### 16.2.1 使用 setInterval 来实现游戏动画

在伪代码中可以看到，每 100 毫秒中，我们需要调用一系列的函数和方法来更新内容并将一切内容绘制到游戏面板上。

我们将使用 setInterval ，通过以常规的时间间隔来调用那些函数，从而实现游戏动画。在最终的游戏中，对 setInterval  的调用如下所示：

```js
var intervalId = setInterval(function() {
    // 使用 clearRect 清除了画布，从而可以绘制动画中的下一步
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);
```

还要注意，我们将时间间隔 ID 保存到了变量 intervalId 中。当游戏结束的时候，并且想要停止动画的时候，我们需要用到它。

### 16.2.2 创建游戏对象

需要使用到面向对象编程来表示游戏中的两个主要的对象，即贪吃蛇和苹果。我们将为这些对象中的每一个创建一个构造方法（名为 Snake 和 Apple），然后，将方法（例如，move 和 draw）添加到这些构造方法的原型中。

我们还用网格来划分游戏面板，并且创建了一个名为 Block 的构造方法，使用它来创建表示网格中的方块的对象。我们将使用这些 Block 对象来表示贪吃蛇的身体段的位置，并且使用一个单个的 Block 对象来保存苹果的当前位置。这些 Block 还拥有一些方法，可以绘制贪吃蛇的身体段和苹果。


### 16.2.3 设置键盘控制

在前面的伪代码中，有一部分专门用来响应用户按下键盘。为了允许用户使用键盘上的箭头键来控制贪吃蛇，我们使用 jQuery 来响应键盘按下，就像在第 15 章中所做的一样。通过查看按键码来识别出按下来哪一个键，然后，相应地设置贪吃蛇的方向。

## 16.3 游戏设置

我们首先设置 HTML、画布以及整个游戏中所需的一些变量。然后，来处理游戏中所需的几个较为简单的函数，包括绘制游戏板边框的函数，在屏幕上绘制分数的函数，以及结束游戏的函数。在下一章中，我们将创建贪吃蛇和苹果的构造方法和方法，为箭头按键创建事件处理程序，并将所有这些组合起来以完成游戏。

### 16.3.1 创建 HTML

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>开发贪吃蛇游戏第 1 部分</title>
</head>
<body>
  <canvas id="canvas" width="400" height="400"></canvas>

  <script src="https://code.jquery.com/jquery-2.1.0.js"></script>

  <script>
    // 自己构建经典的街机游戏贪吃蛇
  </script>
</body>
</html>
```

### 16.3.2 定义 canvas、ctx、width 和 height 变量

首先，定义了 canvas 和 ctx 变量，它们将允许我们在画布上绘制，此外还有 width 和 height 变量，以获取 canvas 元素的宽度和高度。

```js
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
```

### 16.3.3 将画布划分为块

接下来，我们创建了变量来帮助自己将画布当做是 10 像素 x 10 像素的块的一个网格，如图 16-2 所示。尽管这个网格是不可见的（也就是说，游戏实际上并不会显示它），游戏中的一切都将以它对齐的方式来绘制。

贪吃蛇和苹果都将是一个块的宽度，以便它们都能够刚好放到这个网格中。对于动画的每一个步骤，贪吃蛇将会在其相应的方向移动一个方格。

将使用这些变量在画布上创建块：

```js
var blockSize = 10; // 1
var widthInBlocks = width / blockSize; // 2
var heightInBlocks = height / blockSize;
```

在 1 处，创建了一个名为 blockSize 的变量并且将其设置为 10，因为想要将块设置为 10 像素宽和高。

在 2 处，创建了变量 widthInBlocks 和 heightInBlocks。将 widthInBlocks  设置为画布的宽度除以块的大小，这就得到了画布有多少个块那么宽。类似的，heightInBlocks 告诉我们画布有多少个块那么高。在画布达到 400 个像素宽和高的时候，widthInBlocks 和 heightInBlocks 都是 40.如果你统计图 16-2 中的方块数目（边框），就会看到它的宽和高都是 40 个块。

### 16.3.4 定义 score 变量

```js
var score = 0;
```

使用 score 变量来记录玩家的分数。程序刚开始，将 score 设置为 0。每次贪吃蛇吃掉一个苹果的时候，将 score 增加 1。

## 16.4 绘制边框

创建一个 drawBorder 函数来绘制围绕画布的边框。将这个边框设置为 1 个块（10 像素）那么宽。

```js
var drawBorder = function() {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);						// 1
    ctx.fillRect(0, height - blockSize, width, blockSize);		// 2
    ctx.fillRect(0, 0, blockSize, height);						// 3
    ctx.fillRect(width - blockSize, 0, blockSize, height);		// 4
}
```

首先将 fillStyle 设置为灰色，因为想要让边框显示为灰色。

在 1 处，绘制了边框的顶部矩形，这里，从画布的左上角(0, 0)，绘制了一个矩形，其宽度为 width（400 像素），而高度为 blockSize（10 像素）。

在 2 处，绘制了边框的底边，这是位于坐标(0, height - blockSize)，或者(0, 390) 的一个矩形，即位于画布底部之上的 10 个像素的位置。和顶部的边框一样，这个矩形的宽度为 width，而高度为 blockSize（10 像素）。

在 3 处，绘制了左边框

在 4 处，绘制了右边框

## 16.5 显示分数

现在来编写 drawScore 函数，以便在画布的左上角显示分数。该函数使用 fillText 环境方法为画布添加文本。fillText 方法接收一个文本字符串，以及想要显示文本的位置的 x 和 y 坐标。例如：

```js
ctx.fillText("Hello World!", 50, 50);
```

将会在画布上的坐标(50, 50) 处显示字符串 "Hello World!"

我们已经把文本显示到画布上了。但是，如果想要对文本的外观进行更多的控制，例如，调整大小和字体，以及更改对齐方式，该怎么办呢？我们可能想要实现不同的字体显示贪吃蛇游戏中的分数，让文本更大一些，并且确保文本准确地位于左上角，紧挨着边框的下面。因此，在编写 drawScore 函数之前，先来了解一下 fillText 方法，看看定制文本在画布上的显示的一些方法。

### 16.5.1 设置文本基线

确定文本出现在什么地方的坐标位置叫做基线（baseline）。默认情况下，文本的左下角和基线点对齐，以便文本出现在基线点的右上方。

要修改文本相对于基线的位置，可以更改 textBaseline 属性，该属性的默认值是 “bottom”，但是，也可以将其设置为 “top” 或 “middle”。

例如：要把文本放到基线之下，输入

```js
ctx.textBaseline = "top";
ctx.fillText("Hello World!", 50, 50);
```

现在，当你调用 fillText 的时候，文本将位于点(50, 50) 的下方。

类似的，要修改文本相对于基线点的水平位置，可以将 textAlign 属性设置为 “left”、“center” 或 “right”。

### 16.5.2 设置大小和字体

可以通过设置绘制环境的 font 属性来更改文本的大小和字体。

```js
ctx.font = "20px Courier";
ctx.fillText("Courier", 50, 50);

ctx.font = "24px Comic Sans MS";
ctx.fillText("Comic Sans", 50, 100);

ctx.font = "18px Arial";
ctx.fillText("Arial", 50, 150);
```

font 属性接受一个字符串，其中包含了想要使用的字体的大小和名称，

我将 font 属性设置为 "20px Courier"，这意味着文本将会以 20 像素大小的 Courier 字体显示。

### 16.5.3 编写 drawScore 函数

它绘制了一个字符串，以便在画布上显示当前分数。

```js
var drawScore = function() {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
}
```

当调用 fillText 的时候，将 x 和 y 坐标设置为 blockSize。由于已经将 blockSize 设置为 10 了，这次将分数的基线点设置为 (10, 10)，这刚好在边框的左上角之中。由于将 textBaseline 设置为 “top”，因此文本刚好出现在基线点的下方。

## 16.6 结束游戏

当贪吃蛇碰到墙壁或者碰到自己的身体的时候，我们将调用 gameOver 函数来结束游戏。gameOver  函数使用 clearInterval 来停止游戏，并且在画布上显示文本“Game Over”。gameOver 函数如下所示：

```js
var gameOver = function() {
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
}
```

## 16.7 本章小结

在本章中，我们介绍了贪吃蛇游戏的大概框架，以及开发游戏所需的一些函数。学习了如何把文本绘制到画布上，以及如何定制其大小、字体和位置。

在下一章中，我们编写贪吃蛇和苹果的代码，以及处理键盘事件的代码，从而完成这个游戏。





























16.4.1

16.4.2

16.4.3