<template>
    <div id="app">
        <top v-show="topShowToggle"></top>
        <transition name="bounce">
            <router-view></router-view>
        </transition>
        <loading v-show="$bus.showLoading" />
        <button class="music-btn" v-show="soundBtnKey" @click="musicBtnFn" :style="musicBtnBg"></button>
        <toast></toast>
        <!-- pahser游戏dom -->
        <transition name="bounce">
            <div class="game-main" id="gameMain" v-show="gameToggle"></div>
        </transition>
    </div>
</template>

<script>
    import game from '@common/running_main';
    import top from '@c/Top';
    import Loading from '@components/Loading';
    import Toast from '@c/Toast';

    export default {
        watch: {
            $route(to, from) {
                this.soundBtnSwitcher(to.name);
                this.gameVisibilitySwicher(to.name);
            }
        },
        data() {
            return {
                // muted: false,
                gameToggle: false,
                soundBtnKey: false
                // topShowToggle: false,
            };
        },
        created() {
            this.$bus.muted = this.$cache.load('muted', false);
            this.$audio.mute(this.$bus.muted); // 初始化是否静音
        },
        mounted() {
            this.initGameInBg();
        },
        computed: {
            musicBtnBg() {
                return !this.$bus.muted ? '' : `background-image: url(${require('@imgs/btn_music_off.png')})`;
            },
            topShowToggle() {
                return ['over', 'home'].includes(this.$route.name);
            }
        },
        methods: {
            gameVisibilitySwicher(name) {
                return (this.gameToggle = name === 'game');
            },
            initGameInBg() {
                window.gameManager = null;
                game(configJson, 'gameMain', score => {
                    this.$bus.$emit('gameCb', score);
                    }, !!this.$bus.bestScore);
            },
            musicBtnFn() {
                this.$bus.muted = !this.$bus.muted;
                // this.$cache.load('muted', this.$bus.muted);
                // this.$audio.mute(this.muted);
                this.$bus.muted ? this.$audio.pause('bgm') : this.$audio.play('bgm');

                window.baidu({
                    type: 'btn',
                    tip1: 'music-btn',
                    tip2: '点击音乐按钮_' + this.$bus.muted
                });
            },
            soundBtnSwitcher(name) {
                // 不会显示音乐按钮的路由名字
                const showList = ['preload', 'rotate', 'video', 'locate'];
                this.soundBtnKey = !showList.includes(name);
            }
        },
        components: {
            Loading,
            Toast,
            top
        }
    };
</script>

<style lang="less">
    div,
    section {
        font-size: 0.28rem;
    }
    #app {
        position: relative;
        .page;
        .music-btn {
            .pf;
            @d: 0.28;
            .r(@d);
            .t(@d);
            .bg-contain('btn_music');
        }

        .game-main {
            .pr;
            .l;
            .t;
        }
    }
</style>
