/* 
    从十进制到二进制

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

function decimalToBinary(decNumber){
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while(number > 0){
        // 要使用 Math.floor 函数仅返回除法运算结果的整数部分
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }
    while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000 