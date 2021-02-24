import tpl from './index.tpl';
import './index.scss';
import { tplReplace } from '../../libs/utils';

export default {
    name: 'Header',
    tpl(options) {
        const { url, title, showLeftIcon, showRightIcon } = options;
        // 将模板里面的双大括号，全部替换掉，用到 utils.js 下的 tplReplace 方法
        // 最终导出的是字符串，把模板 return 出去
        return tplReplace(tpl, {
            url,
            title,
            showLeftIcon: showLeftIcon ? 'block': 'none',
            showRightIcon: showRightIcon ? 'block': 'none'
        });
    }
    
}

