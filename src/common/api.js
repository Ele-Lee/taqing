import Axios from 'axios';
import Qs from 'qs';
import { isWeixinBrowser, isProdENV } from '@common/util';
import jwt_decode from 'jwt-decode';

//默认请求头
const DEFAULT_HEADER = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
};

const API_ROOT = 'https://custom.24haowan.com';
const API_ROOT_DEV = 'http://192.168.0.110:3000/';

const API_HOST = () => (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV);

class Api {
    constructor(vue) {
        this.vue = vue;
        this.axios = null;
        this._initAxios();

        this.userInfo = {};
    }

    _initAxios() {
        this.axios = Axios.create({
            baseURL: API_HOST(),
            headers: DEFAULT_HEADER
        });

        this.axios.interceptors.request.use(
            config => {
                // 配置公共header
                let jwt;
                if(isProdENV) {
                    let entrance = this._getCookie('entrance')
                    jwt = this._getCookie(`_entry_${entrance}_sid`)
                } else {
                jwt =
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJyZXNpZCI6IiIsIm9wZW5pZCI6Im9JelM0d2Z2UjM0anNoU2J5eVFSU3FiakZMcXMiLCJ1bmlvbmlkIjoib2p1UVR3Z3Z3UmxMYy04S0J2RTBVT0tHdmU4OCIsInd4YXBwaWQiOiJ3eGVjMmI2YzllNGJjNDdhZjgiLCJzY29wZSI6InByaXZhdGUiLCJleHAiOjE1NDc5ODczNjEwLCJuaWNrbmFtZSI6IuW8uuWtkCIsImhlYWRpbWd1cmwiOiJodHRwOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvbkFVZXJCU0UwQVQ3c0h1dGdyVnpoeklpYmNqUGdXS3FRRUpVVEpBdkZuVldPQjQxdXB1QjhIdkNCc29lMXFoa01YWW02VVlWeHJpYWxreVdCNVFEd3RwUS8xMzIiLCJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKeVpYTnBaQ0k2SWlJc0ltOXdaVzVwWkNJNkltOUplbE0wZDJaMlVqTTBhbk5vVTJKNWVWRlNVM0ZpYWtaTWNYTWlMQ0oxYm1sdmJtbGtJam9pYjJwMVVWUjNaM1ozVW14TVl5MDRTMEoyUlRCVlQwdEhkbVU0T0NJc0luZDRZWEJ3YVdRaU9pSjNlR1ZqTW1JMll6bGxOR0pqTkRkaFpqZ2lMQ0p6WTI5d1pTSTZJbkJ5YVhaaGRHVWlMQ0psZUhBaU9qRTFORGM1T0Rjek5qRXNJbWxoZENJNk1UVTBOek00TWpVMk1YMC5FQllid0J5bVpUUEtWUlhJdFFtMDFtOWVYSXVPVDBiampMcXJQOEVKYnFzIn0sImVudHJhbmNlIjoiY29tcGFueS0xLWFwcGlkLTEtZ2FtZWlkLTc4IiwiaWF0IjoxNTQ3MzgyNTYxLCJleHAiOjE1NDc0Njg5NjEwfQ.H38u0Db8TEPqVNiYl1ECSTsmt5Jbf8eHbaVej2-3roM';
                }

                if (jwt) {
                    config.headers.Authorization = `Bearer ${jwt}`;
                    this.setUserInfo(jwt);
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        this.axios.interceptors.response.use(
            response => {
                if (response.data.code == 0) {
                    return response.data.payload || response.data;
                }
                return Promise.reject('请求失败', response);
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    _getCookie(name) {
        console.log(name);
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

        let arr = null;
        if ((arr = document.cookie.match(reg))) {
            return unescape(arr[2]);
        }
        return null;
    }

    /**
     *  获取微信jssdk配置
     * @param {*} url
     */
    getWxSignPackage(url = window.location.href.split('#')[0]) {
        if (!isWeixinBrowser() || !isProdENV) {
            console.error('非微信浏览器，且非production，不能调用该接口: getWxSignPackage of api.js');
            return Promise.resolve('微信签名配置失败');
        }
        return this.axios
            .get('https://custom.24haowan.com/public/wechat/sdk-config', { params: { url: url } })
            .then(data => {
                // 传入的data需要看看接口返回的数据是否包多一层payload等等
                console.log(data);
                return this.vue.prototype.$wxsdk.configWx(data);
            });
    }

    /**
     * 获取用户信息
     */
    // getWxUserInfo() {
    //     return this.axios.get('/userInfo')
    // }

    setUserInfo(jwt) {
        if (!!(Object.keys(this.userInfo) || this.userInfo).length) return;
        const userInfo = jwt_decode(jwt).userInfo;
        // const userInfo = JSON.parse(
        //     decodeURIComponent(
        //         atob(jwt.split('.')[1])
        //             .split('')
        //             .map(function(c) {
        //                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        //             })
        //             .join('')
        //     )
        // );
        const name = userInfo.nickname;
        const openId = userInfo.openid;
        const avatar = userInfo.headimgurl;
        return (this.userInfo = { name, openId, avatar });
    }

    getUserInfo() {
        if (!(Object.keys(this.userInfo) || this.userInfo).length)
            return console.log('%celelee test:', 'background:#000;color:#fff', 'userInfo is empty');
        return this.userInfo;
    }

    getWxUserInfo() {
        return this.axios.post('/taqing/boot');
    }

    sendScore(params) {
        return this.axios.post('/taqing/score', Qs.stringify(params));
    }

    getRank(params) {
        return this.axios.post('/taqing/rank', Qs.stringify(params));
    }

    lottery(params) {
        return this.axios.post('/taqing/raffle', Qs.stringify(params));
    }

    getGifts() {
        return this.axios.post('/taqing/gift');
    }
    // testPost(params = {}) {
    //     return axios.post('', Qs.stringify(params))
    // }
}

export default {
    install: function install(Vue) {
        Vue.prototype.$api = new Api(Vue);
    }
};
