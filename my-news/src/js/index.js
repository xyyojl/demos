import './imports';
import service from '../services';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import {NEWS_TYPE} from '../data';

; (function (doc) {
    const oApp = doc.querySelector('#app');
    const config = {
        type: 'top'
    }
    const init = () => {
        render();
        bindEvent();
    };

    function bindEvent() {
        NavBar.bindEvent(setType);
    }
    
    function setType(type) {
        config.type = type;
        console.log('setType', config.type);
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
