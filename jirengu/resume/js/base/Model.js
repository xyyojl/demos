/* 
var model = Model({
  resourceName: '表名'
})
*/
window.Model = function(options) {
    const { resourceName } = options;
    return {
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
            const query = new AV.Query(resourceName);
            return query.find(); // Promise 对象
        },
        // 保存数据
        save(object) {
            const X = AV.Object.extend(resourceName);
            const x = new X();
            return x.save(object);  // Promise 对象
        }
    }   
}

/* var model = {
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
}; */