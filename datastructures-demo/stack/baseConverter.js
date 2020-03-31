/* 
    实现能把十进制转换成基数为 2～36 的任意进制
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

function baseConverter(decNumber, base){
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let number = decNumber;
    let rem;
    let baseString = '';

    if(!(base >= 2 && base <= 36)){
        return '';
    }

    while(number > 0){
        // 要使用 Math.floor 函数仅返回除法运算结果的整数部分
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0 