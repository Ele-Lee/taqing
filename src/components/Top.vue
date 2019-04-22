<template>
    <section class="top">
        <div class="home__score top-item" v-if="$bus.bestScore" @click="rankSwither"><span>最佳成绩:{{$bus.bestScore}}</span></div>
        <div class="home__prize top-item" @click="prizeSwither"></div>
        <div class="home__rule top-item" @click="ruleSwither"></div>
        <!-- 我的奖品 -->
        <transition name="bounce-down">
            <div class="prize-win" v-if="prizeToggle">
                <header>
                    <i class="mask__icon--prize"></i>
                    <button class="mask__btn--close" @click="prizeToggle = false"></button>
                    <span class="text">我的奖品</span>
                </header>
                <ul class="prize-content--fill" v-if="prizeList.length > 0">
                    <li class="mask__prize-item">
                        <div class="left">
                            <h6>中信易家</h6>
                            <p><i>优惠券</i><span>满100减10元</span></p>
                        </div>
                        <div class="right">
                            <span>10</span>
                            <sub>￥</sub>
                        </div>
                        <div class="bottom">有效期至2019-12-30</div>
                    </li>
                    <p class="prize-hint">使用路径：关注“中信优享+”微信公众号，进入“优享生活-我的-票券包”</p>
                </ul>
                <div class="prize-content--empty" v-if="prizeList.length === 0">
                    <figure class="mask__empty-box"></figure>
                    <p>您还未抽奖，<br>快去踏青赢取抽奖机会吧~</p>
                </div>
            </div>
        </transition>
        <!-- 活动规则 -->
        <transition name="bounce-down">
            <div class="rule-win" v-if="ruleToggle">
                <header>
                    <i class="mask__icon--rule"></i>
                    <button class="mask__btn--close" @click="ruleToggle = false"></button>
                    <span class="text">活动规则</span>
                </header>
            </div>
        </transition>
        <rank v-show="rankToggle" @closeRank="rankSwither"></rank>
    </section>
</template>

<script>
    import Rank from '@c/Rank';
    export default {
        data() {
            return {
                prizeToggle: false,
                ruleToggle: false,
                rankToggle: false,
                prizeList: []
            };
        },
        created() {
            this.getPrizeList();
        },
        methods: {
            rankSwither() {
                this.rankToggle = !this.rankToggle;
            },
            ruleSwither() {
                this.ruleToggle = !this.ruleToggle;
            },
            prizeSwither() {
                this.prizeToggle = !this.prizeToggle;
            },
            getPrizeList() {
                this.$api.getGifts().then(res => {
                    console.log('%celelee test: getGifts', 'background:#000;color:#fff', res);
                });
            }
        },
        components: { Rank }
    };
</script>

<style lang="less">
    .top {
        .wh(100%, 1.8);
        .p-t(0);
        .fs(0);
        z-index: 6;

        .top-item {
            .pa;
            .b(0);
            .t(0);
            margin: auto;
            vertical-align: middle;
            display: inline-block !important;
        }
        .home__score {
            left: 0.3rem;
            .bg-contain('home__score');
            span {
                .pa;
                .t(0.33);
                .r(0.28);
                .c-w;
            }
        }
        .home__prize {
            right: 1.9rem;
            .bg-contain('home__prize');
        }
        .home__rule {
            right: 0.4rem;
            .bg-contain('home__rule');
        }
    }

    .prize-win,
    .rule-win {
        .pf;
        .b;
        .t;
        .r;
        .l;
        margin: auto;
        .wh(6.8, 10);
        border-radius: 0.2rem;
        z-index: 30;
        background-color: #f8f8f8;
        header {
            .pr;
            .wh(100%, 1);
            line-height: 1rem;
            .tac;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            .text {
                .c-w;
                font-weight: bold;
                .fs(0.36);
            }
            i {
                .pa;
                .l(0.85);
                .b(0.25);
                display: inline-block;
            }
            .mask__btn--close {
                .pa;
                .r(0.4);
                .t(50%);
                transform: translateY(-50%);
                .bg-contain('mask__btn--close');
            }
            .mask__icon--prize {
                .bg-contain('mask__icon--prize');
            }
            .mask__icon--rule {
                .bg-contain('mask__icon--rule');
            }
        }
    }
    .prize-win {
        header {
            background-color: #f84c14;
        }
        .prize-content--fill {
            .mt(0.48);
            .mask__prize-item {
                .mA;
                .bg-contain('mask__prize-item');
                .fs(0);
                display: flex;
                flex-wrap: wrap;
                .left,
                .right {
                    .b-b;
                    flex: 1 50%;
                    display: inline-block;
                    .wh(49%, 1.54);
                }
                .left {
                    padding-left: 0.32rem;
                    padding-top: 0.3rem;
                    h6 {
                        margin-left: 0.1rem;
                        margin-bottom: 0.1rem;
                        .fs(0.28, 0.48);
                        font-weight: bold;
                    }
                    i {
                        display: inline-block;
                        @h: 0.35rem;
                        .wh(1, @h);
                        .c-w;
                        .tac;
                        font-size: 0.14rem;
                        line-height: @h;
                        border-radius: 0.06rem;
                        background-color: #f15656;
                        transform: scale(0.8);
                    }
                    span {
                        color: #373232;
                        .fs(0.12);
                    }
                }
                .right {
                    color: #ff7777;
                    line-height: 1.54rem;
                    padding-right: 0.34rem;
                    .fs(0);
                    sub {
                        float: right;
                        .fs(0.26);
                    }
                    span {
                        float: right;
                        .fs(0.6);
                    }
                }
                .bottom {
                    flex: 1;
                    .wh(100%, 0.6);
                    margin-left: 0.34rem;
                    .fs(0.12rem, 0.6);
                    color: #818181;
                }
            }
            .prize-hint {
                padding: 0.2rem 0.48rem 0;
                color: #888888;
                .fs(0.24);
            }
        }

    }
    .prize-content--empty {
        .mt(1.18);
        .mask__empty-box {
            margin-bottom: 0.4rem;
            .mA;
            .bg-contain('mask__empty-box');
        }
        p {
            .tac;
            .fs(0.32, 0.5);
            color: #ccc;
        }
    }
    .rule-win {
        header {
            background-color: #3674f0;
        }
    }
</style>
