import itemTpl from './tpl/item.tpl';
import wrapperTpl from './tpl/index.tpl';
import './index.scss';

import { tplReplace,scrollTop } from '../../libs/utils';

// 先做渲染，再做事件绑定和事件处理
export default {
    name: 'NavBar',
    _curIdx: 0,
    tpl(data) {
        console.log(data);
        let itemList = '';

        data.map(({ type, title }, index) => {
            itemList += tplReplace(itemTpl, {
                isCurrent: !index ? 'current': '',
                title,
                type
            })
        });

        return tplReplace(wrapperTpl, {
            itemList,
            wrapperW: .6 * data.length
        })
    },
    // 事件绑定
    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav');
        const oNavItems = document.querySelectorAll('.item');

        // 事件代理，让对应的 tab 激活
        // setType 回调函数
        oNavBar.addEventListener('click', this._setNav.bind(this, oNavItems, setType),false);
    },
    _setNav(items, setType) {
        
        console.log(items, setType);
        // 这个组件只负责切换位置，状态怎么变？如何去控制？
        const tar = arguments[2].target;
        // className 会有空格，需要做处理
        const className = tar.className.trim();

        if(className === 'item') {
            // 获取对应项的 type
            const type = tar.dataset.type;
            
            setType(type);
            // 这个函数的作用是什么？
            scrollTop();

            items[this._curIdx].className = 'item';
            this._curIdx = [].indexOf.call(items, tar);
            items[this._curIdx].className += ' current';
        }

    }
}

