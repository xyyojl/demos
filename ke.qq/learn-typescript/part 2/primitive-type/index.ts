// 基本类型
/* let isMale: boolean = true;

let myName: string = 'Alex';

let myAge: number = 20;

let myGirlfriend: null = null;

let myHouse: undefined = undefined; */


// 类型推论
// 定义时未赋值就会推论成 any 类型
/* let isMale;
isMale = true;

// 定义时赋值就能利用到类型推论
let myName = 'Alex';

let myAge = 20;

let myGirlfriend = null;

let myHouse = undefined; */

// any
/* let seven: any = 7;
seven = 'Seven'; */

/* let seven;

seven = 7; */

// 联合类型

/* let seven: number | string;

seven.toString();

seven = 'Seven';

seven = 7; */

// 类型断言

let seven: number | string;

(seven as number).toFixed(3);

(seven as string).length;

seven.toString();