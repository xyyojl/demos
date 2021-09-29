/*
* index.ts                         // 文件名
* @desc npm install -g typescript // 已安装绕过
* @desc tsc index.ts              // 使用 tsc 将 ts 编译为 js
* @desc node index.js
*/
var num = function (index) {
    return 8 << index;
};
console.log(num(2));
