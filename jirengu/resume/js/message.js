!(function () {
    var view = document.querySelector('section.message');

    var model = {
        init() {
            var APP_ID = 'QQ1Nqrp88ugKFRtId9KknVKl-gzGzoHsz';
            var APP_KEY = 'Jgi6JnSQIp2aixTwjHEi12o1';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })

        },
        // 获取数据
        fetch() {
            const query = new AV.Query('Message');
            return query.find(); // Promise 对象
        },
        // 保存数据
        save(name, content) {
            const Message = AV.Object.extend('Message');
            const message = new Message();
            return message.save({ // Promise 对象
                'name': name,
                'content': content,
            })
        }
    };

    var controller = {
        view: null,
        model: null,
        messageList: null,
        form: null,
        init(view, model) {
            this.view = view;
            this.model = model;
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');

            this.model.init();
            this.loadMessages();
            this.bindEvents();

        },
        bindEvents() {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                this.saveMessages();
            }.bind(this));
        },
        loadMessages() {
            model.fetch().then(function (messages) {
                // messages 是一个数组
                const array = messages.map(item => item.attributes);
                // 将数据插入到页面
                array.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = `${item.name}: ${item.content}`;
                    this.messageList.appendChild(li);
                });
            })
        },
        saveMessages() {
            // 获取到 content 和 name，调用方法，进行提交
            // this.form 重复太多，之前是手动修改的，可以给 myForm 赋值为 this.form
            const myForm = this.form;
            const name = myForm.querySelector('input[name=name]').value;
            const content = myForm.querySelector('textarea[name=content]').value;
            if (name === '' || content === '') {
                alert('想要留下的信息，请记得输入姓名和留言内容，谢谢');
                return;
            }
            model.save(name, content).then(function (object) {
                console.log('success');
                // 提交成功，不刷新页面，插入一条数据即可
                const { name, content } = object.attributes;
                const li = document.createElement('li');
                li.innerText = `${name}: ${content}`;
                this.messageList.appendChild(li);
                myForm.querySelector('input[name=name]').value = '';
                myForm.querySelector('textarea[name=content]').value = '';
            })
        }
    };

    controller.init(view, model);
}).call();