const handleUserRouter = (req, res) => {
    const method = req.method; // GET POST
    const url = req.url;

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: '这是登录的接口'
        }
    }

}

module.exports = handleUserRouter;