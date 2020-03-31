const items = new WeakMap();
// 声明一个 WeakMap 类型的变量 items
class Stack{
    constructor(){
        // 在 constructor 中，以 this（Stack 类自己的引用）为键，把代表栈的数组 存入 items

        items.set(this, []);
    }
    push(element){
        // 从 WeakMap 中取出值，即以 this 为键（行{2}设置的）从 items 中取值。
        const s = items.get(this);
        s.push(element);
    }
    pop(){
        const s = items.get(this);
        const r = s.pop();
        return r;
    }
    // 其他方法
}