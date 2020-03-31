/* 
    栈是一种遵循从后进先出原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底
    为栈声明一些方法
        push(element(s)): 添加一个（或几个）新元素到栈顶
        pop(): 移除栈顶的元素，同时返回被移除的元素
        peek(): 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
        isEmpty(): 如果栈里没有任何元素就返回 true，否则返回 false
        clear(): 移除栈里的所有元素
        size(): 返回栈里的元素个数。该方法和数组的 length 属性很类似

*/

class Stack{
    constructor(){
        this.items = [];
    }
    push(element){
        this.items.push(element);
    }
    pop(){
        return this.items.pop();
    }
    peek(){
        return this.items[this.items.length - 1];
    }
    isEmpty(){
        return this.items.length === 0;
    }
    size(){
        return this.items.length;
    }
    clear(){
        this.items = [];
    }
}

const stack = new Stack();
console.log(stack.isEmpty()); // 输出为 true
stack.push(5);
stack.push(8);
console.log(stack.peek()); // 输出为 8
stack.push(11);
console.log(stack.size()); // 输出 3
console.log(stack.isEmpty()); // 输出 false 
stack.push(15); 
stack.pop();
stack.pop();
console.log(stack.size()); // 输出 2 