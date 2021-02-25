import './imports';
import service from '../services';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {NEWS_TYPE} from '../data';

; (function (doc) {
    const oApp = doc.querySelector('#app');
    const config = {
        type: 'top',
        count: 10
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

    async function setNewsList() {
        const { type, count } = config;
        
        // 数据保存在哪里？
        if(newsData[type]) {
            // 做处理
            return;
        }
        newsData[type] = await service.getNewsList(type, count);
        console.log(newsData);
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });

        const navBarTpl = NavBar.tpl(NEWS_TYPE);

        oApp.innerHTML += (headerTpl + navBarTpl);
    };

    init();

})(document);
