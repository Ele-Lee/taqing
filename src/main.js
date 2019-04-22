import { getAllUrlQuery } from '@common/util';
// 放在前面，先打开vconsole，不然有些可能先打印的会看不到
// 获取链接附带的参数
window.params = getAllUrlQuery();
// 有debug参数，打开vconsole
if (window.params.debug == 'true') {
    const VConsole = require('@static/js/vconsole.min.js');
    let vConsole = new VConsole();
    console.log('params:', params);
}

import Vue from 'vue';

import App from './App';
import router from './router';
import wxsdk from '@common/wxsdk';
import bus from '@common/bus';
import api from '@common/api';
import cache from '@common/cache';
import audioUtil from '@common/audioUtil';
import anime from 'animejs';

Vue.config.productionTip = false;

Vue.prototype.$anime = window.anime = anime;

Vue.use(wxsdk);
Vue.use(api);
Vue.use(cache);
Vue.use(bus);
Vue.use(audioUtil);

// 百度统计
window.baidu = ({ type = 'page', tip1 = '-', tip2 = '-' }) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('dev模式不上报百度统计：', type, tip1, tip2);
    } else {
        _hmt.push(['_trackEvent', type, tip1, tip2]);
    }
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router(),
    template: '<App/>',
    components: {
        App
    }
});
