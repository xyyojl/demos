const _items = Symbol('stackItems'); 
class Stack{
    constructor(){
        this[_items] = [];
    }
    push(element){
        this[_items].push(element);
    }
    pop(){
        return this[_items].pop();
    }
    peek(){
        return this[_items][this[_items].length - 1];
    }
    isEmpty(){
        return this[_items].length === 0;
    }
    size(){
        return this[_items].length;
    }
    clear(){
        this[_items] = [];
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