import config from '@/common/config';

export default class Preload {
    constructor(vue) {
        this.vue = vue;
        this.imgList = [];
        this.preloadAudioLength = 0;
        this.total = 0;
        this.imgLoaded = 0;
        this.audioLoaded = 0;
        this.onProgressListener = null;
        this.onCompleteListener = null;
    }

    onProgress(listener) {
        this.onProgressListener = listener;
        return this;
    }

    onComplete(listener) {
        this.onCompleteListener = listener;
        return this;
    }

    start() {
        this._initResource();
        Promise.all([
            this._preloadAudio(),
            this._preloadImg(),
            // this.vue.$api.getWxSignPackage(), // 平台项目用wxsdk.getWxSignPackage(),
            this.vue.$api.getWxUserInfo() // 平台项目用wxsdk.getWxUserInfo()
        ])
            .then(arr => {
                console.log('preload:', arr);
                // arr是一个数组，分别是上面调用的接口的返回值（按上面的顺序）
                // 我个人觉得微信签名和用户信息要一起放这里面，获取失败就不能正常进入
                // 因为微信分享等其他功能要用到这些数据，
                // 微信配置已经放在wxsdk里面，在获取到签名信息后就去配置，需要特殊处理的再调用wxsdk.configWx(sign)接口
                // 尽可能减少sdk耦合度，用户信息不在sdk里保存，在这里保存，这里只是例子，具体要哪些数据看接口返回值
                this.vue.$bus.initUserData(arr[2].data);
                // 加载完毕
                this.onCompleteListener && this.onCompleteListener();
            })
            .catch(err => {
                console.log('err from preload:', err);
            });
    }

    _initResource() {
        Object.keys(config.audioList).forEach(key => {
            const audio = config.audioList[key];
            if (!audio.noPreload) {
                this.preloadAudioLength++;
            }
        });
        // 遍历img目录下的所有图片，之前用来批量加载组件，这里可以取出文件名
        const requireComponent = require.context('@/assets/img', true);
        requireComponent.keys().forEach(fileName => {
            this.imgList.push(fileName.replace('./', 'img/'));
        });

        this.total = this.preloadAudioLength + this.imgList.length;
    }

    _preloadAudio() {
        return new Promise((resolve, reject) => {
            this.vue.$audio
                .addLoadListener(loaded => {
                    this.audioLoaded = loaded;
                    let progress = ((this.audioLoaded + this.imgLoaded) / this.total) * 100;
                    // 向父组件抛出进度事件
                    this.onProgressListener && this.onProgressListener(progress);
                    if (this.audioLoaded >= this.preloadAudioLength) {
                        console.log('音频加载完成');
                        resolve('音频加载完成');
                    }
                })
                .load(config.audioList);
        });
    }

    _preloadImg() {
        window.imgCache = {};
        return new Promise((resolve, reject) => {
            let imgLength = this.imgList.length;
            this.imgList.forEach((v, i) => {
                let img = new Image();
                // 设置跨域、名称，canvas绘图时使用
                let name = v.slice(v.lastIndexOf('/') + 1, v.lastIndexOf('.'));
                img.crossOrigin = 'Anonymous';
                img.onerror = img.onload = () => {
                    window.imgCache[name] = img;
                    this.imgLoaded++;
                    let progress = ((this.audioLoaded + this.imgLoaded) / this.total) * 100;
                    // 向父组件抛出进度事件
                    this.onProgressListener && this.onProgressListener(progress);
                    if (this.imgLoaded >= imgLength) {
                        console.log('图片加载完成了');
                        resolve('图片加载完成');
                    }
                };

                img.src = require('@/assets/' + v);
            });
        });
    }
}
