import './imports';
import service from '../services';
import Header from '../components/Header';

; (function (doc) {
    const oApp = doc.querySelector('#app');
    const init = () => {
        render();
    };

    function render() {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });

        oApp.innerHTML += headerTpl;
    };

    init();

})(document);
