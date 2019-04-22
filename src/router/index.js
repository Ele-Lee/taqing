import Vue from 'vue';
import Router from 'vue-router';
import { isProdENV } from '@common/util.js';

// const Preload = r => require.ensure([], () => r(require('@pages/Preload.vue')))
// const Home = r => require.ensure([], () => r(require('@pages/Home.vue')))
import Preload from '@pages/Preload.vue';
import Home from '@pages/Home.vue';
import Game from '@pages/Game.vue';
import Over from '@pages/Over.vue';
import Challenge from '@pages/Challenge.vue';
import Lottery from '@pages/Lottery.vue';
// import Rank from '@pages/Rank.vue';

export default () => {
    Vue.use(Router);
    const router = new Router({
        routes: [
            {
                path: '/',
                name: 'preload',
                component: Preload
            },
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/game',
                name: 'game',
                component: Game
            },
            {
                path: '/over',
                name: 'over',
                component: Over
            },
            {
                path: '/challenge',
                name: 'challenge',
                component: Challenge
            },
            {
                path: '/lottery',
                name: 'lottery',
                component: Lottery
            }
            // {
            //     path: '/rank',
            //     name: 'rank',
            //     component: Rank
            // }
        ]
    });

    if (isProdENV||1) {
        // 禁止越过loading页
        router.beforeEach((to, from, next) => {
            if (to.meta !== 'noGuard' && to.name !== 'preload' && !Vue.prototype.$bus.ready) {
                next({ path: '/', replace: true });
            }
            next();
        });
    }

    return router;
};
