<template>
    <div class="game">
        <!-- <div class="game-main" id="gameMain"></div> -->
        <section class="count-down" :style="`background-image: url(${curCountdown[0]}); background-size: ${curCountdown[1]}`" v-if="curCountdown"></section>
        <c-mask v-if="winGameToggle">
            <section class="game__mask--win">
                <h3 class="mask-score"><span class="score">{{curScore}}</span><span class="unit">分</span></h3>
                <h6 class="mask-praise" v-html="praiseText"></h6>
                <div class="btn-box">
                    <button class="game__btn--giveup" @click="giveupToggle = true">放弃</button><button class="game__btn--lottery" @click="goLottery">去抽奖</button>
                </div>
            </section>
        </c-mask>
        <c-mask v-if="noTimeToggle">
            <section class="game__mask--notime">
                <h6 class="title">确定</h6>
                <p class="hint">亲~你今天的抽奖次数都用完啦，明天会重新有3次机会，但现在你仍然可以继续玩游戏~ </p>
                <div class="btn-box"><button class="game__btn--ok" @click="goOverPage({noTime: true})"></button></div>
            </section>
        </c-mask>
        <!-- 放弃本次机会 -->
        <c-mask v-if="giveupToggle">
            <section class="game__mask--giveup">
                <h6 class="title">放弃本次机会</h6>
                <p class="hint">确定放弃本次抽奖机会吗？每位玩家过关后奖励一次抽奖机会，每天最多3次抽奖机会。</p>
                <div class="btn-box">
                    <button class="game__btn--giveup" @click="goOverPage({noTime: false})">放弃</button><button class="game__btn--lottery" @click="goLottery">去抽奖</button>
                </div>
            </section>
        </c-mask>
    </div>
</template>

<script>
    import cMask from '@c/Mask';
    import '@common/running_data';
    export default {
        data() {
            return {
                curScore: undefined,
                curCountdown: undefined,
                winGameToggle: false,
                noTimeToggle: false,
                giveupToggle: false
            };
        },
        computed: {
            praiseText() {
                let temp;
                if (this.curScore === 100) {
                    temp = '你真是个小快手!<br>赢得一次抽奖机会，快去试试运气吧!';
                } else if (this.curScore >= 80) {
                    temp = '你真棒！赢得一次抽奖机会，<br>快去试试运气吧!';
                } else if (this.curScore >= 60) {
                    temp = '不错哦！赢得一次抽奖机会，<br>快去试试运气吧!';
                }
                return temp;
            }
        },
        mounted() {
            this.initGame();
            this.$bus.$on('gameCb', this.gameCb);
        },
        methods: {
            goLottery() {
                this.$router.replace('lottery');
            },
            initGame() {
                let countdown = 4;
                const countdownMap = {
                    1: [require('@imgs/game__1.png'), ['1.04rem 1.6rem']],
                    2: [require('@imgs/game__2.png'), ['1.16rem 1.63rem']],
                    3: [require('@imgs/game__3.png'), ['1.17rem 1.66rem']],
                    0: [require('@imgs/game__go.png'), ['3.4rem 1.6rem']]
                };
                this.$nextTick(() => {
                    // todo 奖品分类
                    let timer = setInterval(() => {
                        countdown--;
                        this.curCountdown = countdownMap[countdown];
                        if (countdown === 0) {
                            setTimeout(() => {
                                this.curCountdown = undefined;
                            }, 1000);
                            clearInterval(timer);
                            gameManager.instance.paused = false;
                            gameManager.instance.sound.unlock();
                            gameManager.toPlayMusic();
                        }
                    }, 1000);
                });
            },
            async gameCb(score) {
                this.curScore = score;

                // 机会都用完了
                if (3 - this.$bus.raffleTimes === 0) {
                    this.noTimeToggle = true;
                    return;
                }
                // @todo add a loading toast
                await this.$api.sendScore({ score });
                if (score < 60) {
                    this.goOverPage();
                } else {
                    this.winGameToggle = true;
                }
            },
            goOverPage(_params) {
                let mustParams = {
                    score: this.curScore
                }
                let temp
                if(_params && _params.noTime) temp = Object.assign({}, mustParams, _params)
                else temp = mustParams
                this.$router.replace({ name: 'over', params:  temp});
            }
        },
        components: { cMask }
    };
</script>

<style lang="less">
    .game {
        left: 0;
        top: 0;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        right: 0;
        .page;
        background: #123431;
        .count-down {
            .wh(3.5, 3.5);
            .p-c;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 10;
        }
        .game__mask--notime,
        .game__mask--giveup {
            .pr;
            .b-b;
            .wh(5.44, 3.14);
            padding: 0.7rem 0.34rem 0;
            border-radius: 0.1rem;
            background-color: #fff;
            transform: translateY(-20%);
            .title {
                .tac;
                margin-bottom: 0.5rem;
                font-weight: bold;
                .fs(0.3);
            }
            .hint {
                .fs(0.28);
                color: #999;
            }
            .btn-box {
                .p-b(-1.4);
                .tac;
                .game__btn--ok {
                    .bg-contain('game__btn--ok');
                }
            }
        }
        .game__mask--giveup {
            height: 3.55rem;
        }
        .game__mask--win {
            .pr;
            .bg-contain('game__mask--win');
            .mask-score {
                .p-c;
                .wh(30%, 0.8);
                .tac;
                color: #ffcd00;
                .score {
                    .fs(0.8);
                }
                .unit {
                    .fs(0.36);
                }
            }
            .mask-praise {
                .p-c;
                .t(2.2);
                .wh(5.8, 0.8);
                .fs(0.3);
                color: #999;
                .tac;
            }
            .btn-box {
                .p-b(0.4);
                .tac;
            }
        }
        .game__btn--giveup {
            margin-right: 0.25rem;
            .fs(0);
            .bg-contain('game__btn--giveup');
        }
        .game__btn--lottery {
            .fs(0);
            .bg-contain('game__btn--lottery');
        }
    }
</style>
