<template>
    <div class='loading'>
        <header class="loading__title"></header>
        <div class="loading__man"></div>
        <div class="loading__proess-box">
            <div class="loading__cover" :style="`width: ${width}%`"></div>
            <h6 class="loading__text"></h6>
        </div>
        <p class="loading__hint"></p>
    </div>
</template>
<script>
    import Preload from '@common/preload';

    export default {
        name: 'Loading',
        data() {
            return {
                width: '0%',
                limitTime: 1500
            };
        },
        created() {
            window.baidu({
                type: 'page',
                tip1: 'loading',
                tip2: '加载页'
            });
        },
        beforeMount() {
            this.initWxShare();
            // this.$cache.save('noBaiTiao', 'yes');
        },
        async mounted() {
            new Preload(this)
                .onProgress(this.onPreloadProgress)
                .onComplete(this.onPreloadComplete)
                .start();
            // this.initAni();
        },
        methods: {
            /**
             * 微信分享相关
             * */
            initWxShare() {
                let params = {
                    // debug: {
                    //     ignore: true, // 忽略，即该字段不进行base64编码
                    //     value: true
                    // }
                };
                // 分享文案
                let opts = {
                    title: '与COLMO一起挑战戈壁',
                    desc: '加入COLMO戈壁挑战队，攀登不止，做科技时代的探索者',
                    link: window.location.href.split('#')[0].split('?')[0] + this.$wxsdk.makeLinkParams(params),
                    imgUrl: require('@imgs/share_icon.png')
                };
                this.$wxsdk.share(opts);
            },
            onPreloadProgress(progress) {
                progress = parseInt(Math.min(100, Math.max(0, progress)));
                this.width = `${progress}`;
            },
            onPreloadComplete() {
                this.width = '100%';
                this.$bus.ready = true;
                setTimeout(() => {
                    // 等300毫秒再跳转，因为进度条动画是300毫秒
                    this.$router.replace('home');
                }, this.limitTime);
            }
        }
    };
</script>
<style lang="less">
    .loading {
        .page();
        background-color: #7ecafb;
        overflow: hidden;
        .loading__title {
            .mt(1.6);
            .mA;
            .bg-contain('loading__title');
        }
        .loading__man {
            .mt(0.3);
            .mA;
            .bg-contain('loading__man');
        }
        .loading__proess-box {
            .b-b;
            .pr;
            @h: 0.55rem;
            .mt(0.38);
            .mA;
            .wh(3.06, @h);
            border: 0.06rem solid #fff;
            border-radius: @h / 2;
            background-color: #dddddd;
            .loading__cover {
                height: 100%;
                border-radius: @h / 2;
                background-color: #87c93b;
            }
            .loading__text {
                .p-c;
                .bg-contain('loading__text');
            }
        }
        .loading__hint {
            .mt(0.28);
            .mA;
            .bg-contain('loading__hint');
        }
    }
</style>

