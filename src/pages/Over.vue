<template>
    <div class="over">
        <div class="over__sky"></div>
        <div class="over__cloud"></div>
        <div class="badge">
            <p class="hint">= 本次得分 =</p>
            <div class="score-box"><span class="value">{{curScore}}</span><span class="unit">分</span></div>
        </div>
        <div class="btn-box">
            <p class="hint" v-html="descText"></p>
            <button class="over__btn--again" @click="playAgain"></button>
            <button class="over__btn--share" @click="shareMaskToggle = true"></button>
        </div>
        <footer class="over__road"></footer>
        <transition name="fade">
            <section class="over__share-mask" v-if="shareMaskToggle" @click="shareMaskToggle = false">
                <div class="over__arrow"></div>
                <div class="over__share-img">
                </div>
                <p class="share-hint">邀请朋友一起来踏青，看谁得分最高！</p>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shareMaskToggle: false
            };
        },
        computed: {
            descText() {
                if (this.$route.params.noTime) {
                    return '<span style="font-size: 0.3rem">今天可抽奖次数已用完，仍可继续玩游戏</span>';
                } else {
                    return `还差${60 - this.curScore}分可参与抽奖`;
                }
            },
            curScore() {
                return this.$route.params.score
            }
        },
        mounted() {
            console.log('%celelee test:', 'background:#000;color:#fff', this.$route.params);
        },
        methods: {
            playAgain() {
                // i didn't let the game process start to the State of 'end',but keep the end page in game by setting paused to 'true'.
                // so it should set back to 'false'.so that the State of 'create' can be run by Phaser process.
                gameManager.needGuide = false;
                gameManager.instance.paused = false;
                gameManager.instance.state.start('create');

                this.$router.replace('game');
            }
        }
    };
</script>

<style lang="less">
    .over {
        .page();
        overflow: hidden;
        background-color: #80bcfa;
        .over__sky {
            .p-b;
            .bg-contain('over__sky');
            z-index: 1;
        }

        .badge {
            .mt(1);
            // .pr;
            // .bg-contain('over__badge');
            z-index: 2;
        }

        .btn-box {
            .mt(-1);
            .pr;
            z-index: 2;
            .tac;
            .hint {
                .tac;
                .fs(0.4, 0.4);
                margin-bottom: 0.3rem;
                color: #7783b6;
            }
            .over__btn--again {
                margin-right: 0.5rem;
                .bg-contain('over__btn--again');
            }
            .over__btn--share {
                .bg-contain('over__btn--share');
            }
        }

        .over__share-mask {
            .pf;
            .t;
            .l;
            .page;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 20;
            .over__arrow {
                .pa;
                @d: 0.6rem;
                .r(@d);
                .t(@d);
                .bg-contain('over__arrow');
            }
            .over__share-img {
                .p-c;
                .bg-contain('over__share-img');
                transform: translateY(-35%);
            }
            .share-hint {
                .p-c;
                transform: translateY(1.2rem);
                .wh(7.5, 0.4);
                .tac;
                .fs(0.32);
                .c-w;
            }
        }
    }
</style>
