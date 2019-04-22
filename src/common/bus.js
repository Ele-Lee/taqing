import Vue from 'vue';
import { isWeixinBrowser } from './util';

export default {
    install: function install(vue) {
        let bus = new Vue({
            data: {
                userInfo: {
                    avatar: '',
                    name: '',
                    openId: ''
                },
                isWeixinBrowser: isWeixinBrowser,
                ready: false,
                showLoading: false,
                bestScore: undefined,
                muted: undefined,
                raffleTimes: undefined,
                targetScore: 60
            },
            computed: {
                curRouter() {
                    return this.routerList[this.routerListIndex];
                }
            },
            methods: {
                initUserData({ score, raffle_times, gifts }) {
                    this.bestScore = score * 1;
                    this.raffleTimes = raffle_times;
                    this.existingGifts = gifts;
                },
                setUserInfo(p) {
                    Object.keys(p).forEach(key => (this.userInfo[key] = p[key]));
                }
            }
        });

        vue.prototype.$bus = bus;
    }
};
