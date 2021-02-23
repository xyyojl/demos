const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // 模式：开发 development | 生产 production
    mode: 'development',
    // source-map
    devtool: 'source-map',
    // 优化，禁止压缩 最小化
    optimization: {
        minimize: false
    },
    // 入口文件 多文件入口
    entry: {
        // 当前文件夹下的 src
        index: resolve(__dirname, './src/js/index.js'),
        detail: resolve(__dirname, './src/js/detail.js'),
        collections: resolve(__dirname, './src/js/collections.js'),
    },
    // 输出/打包配置
    output: {
        // 路径
        path: resolve(__dirname, './dist'),
        // 打包后的文件名
        filename: 'js/[name].js'
    },
    // 模块配置
    module: {
        // 模块匹配规则
        rules: [
            // 处理 js
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            // 处理 tpl 模板文件
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            // 处理 css 相关
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|ipg|jpeg|gif|ico|woff|eot|svg|ttf)/i,
                loader: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({ // 用于使用模板打包时生成 index.html 文件，并且在 run dev 时会将模板文件也打包到内存中
            filename: 'index.html', // 打包后生成的文件
            template: resolve(__dirname, 'src/index.html'), // 模板文件
            title: '新闻头条',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true, // 添加 hash 值解决缓存问题
            minify: { // 对打包的 html 模板进行压缩
                removeComments: true, // 删除注释
                collapseWhitespace: true // 折叠空行变成一行
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: resolve(__dirname, 'src/detail.html'),
            title: '新闻详情',
            chunks: ['detail'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'collections.html',
            template: resolve(__dirname, 'src/collections.html'),
            title: '我的新闻',
            chunks: ['collections'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],
    // 开发服务器的配置，可以不用配置
    devServer: {
        // 控制监听文件的选项
        watchOptions: {
            ignored: /node_modules/
        },
        // 告诉 dev-server 在服务器启动后打开浏览器。 将其设置为 true 以打开默认浏览器
        open: true,
        // 指定要使用的 host
        host: 'localhost',
        // 指定端口号以侦听以下请求
        port: 3000
    }
}