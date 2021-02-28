import './imports';
import service from '../services';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import MoreLoading from '../components/MoreLoading';
import { NEWS_TYPE } from '../data';

import { scrollToBottom } from '../libs/utils';


; (function (doc) {
    const oApp = doc.querySelector('#app');
    let oListWrapper = null;
    let t = null;

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
        NewsList.bindEvent(oListWrapper, setCurrentNews);
        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false);
    }

    function setType(type) {
        config.type = type;
        config.pageNum = 0;
        config.isLoading = false;
        oListWrapper.innerHTML = '';
        setNewsList();
    }

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

    function getMoreList() {
        // isLoading: false，代表没有锁住，true，代表锁住了
        if (!config.isLoading) {
            // 拿分页数据
            config.pageNum++;
            clearTimeout(t);
            const { pageNum, type } = config;
            console.log(newsData);
            if (pageNum >= newsData[type].length) {
                // 显示没有更多新闻
                MoreLoading.add(oListWrapper, false);
            } else {
                config.isLoading = true;
                MoreLoading.add(oListWrapper, true);
                t = setTimeout(() => {
                    // 进来的时候，setNewsList 没有执行，所以先清除定时器
                    setNewsList();
                }, 1000);
            }
        }
    }
    // +
    function setCurrentNews(options) {
        const { idx, pageNum } = options;
        const currentNews = newsData[config.type][pageNum][idx];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));
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
        MoreLoading.remove(oListWrapper);
        oListWrapper.innerHTML += NewsListTpl;
        // + 加载完，重新设置 config.isLoading
        config.isLoading = false;
        // 显示图片
        NewsList.imgShow();
    }

    init();

})(document);
