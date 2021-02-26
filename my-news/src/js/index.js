import './imports';
import service from '../services';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import {NEWS_TYPE} from '../data';

; (function (doc) {
    const oApp = doc.querySelector('#app');
    let oListWrapper = null;
    const config = {
        type: 'top',
        count: 10,
        pageNum: 0
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
    }
    
    function setType(type) {
        config.type = type;
        console.log('setType', config.type);
        setNewsList();
    }

    // 修改
    async function setNewsList() {
        const { type, count, pageNum } = config;
        
        // 数据保存在哪里？
        if(newsData[type]) {
            // 做处理
            renderList(newsData[type][pageNum]);
            return;
        }
        newsData[type] = await service.getNewsList(type, count);
        // 这里为什么需要异步？
        setTimeout(() => {
            oListWrapper.innerHTML = '';
            renderList(newsData[type][pageNum]);
        })
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
        console.log('hi')
        console.log(data);
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
