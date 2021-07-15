var APP_ID = 'QQ1Nqrp88ugKFRtId9KknVKl-gzGzoHsz';
var APP_KEY = 'Jgi6JnSQIp2aixTwjHEi12o1';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

// 获取数据
const query = new AV.Query('Message');
query.find().then(function (messages) {
    // messages 是一个数组
    const array = messages.map(item => item.attributes);
    // 将数据插入到页面
    array.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name}: ${item.content}`;
        const messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
    });
    // 下面两个东西都没有用
}).then(function() {
    // 更新成功
}, function(error) {
    // 异常处理
})

// 提交数据
let myForm = document.querySelector('#postMessageForm');
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // 获取到 content 和 name，调用方法，进行提交
    const name = myForm.querySelector('input[name=name]').value;
    const content = myForm.querySelector('textarea[name=content]').value;
    if(name === '' || content === '') {
        alert('想要留下的信息，请记得输入姓名和留言内容，谢谢');
        return;
    }
    const Message = AV.Object.extend('Message');
    const message = new Message();
    message.save({
        'name': name,
        'content': content,
    }).then(function (object) {
        console.log('success');
        // 提交成功，不刷新页面，插入一条数据即可
        // attributes
        const { name, content } = object.attributes;
        const li = document.createElement('li');
        li.innerText = `${name}: ${content}`;
        const messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
        myForm.querySelector('input[name=name]').value = '';
        myForm.querySelector('textarea[name=content]').value = '';
    })
})
