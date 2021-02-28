import './imports';
import Header from '../components/Header';
import NewsFrame from '../components/Iframe';
import Follow from '../components/Follow';
import { getUrlQueryValue } from '../libs/utils';

; (function (doc) {
    const oApp = doc.querySelector('#app');

    const currentNews = JSON.parse(localStorage.getItem('currentNews'));
    const followedList = JSON.parse(localStorage.getItem('followedList')|| '[]');

    const init = () => {
        render();
        bindEvent();
    };

    function render() {
        const headerTpl = Header.tpl({
            // 修改
            url: getUrlQueryValue('path'), // 路径：/
            title: '新闻详情',
            showLeftIcon: true,
            showRightIcon: false
        });

        const NewFrameTpl = NewsFrame.tpl(currentNews.url);
        const followTpl = createFollowTpl();
        oApp.innerHTML += (headerTpl + NewFrameTpl + followTpl);
    };

    // 渲染
    function createFollowTpl() {
        const iSExist = followedList.find(item => item.uniquekey === currentNews.uniquekey);

        return iSExist ? Follow.follow() : Follow.unfollow();
    }

    function bindEvent() {
        Follow.bindEvent(doFollow);
    }

    function doFollow(status) {
        console.log(status);

        let followedList = JSON.parse(localStorage.getItem('followedList')|| '[]');

        if (status) { // 加入收藏
            followedList.push(currentNews);
        } else {
            followedList = followedList.filter(item => item.uniquekey !== currentNews.uniquekey);
        }

        localStorage.setItem('followedList', JSON.stringify(followedList));
    }

    init();

})(document);