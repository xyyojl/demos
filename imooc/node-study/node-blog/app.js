const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-Type', 'application/json');

    // 获取 path
    req.path = req.url.split('?')[0];

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return;
    }
    
    // 处理 user 路由
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(
            JSON.stringify(userData)
        )
        return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('404 Not Found\n');
    res.end();
}

module.exports = serverHandle

// process.env.NODE_ENV