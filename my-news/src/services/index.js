import HTTP from '../libs/http';

class Service extends HTTP {
    getNewsList(type, count) {
        // 外面需要使用到 async & await 所以需要返回一个 Promise
        return new Promise((resolve, reject) => {
            this.ajax({
                url: 'Juhe/getNewsList',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    field: type
                },
                success(data) {
                    resolve(data);
                },
                error(err) {
                    reject(err);
                }
            })
        })
    }
}

// 导出类或者实例
export default new Service();