!(function () {
    var view = View('section.message');

    var model = Model({
        resourceName: 'Message'
    });
    
    var controller = Controller({
        view: null,
        model: null,
        messageList: null,
        form: null,
        init(view, model) {
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            
            this.loadMessages();
            
            // 交给 Controller 处理
            /* this.view = view;
            this.model = model;
            this.model.init();
            this.bindEvents(); */
        },
        bindEvents() {
            this.form.addEventListener('submit', function (e) {
                e.preventDefault();
                this.saveMessages();
            }.bind(this));
        },
        loadMessages() {
            this.model.fetch().then(function (messages) {
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
            this.model.save({ 
                'name': name,
                'content': content 
            }).then(function (object) {
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
    })

    controller.init(view, model);
}).call();