let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  width = window.innerWidth,
  height = window.innerHeight,
  count = 0,
  meteors = []; // 流星集合

canvas.width = width;
canvas.height = height;

class Moon {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.circle_x = width / 2; // 旋转轨迹圆心的 X 坐标
    this.circle_y = width; // 旋转轨迹圆心的 Y 坐标
    this.circle_r = width; // 旋转轨迹的半径
    this.angle = Math.atan2(Math.sqrt(width * width * 3 / 4), -width / 2); // 旋转轨迹的角度
    this.startAngle = Math.atan2(Math.sqrt(width * width * 3 / 4), -width / 2 - 400); // 开始旋转的角度
    this.endAngle = Math.atan2(Math.sqrt(width * width * 3 / 4), width / 2 + 200); // 结束旋转的角度
    this.x = 0; // 月亮的 X 坐标
    this.y = 0; // 月亮的 Y 坐标
  }

  draw() {
    const { context, x, y, width, height } = this;
    
    // createRadialGradient 实现径向渐变
    const gradient = context.createRadialGradient(x, y, 50, x, y, 600);
    gradient.addColorStop(0, 'rgb(255, 255, 255)');
    gradient.addColorStop(0.01, 'rgb(70, 80, 80)');
    gradient.addColorStop(0.2, 'rgb(40, 40, 50)');
    gradient.addColorStop(0.4, 'rgb(20, 20, 30)');
    gradient.addColorStop(1, '#080d23');

    // save 方法：将当前状态放入栈中，保存 canvas 全部状态的方法
    context.save();
    context.fillStyle = gradient; // 填充
    context.fillRect(0, 0, width, height); // 绘制一个填充了内容的矩形
    context.restore(); // 将 canvas 恢复到最近的保存状态
  }
  
  // 让月亮动起来
  move() {
    const { circle_x, circle_y, circle_r, angle, startAngle, endAngle } = this;
    this.angle = angle - 0.0001;

    if (this.angle <= endAngle) {
      this.angle = startAngle;
    }

    this.x = circle_x + (circle_r * Math.cos(angle));
    this.y = circle_y - (circle_r * Math.sin(angle)) + 50;
  }

}


class Stars {
  constructor(context, width, height, amount) {
    this.context = context;
    this.width = width;
    this.height = height;
    // 通过方法去生成星星集合
    this.stars = this.getStars(amount);
  }

  // 获取指定数量的星星
  getStars(amount) {
    let stars = [];
    while (amount--) {
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() + 0.5,
      })
    }
    return stars;
  }
  
  // 描绘
  draw() {
    const { context } = this;
    context.save();
    context.fillStyle = 'white';
    this.stars.forEach(star => {
      context.beginPath();
      context.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      context.fill();
    })
    context.restore();
  }

  // 闪烁，让星星半径随机变大或变小，实现一闪一闪亮晶晶的效果
  blink() {
    this.stars = this.stars.map(star => {
      const sign = Math.random() > 0.5 ? 1 : -1;
      star.r += sign * 0.2;
      if (star.r < 0) {
        star.r = -star.r;
      } else if (star.r > 1) {
        star.r -= 0.2;
      }
      return star;
    })
  }
}


class Meteor {
  constructor(context, x, h) {
    this.context = context;
    this.x = x;
    this.y = 0;
    this.h = h;
    this.vx = -(5 + Math.random() * 5);
    this.vy = -this.vx;
    this.len = Math.random() * 300 + 100;
  }

  flow() {
    // 判定流星出界
    if (this.x < -this.len || this.y > this.h + this.len) {
      return false;
    }

    this.x += this.vx;
    this.y += this.vy;
    return true;
  }

  draw() {
    const { context } = this;
    // 径向渐变，从流星头尾圆心，半径越大，透明度越高
    let gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.len);

    const PI = Math.PI;
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    context.save();
    context.fillStyle = gradient;
    context.beginPath();
    // 流星头，二分之一圆
    context.arc(this.x, this.y, 0.5, PI / 4, 5 * PI / 4);
    // 绘制流星尾，三角形
    context.lineTo(this.x + this.len, this.y - this.len);
    context.closePath();
    context.fill();
    context.restore();
  }
}

// 生成流星
const meteorGenerator = () => {
  const x = Math.random() * width;
  meteors.push(new Meteor(context, x, height));
}

let moon = new Moon(context, width, height),
  stars = new Stars(context, width, height, 200);
  
// 每一帧动画生成函数
const frame = () => {
  count++;
  // 每隔 10 帧星星闪烁一次，节省计算资源
  count % 10 == 0 && stars.blink();
  // 每隔 300 帧，会有流星划过夜空
  count % 300 == 0 && meteorGenerator();

  moon.move();
  moon.draw();
  stars.draw();

  meteors.forEach((meteor, index, arr) => {
    // 如果流星离开视野之内，销毁流星实例，回收内存
    if (meteor.flow()) {
      meteor.draw();
    } else {
      arr.splice(index, 1);
    }
  })

  requestAnimationFrame(frame);
}

frame();