/* 
    创建一个基于 JavaScript 对象的 Stack 类
*/
class Stack{
    constructor(){
        // 将使用一个 count 属性来帮助我们记录栈的大小
        this.count = 0;
        this.items = {};
    }
    // 方法
    push(element){
        this.items[this.count] = element;
        this.count++;
    }
    size(){
        return this.count;
    }
    isEmpty(){
        return this.count === 0;
    }
    pop(){
        // 要检验栈是否为空
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek(){
        if(!this.isEmpty()){
            return undefined;
        }
        return this.items[this.count - 1];
    }
    clear(){
        this.items = [];
        this.count = 0;
    }
    toString(){
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[0]}`;
        for(let i = 1; i < this.count;i++){
            objString = `${objString}${this.items[i]}`
        }
        return objString;
    }

}