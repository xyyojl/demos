在本章中，我们完成贪吃蛇游戏的构建。在第 16 章中，我们设置了游戏区域并且介绍了游戏大概的样子。现在，我们来创建表示游戏中的贪吃蛇和苹果的对象，并且编写一个键盘事件处理程序，以便玩家能够使用箭头键控制贪吃蛇。最后，我们将给出游戏的完整代码列表。

贪吃蛇和苹果对象都依赖于一个更加基础的块对象，我们使用该对象来表示游戏面板网格中的一个块。首先为这一简单的块对象创建一个构造方法。

## 17.1 构建 Block 构造方法

在本节中，我们将定义一个 Block 构造方法，它会创建对象来表示不可见的游戏网格中的单个块。每个块都有 col（column 的缩写）和 row 属性，它们将存储特定的块在网格上的位置。图 17-1 展示了这个带有数目固定的一些列和行的网格。尽管这个网格并不会真正的出现在屏幕上，游戏设计成让苹果和贪吃蛇段总是能够和网格中的块对齐。

在图 17-1 中，位于第 10 列第 10 行包含了绿色的苹果。贪吃蛇的头位于第 8 列第 10 行（在苹果的左边）。

以下是 Block 的构造方法的代码。

```js
var Block = function(col, row) {
    this.col = col;
    this.row = row;
}
```

列值和行值作为参数传递给构造方法，并且保存在新的对象的 col 和 row 属性中。

现在，使用该构造方法来创建一个对象，以表示游戏网格上的一个特定的块。例如，下面我们创建了一个对象，表示了第 5 列第 5 行中的块。

```js
var sampleBlock = new Block(5, 5);
```

### 17.1.1 添加 drawSquare 方法

到目前为止，这个块对象允许我们表示网格中的一个位置，但是要真正让某个事物出现在该位置，我们需要加你绘制到画布上。接下来，添加了两个方法，drawSquare 和 drawCircle，它们分别可以在网格的一个特定的块上绘制一个方框和一个圆圈。首先，drawSquare 方法如下所示：

```js
Block.prototype.drawSquare = function(color) {
    var x = this.col * blockSize; // 1
    var y = this.row * blockSize; // 2
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
}
```

在第 12 章中，我们介绍过，如果给一个构造方法的 prototype 属性添加方法，使用该构造方法创建的任何对象都能够使用这些方法。因此，通过将 drawSquare 方法添加给 Block.prototype，我们使得任何块对象都可以使用该方法。

这个方法在该块的 col 属性和 row 属性所给定的位置绘制一个方块。它接受单个的参数 color，该参数决定了方块的颜色。要使用 canvas 绘制一个方块，我们需要提供方块左上角的 x 和 y 坐标位置。在 1 和 2 处，我们通过将 col 和 row 属性乘以 blockSize，计算出当前块的 x 值 和 y 值。然后将绘制环境的 fillStyle 属性设置为该方法的 color 参数。

最后，调用 ctx.fillRect，传入计算得到的 x 和 y 值以及 blockSize，用作方块的宽度和高度。

测试一下

```js
var sampleBlock = new Block(3, 4);
sampleBlock.drawSquare("LightBlue");
```

图 17-2 展示了这个方块绘制到画布上的样子，以及如何度量所计算的方块。

### 17.1.2 添加 drawCircle 方法

它类似于 drawSquare 方法，但是它绘制一个圆圈而不是方块。

```js
var circle = function(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

Block.prototype.drawCircle = function(color) {
  var centerX = this.col * blockSize + blockSize / 2;
  var centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
}

// 测试一下
var sampleCircle = new Block(4, 3);
sampleCircle.drawCircle("LightGreen");
```

首先，创建了两个新的变量 centerX 和 centerY，以计算圆圈的圆心的位置。和前面一样，将 col 和 row 属性乘以 blockSize，但是，这一次还必须加上 blockSize / 2，因为我们需要圆心的像素坐标，它刚好在一个块的中间（如图 17-3 所示）。

和 drawSquare 中一样，将环境 fillStyle 设置为 color 参数，然后调用可靠的 circle 函数，传入 centerX 和 centerY 作为 x 和 y 坐标，传入 blockSize / 2 作为半径，并且参数为 true，告诉函数填充圆圈。

### 17.1.3 添加 equal 方法

在游戏中，需要知道两个块是否位于同一位置。例如，如果苹果和贪吃蛇的头部位于同一位置，这意味着，贪吃蛇会吃掉苹果。另一方面，如果贪吃蛇的头部和尾部位于同一位置，那么，贪吃蛇碰到了自己。

为了使得比较块的位置更为容易，我们给 Block 构造方法原型添加了 equal 方法。当在一个块对象上调用 equal 并传递给另一个对象作为一个参数，如果两个对象位于相同的位置，它将会返回 true（否则的话，返回 false）。代码如下：

```js
Block.prototype.equal = function(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
}
```

该方法相当简单直接，如果两个块（this 和 otherBlock）具有相同的 col 和 row 属性（也就是说，如果 this.col 等于 otherBlock.col,并且 this.row 等于 otherBlock.row），那么，它们位于相同的位置，并且该方法返回 true。

例如，创建名为 apple 和 head 的两个新的块，看看它们是否位于相同的位置：

```js
var apple = new Block(2, 5);
var head = new Block(3, 5);
console.log(head.equal(apple));
```

尽管 apple 和 head 拥有相同的 row 属性（5），但其 col 属性是不同的。如果我们将 head 设置为一个新的块对象，并且向左移动一列，那么现在该方法告诉我们这两个对象位于相同的位置：

```js
var head = new Block(2, 5);
console.log(head.equal(apple));
```

注意，写作 head.equal(apple) 还是 apple.equal(head) 没有任何区别，在这两种情况下，我们是在进行相同的比较。

稍后将使用 equal 方法来检查贪吃蛇是否吃到苹果或者碰到自己。

## 17.2 创建贪吃蛇

现在来创建贪吃蛇。我们把贪吃蛇的位置存储为一个名为 segments 的数组，其中包含了一系列的块对象。为了移动贪吃蛇，我们在 segments 数组开头添加一个新的块，并且从数组的尾部删除该块。segments 数组的第一个元素将表示贪吃蛇的头部。

### 17.2.1 编写 Snake 构造方法 

首先，需要一个构造方法来创建贪吃蛇对象：

```js
var Snake = function() {
  this.segments = [ // 1
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right"; // 2
  this.nextDirection = "right"; // 3
}
```

定义 Snake 的 Segments

1 处的 segments 属性是块对象的一个数组，其中每个块对象表示贪吃蛇身体的一段。当开始游戏的时候，这个数组将包含 3 个块，分别位于(7, 5)、(6, 5)、(5, 5)。图 17-4 展示了贪吃蛇的这 3 个最初的段。

设置移动的方向

2 处的 direction 属性存储的贪吃蛇的当前位置。构造方法还在 3 处添加了 nextDirection 属性，它存储了贪吃蛇在下一个动画步骤将要移动的方向。当玩家按下一个箭头键的时候，这个属性将由 keydown 事件处理程序（参见 17.4.1 小节）更新。现在，构造方法将这两个属性都设置为“right”，因此游戏一开始的时候，贪吃蛇向右移动。

### 17.2.2 绘制贪吃蛇

为了绘制贪吃蛇，我们直接遍历其 segments 数组中的每一个块，在每个块上调用在前面所创建的 drawSquare 方法。这将会成为贪吃蛇的每一段都绘制一个方块。

```js
Snake.prototype.draw = function() {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("Blue");
  }
}
```

draw 方法使用一个 for 循环来在 segments 数组的每一个块对象上运行。每一次循环之中，这段代码都接受当前的段(this.segments[i])，并且在其上调用 drawSquare("Blue")，这将会在相应的块中绘制一个蓝色的块。

如果想要测试 draw 方法，可以运行如下的代码，这会使用 Snake 构造方法创建一个新的对象，并且调用其 draw 方法：

```js
var snake = new Snake();
snake.draw();
```

## 17.3 移动贪吃蛇

### 17.3.1 添加 move 方法

```js
Snake.prototype.move = function() {
  var head = this.segments[0];
  var newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
    console.log("newHead", newHead);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
}
```

### 17.3.2 添加 checkCollision 方法

```js
Snake.prototype.checkCollision = function(head) {
  var leftCollision = (head.col === 0);
  var topCollision = (head.row === 0);
  var rightCollision = (head.col === widthInBlocks - 1);
  var bottomCollision = (head.row === heightInBlocks - 1);

  var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

  var selfCollision = false;

  for (var i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }

  return wallCollision || selfCollision;
}
```

## 17.4 用键盘设置贪吃蛇的方向

### 17.4.1 添加 keydown 事件处理程序

```js
var directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

$("body").keydown(function(event) {
  var newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    console.log("newDirection", newDirection);
    snake.setDirection(newDirection);
  }
})
```

### 17.4.1 添加 setDirection 方法

```js
Snake.prototype.setDirection = function(newDirection) {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }

  this.nextDirection = newDirection;
}
```


## 17.5 创建苹果

### 17.5.1 编写 Apple 构造方法

```js
var Apple = function() {
  this.position = new Block(10, 10);
}
```

### 17.5.2 绘制苹果

```js
Apple.prototype.draw = function() {
  this.position.drawCircle("limeGreen");
}
```

### 17.5.3 移动苹果

```js
Apple.prototype.move = function() {
  var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);
}
```

## 17.6 综合应用

游戏的完整代码，包含了将近 200 行的 JavaScript 代码。将其整合之后，如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>贪吃蛇游戏综合应用</title>
</head>
<body>
  <canvas id="canvas" width="400" height="400"></canvas>

  <script src="https://code.jquery.com/jquery-2.1.0.js"></script>
  <script>
    // Set up canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    // Get the width and height from the canvas element
    var width = canvas.width;
    var height = canvas.height;

    // Work out the width and height in blocks
    var blockSize = 10;
    var widthInBlocks = width / blockSize;
    var heightInBlocks = height / blockSize;

    // Set score to 0
    var score = 0;

    // Draw the border
    var drawBorder = function() {
      ctx.fillStyle = "Gray";
      ctx.fillRect(0, 0, width, blockSize);
      ctx.fillRect(0, height - blockSize, width, blockSize);
      ctx.fillRect(0, 0, blockSize, height);
      ctx.fillRect(width - blockSize, 0, blockSize, height);
    };

    // Draw the score in the top-left corner
    var drawScore = function() {
      ctx.font = "20px Courier";
      ctx.fillStyle = "Black";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + score, blockSize, blockSize);
    };

    // Clear the interval and display Game Over text
    var gameOver = function() {
      // clearInterval(intervalId);
      ctx.font = "60px Courier";
      ctx.fillStyle = "Black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Game Over", width / 2, height / 2);
    };

    // Draw a circle(using the function from Chapter 14)
    var circle = function(x, y, radius, fillCircle) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      if (fillCircle) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }

    // The Block constructor
    var Block = function(col, row) {
      this.col = col;
      this.row = row;
    }

    // Draw a square at the block's location
    Block.prototype.drawSquare = function(color) {
      var x = this.col * blockSize;
      var y = this.row * blockSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, blockSize, blockSize);
    }

    // Draw a circle at the block's location
    Block.prototype.drawCircle = function(color) {
      var centerX = this.col * blockSize + blockSize / 2;
      var centerY = this.row * blockSize + blockSize / 2;
      ctx.fillStyle = color;
      circle(centerX, centerY, blockSize / 2, true);
    }

    // Check if this block is in the same location as another block
    Block.prototype.equal = function(otherBlock) {
      return this.col === otherBlock.col && this.row === otherBlock.row;
    }

    // The Snake constructor
    var Snake = function() {
      this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
      ];

      this.direction = "right";
      this.nextDirection = "right";
    }

    // Draw a square for each segment of the snake's body
    Snake.prototype.draw = function() {
      for (var i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
      }
    }

    // Create a new head and add it to the beginning of
    // the snake to move the snake in its current direction
    Snake.prototype.move = function() {
      var head = this.segments[0];
      var newHead;

      this.direction = this.nextDirection;

      if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
      } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
      } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
      } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
      }

      if(this.checkCollision(newHead)) {
        gameOver();
        return;
      }

      this.segments.unshift(newHead);

      if (newHead.equal(apple.position)) {
        score++;
        apple.move();
      } else {
        this.segments.pop();
      }
    }

    // Check if the snake's new head has collided width the wall or itself
    Snake.prototype.checkCollision = function(head) {
      var leftCollision = (head.col === 0);
      var topCollision = (head.row === 0);
      var rightCollision = (head.col === widthInBlocks - 1);
      var bottomCollision = (head.row === heightInBlocks - 1);

      var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

      var selfCollision = false;
      for (var i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
          selfCollision = true;
        }
      }

      return wallCollision || selfCollision;
    }

    // Set the snake's next direction based on the keyboard
    Snake.prototype.setDirection = function(newDirection) {
      if (this.direction === "up" && newDirection === "bottom") {
        return;
      } else if (this.direction === "right" && newDirection === "left") {
        return;
      } else if (this.direction === "down" && newDirection === "up") {
        return;
      } else if (this.direction === "left" && newDirection === "right") {
        return;
      }

      this.nextDirection = newDirection;
    }

    // The Apple constructor
    var Apple = function() {
      this.position = new Block(10, 10);
    };

    // Draw a circle at the apple's location
    Apple.prototype.draw = function() {
      this.position.drawCircle("LimeGreen");
    }

    // Move the apple to a new random location
    Apple.prototype.move = function() {
      var randomCol = Math.floor(Math.random() * widthInBlocks - 2) + 1;
      var randomRow = Math.floor(Math.random() * heightInBlocks - 2) + 1;
      this.position = new Block(randomCol, randomRow);
    }

    // Create the snake and apple objects
    var snake = new Snake();
    var apple = new Apple();

    // Pass an animation function to setInterval
    var intervalId = setInterval(function() {
      ctx.clearRect(0, 0, width, height);
      drawScore();
      snake.move();
      snake.draw();
      apple.draw();
      drawBorder();
    }, 100);

    // Covert keycodes to directions
    var directions = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    }

    // The keydown handler for handing direction key presses
    $("body").keydown(function(event) {
      var newDirection = directions[event.keyCode];
      if (newDirection !== undefined) {
        snake.setDirection(newDirection);
      }
    })

  </script>
</body>
</html>
```
