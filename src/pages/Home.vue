<template>
    <div class="home">
        <!-- @todo new psd -->
        <div class="home__sky"></div>
        <div class="home__title">
            <p class="tip">每天赢取3次抽奖机会</p>
        </div>
        <div class="home__cloud"></div>
        <footer class="home__scene">
            <div class="home__man"></div>
            <div class="btn-box">
                <button class="home__btn--play" @click="startGame">开始游戏</button>
            </div>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {};
        },
        created() {},
        mounted() {},
        methods: {
            startGame() {
                this.$router.replace('game');
            }
        }
    };
</script>

<style lang="less">
    .home {
        .page();
        overflow: hidden;
        background-color: #baf9ff;
        .home__sky {
            .p-t(0);
            .bg-contain('home__sky');
            z-index: 1;
        }

        .home__title {
            .p-t(1.8);
            .mt(-0.4);
            .mA;
            .bg-contain('home__title');
            z-index: 5;
            .tip {
                .mA;
                width: 3.66rem;
                .p-b(-0.7);
                .tac;
                .fs(0.28, 0.52);
                border-radius: 0.1rem;
                .c;
                .b-c(#4f70ea);
            }
        }

        .home__cloud {
            // .pr;
            .p-c;
            .b(2);
            .bg-contain('home__cloud');
            z-index: 2;
        }
        .home__scene {
            .pf;
            .b;
            .bg-contain('home__scene');
            z-index: 3;

            .home__man {
                .pa;
                .r(0.02);
                .t(0.2);
                .bg-contain('home__man');
            }
            .btn-box {
                .wh(100%, 1.3rem);
                .pa;
                .b(0.2);
                .tac;
                .home__btn--play {
                    .fs(0);
                    .bg-contain('home__btn--play');
                }
            }
        }
    }
</style>
