import './imports';
import service from '../services';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import { NEWS_TYPE } from '../data';

import { scrollToBottom } from '../libs/utils';


; (function (doc) {
    const oApp = doc.querySelector('#app');
    let oListWrapper = null;
    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        isLoading: false
    };

    const newsData = {};
    // 为什么需要使用到 async、await
    const init = async () => {
        render();
        setNewsList();
        bindEvent();
    };

    function bindEvent() {
        NavBar.bindEvent(setType);
        // + 绑定事件处理函数
        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false);
    }

    function setType(type) {
        config.type = type;
        config.pageNum = 0;
        oListWrapper.innerHTML = '';
        setNewsList();
    }

    // 修改
    async function setNewsList() {
        const { type, count, pageNum } = config;

        // 数据保存在哪里？
        if (newsData[type]) {
            // 做处理
            console.log('pool');
            renderList(newsData[type][pageNum]);
            return;
        }
        console.log('request');
        // 添加页面加载
        oListWrapper.innerHTML = PageLoading.tpl();
        newsData[type] = await service.getNewsList(type, count);
        // 这里为什么需要异步？
        setTimeout(() => {
            // 去掉页面加载
            oListWrapper.innerHTML = '';
            renderList(newsData[type][pageNum]);
        }, 1500)
    }

    // +
    function getMoreList() {
        // isLoading: false，代表没有锁住，true，代表锁住了
        if (!config.isLoading) {
            config.isLoading = true;
            console.log('reach bottom');

            setTimeout(() => {
                config.isLoading = false;
            }, 3000);
        }
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });

        const navBarTpl = NavBar.tpl(NEWS_TYPE);
        // 获取新闻列表模板
        const listWrapperTpl = NewsList.wrapperTpl(82);
        oApp.innerHTML += (headerTpl + navBarTpl + listWrapperTpl);
        // 获取 dom 节点
        oListWrapper = oApp.querySelector('.news-list');
    };

    function renderList(data) {
        const { pageNum } = config;
        const NewsListTpl = NewsList.tpl({
            data,
            pageNum
        });

        oListWrapper.innerHTML += NewsListTpl;
        // 显示图片
        NewsList.imgShow();
    }

    init();

})(document);
