<template>
    <div class="lottery">
        <main class="content">
            <header class="lottery__top">
                <div class="lottery__sun"></div>
                <div class="lottery__cloud"></div>
                <div class="lottery__title"></div>
                <div class="lottery__subtitle"></div>
                <div class="lottery__swallow"></div>
                <div class="tip-box">
                    <ul class="win-tip" ref="winTip">
                        <li>1恭喜{{winList[0][0]}}用户获得{{winList[0][1]}}</li>
                        <li>2恭喜{{winList[0][0]}}用户获得{{winList[0][1]}}</li>
                        <li>3恭喜{{winList[0][0]}}用户获得{{winList[0][1]}}</li>
                        <li>1恭喜{{winList[0][0]}}用户获得{{winList[0][1]}}</li>
                    </ul>
                </div>
            </header>
            <section class="turntable-box">
                <section class="inner-box2"></section>
                <section class="inner-box1" ref="turntableMain">
                    <ul class="lottery-sector" ref="lotterySector">
                        <li v-for="i in 8" :key="i">
                        </li>
                    </ul>
                    <ul class="lottery-desc" ref="lotteryDesc">
                        <li v-for="(item, i) in tableArr" :key="i">
                            <span>{{nameMap[tableArr[i]]}}</span>
                            <figure class="lottery-img" :style="`background-image: url(${require('@imgs/gift__' + tableArr[i] + '.png')})`"></figure>
                        </li>
                    </ul>
                </section>
                <ul class="illumination" ref="illumination">
                    <li v-for="i in 24" :key="i"></li>
                </ul>
                <!-- @todo the btn type -->
                <button class="lottery__btn" :class="`lottery__btn--${btnType}`" @click="rotate2Lottery"></button>
            </section>
            <footer class="lottery__bottom">
                <h6 class="lottery__title--explain"></h6>
                <ol class="explain-list">
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                    <li>活动说明文字活动说明文字，活动说明文字；</li>
                </ol>
            </footer>
        </main>
        <div class="mask-box" v-if="winMaskToggle">
            <section class="win-mask" :style="winIntegralPrize ? 'height: 4.8rem': ''">
                <div class="mask__top">恭喜中奖</div>
                <div class="mask__content">
                    <div class="subtitle">恭喜获得中信易家10元满减券，快去中信优享+公 众号使用吧~</div>
                    <div class="mask__prize-item" v-if="!winIntegralPrize">
                        <div class="left">
                            <h6>中信易家</h6>
                            <p><i>优惠券</i><span>满100减10元</span></p>
                        </div>
                        <div class="right">
                            <span>10</span>
                            <sub>￥</sub>
                        </div>
                        <div class="bottom">有效期至2019-12-30</div>
                    </div>
                    <div class="prize-hint">使用路径：关注“中信优享+”微信公众号，进入“优享生活-我的-票券包”</div>
                </div>
                <div class="mask__bottom">
                    <button @click="winMaskToggle = false">返回</button><button>立即查看</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import { descMap, nameMap, tableArr } from '@common/prizeMap.js';
    export default {
        data() {
            return {
                winList: [['188****1234', '优酷土豆黄金会员']],
                btnType: 'lottery',
                lotteryKey: false,
                winMaskToggle: false,
                winIntegralPrize: true,
                descMap,
                nameMap,
                tableArr
            };
        },
        computed: {},
        mounted() {
            this.initTurntableBox();
        },
        methods: {
            initTurntableBox() {
                this._initIllumination();
                this._initLotteryContent();
                setTimeout(() => {
                    this._initTips();
                }, 3000);
            },
            _initTips() {
                let temp = anime.get(this.$refs.winTip, 'top', 'rem');
                temp = temp.toString().split('rem')[0];
                anime({
                    targets: this.$refs.winTip,
                    top: temp - 0.76 + 'rem',
                    duration: 500,
                    easing: 'linear',
                    complete: () => {
                        if (
                            this.$refs.winTip.style.top.split('rem')[0] * 1 <=
                            ((this.$refs.winTip.children.length - 1) * -0.76).toFixed(2) * 1
                        ) {
                            anime.set(this.$refs.winTip, { top: 0 });
                        }
                        setTimeout(() => {
                            this._initTips();
                        }, 3000);
                    }
                });
            },
            _initIllumination() {
                const list = this.$refs.illumination.children;
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    anime.set(element, {
                        rotate: (360 / list.length) * index,
                        translateY: -(6.12 - 0.24) / 2 + 'rem',
                        animationDelay: index % 2 === 0 ? '0.6s' : '0s'
                    });
                }
            },
            _initLotteryContent() {
                const list = this.$refs.lotterySector.children;
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    anime.set(element, {
                        rotate: (360 / list.length) * index,
                        skew: 360 / list.length,
                        backgroundColor: index % 2 === 1 ? '#ffba00' : '#ffd34b'
                    });
                }
                const list2 = this.$refs.lotteryDesc.children;
                for (let index = 0; index < list2.length; index++) {
                    const element = list2[index];
                    anime.set(element, {
                        rotate: (360 / list2.length) * (index - 1) - 360 / list2.length / 2
                    });
                }
            },
            async rotate2Lottery() {
                if (this.lotteryKey || ['already', 'end'].includes(this.btnType)) {
                    return;
                } else if (this.btnType === 'login') {
                    // todo  do not login in yet
                    return;
                }
                this.lotteryKey = true;
                anime.set(this.$refs.turntableMain, {
                    rotate: 0
                });

                let _anime1, _anime2;
                _anime1 = anime({
                    targets: this.$refs.turntableMain,
                    rotate: 360 * 2,
                    easing: 'easeInQuad',
                    duration: 1800
                });

                _anime1.finished.then(() => {
                    _anime2 = anime({
                        targets: this.$refs.turntableMain,
                        rotate: '+=360deg',
                        easing: 'linear',
                        duration: 700,
                        loop: true
                    });
                    // setTimeout(() => {
                    //     _anime2.pause();
                    //     var animation = anime({
                    //         targets: this.$refs.turntableMain,
                    //         rotate: 360 * 4 + (360 * (1 / 8) + 360 / 16),
                    //         // easing: 'easeOutQuart',
                    //         // easing: 'easeOutCubic',
                    //         easing: 'cubicBezier(0.035, 0.565, 0.000, 1.070)',
                    //         duration: 2000
                    //     });
                    // }, 2900);
                    // return;
                    setTimeout(() => {
                        this.$api.lottery().then(({ raffleRes }) => {
                            this.btnType = 'already';
                            this.lotteryKey = false;

                            if (raffleRes.hit) {
                                const giftType = raffleRes.gift.key;
                            }
                            console.log('%celelee test:', 'background:#000;color:#fff', raffleRes);
                            _anime2.pause();
                            var animation = anime({
                                targets: this.$refs.turntableMain,
                                rotate: 360 * 4 + (360 * (1 / 8) + 360 / 16),
                                easing: 'cubicBezier(0.035, 0.565, 0.000, 1.070)',
                                // easing: 'easeOutCubic',
                                duration: 2000
                            });
                            let _tick;
                            function loop(t) {
                                animation.tick(t);
                                _tick = requestAnimationFrame(loop);
                            }
                            requestAnimationFrame(loop);
                            return this.$bus.$emit('alert', '中奖了');
                        });
                    }, 600);
                });
            }
        }
    };
</script>

<style lang="less">
    @keyframes twinkling {
        0% {
            background: #ffedb4;
        }
        100% {
            background: #ffd34b;
        }
    }
    ::-webkit-scrollbar-thumb {
        background: red;
        border-radius: 0.2rem;
    }
    ::-webkit-scrollbar {
        width: 0.06rem;
        display: block !important;
    }

    ::-webkit-scrollbar-track {
        border-radius: 0.2rem;
        background-color: #7dbeda;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        // box-shadow: 0 0 0.1rem 0.3rem #fff inset;
    }
    .lottery {
        .page;
        overflow-x: hidden;
        overflow-y: scroll;
        .b-c(#484e8e);
        .content {
            .pr;
            .wh(100%, 17.2rem);
            .lottery__top {
                .p-t;
                .bg-contain('lottery__top');
                & > [class^='lottery'] {
                    .pa;
                }
                .lottery__sun {
                    .t(0.2);
                    .l(1.6);
                    .bg-contain('lottery__sun');
                }
                .lottery__cloud {
                    .t(2.3);
                    .l(0.35);
                    .bg-contain('lottery__cloud');
                }
                .lottery__title {
                    .t(1);
                    .l;
                    .r;
                    margin: auto;
                    .bg-contain('lottery__title');
                }
                .lottery__subtitle {
                    .t(3.38);
                    .l;
                    .r;
                    margin: auto;
                    .bg-contain('lottery__subtitle');
                }
                .lottery__swallow {
                    .t(2.26);
                    .r(0.94);
                    .bg-contain('lottery__swallow');
                }
                .tip-box {
                    overflow: hidden;
                    .p-b(3);
                    .mA;
                    @h: 0.76rem;
                    .wh(6.56, @h);
                    border-radius: @h / 2;
                    .fs(0.26, @h);
                    .tac;
                    .c(#474d8d);
                    .b-c(rgba(255, 255, 255, 0.8));
                }
                .win-tip {
                    .p-t;
                    // .p-b(3);
                    // .mA;
                    // @h: 0.76rem;
                    // .wh(6.56, @h);
                    height: auto;
                    width: auto;
                }
            }

            section {
                border-radius: 50%;
            }
            .turntable-box {
                .p-t(6);
                .mA;
                @r1: 6.12rem;
                @d: 0.26rem;
                @r2: @r1 - @d * 2;
                @r3: @r2 - @d;
                @r4: @r3 - @d;
                .wh(@r1, @r1);
                .b-c(#ff6f00);
                border: #fc9a00 solid 0.02rem;
                box-shadow: 0 0.2rem 0.3rem 0.01rem rgba(0, 0, 0, 0.3);
                .inner-box2 {
                    .p-c;
                    .wh(@r2, @r2);
                    .b-c(#923b01);
                }
                .inner-box1 {
                    .p-c;
                    .wh(@r3, @r3);
                    .b-c(#fff);
                }
                .lottery-sector {
                    .p-c;
                    .wh(@r4, @r4);
                    border-radius: 50%;
                    overflow: hidden;
                    li {
                        margin: 0;
                        width: 2.56rem;
                        height: 2.56rem;
                        position: absolute;
                        transform-origin: 100% 100%;
                    }
                }
                .lottery-desc {
                    .p-c;
                    .wh(@r4, @r4);
                    border-radius: 50%;
                    li {
                        .b-b;
                        .pa;
                        margin: 0;
                        padding-top: 0.2rem;
                        width: 5rem;
                        height: 5rem;
                        position: absolute;
                        .c(#e05200);
                        .tac;
                        .lottery-img {
                            .mt(0.1);
                            .mA;
                            .wh(0.9, 0.6);
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-position: 50%;
                        }
                    }
                }

                .illumination > li {
                    display: block;
                    @s: 0.12rem;
                    .wh(@s, @s);
                    background: #ffedb4;
                    .p-c;
                    // position: absolute;
                    // top: 50%;
                    // left: 50%;
                    // margin: -@s / 2 0 0 -@s / 2;
                    border-radius: @s / 2;
                    animation: twinkling 1.2s infinite ease-in-out;
                }
                .lottery__btn {
                    .p-c;
                    transform: translateY(-0.2rem);
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    width: 2.04rem;
                    height: 2.44rem;
                }
                .lottery__btn--lottery {
                    .bg-contain('lottery__btn--lottery', true);
                }
                .lottery__btn--end {
                    .bg-contain('lottery__btn--end', true);
                }
                .lottery__btn--already {
                    .bg-contain('lottery__btn--already', true);
                }
                .lottery__btn--busy {
                    .bg-contain('lottery__btn--busy', true);
                }
                .lottery__btn--login {
                    .bg-contain('lottery__btn--login', true);
                }
            }

            .lottery__bottom {
                .p-b;
                .bg-contain('lottery__bottom');
                .lottery__title--explain {
                    .mt(0.3);
                    .mA;
                    .bg-contain('lottery__title--explain');
                }
                .explain-list {
                    padding: 0.2rem 0.72rem 0;

                    li {
                        list-style-type: decimal;
                        list-style-position: inside;
                        .fs(0.28, 0.5);
                        .c(#dadbe8);
                    }
                }
            }
        }

        .mask-box {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            .win-mask {
                .p-c;
                .wh(6.8, 7.3);
                border-radius: 0.2rem;
                .b-c(#f8f8f8);
                .mask__top {
                    background-color: #f74c11;
                    .tac;
                    border-top-left-radius: 0.2rem;
                    border-top-right-radius: 0.2rem;
                    .c-w;
                    .fs(0.36, 1.02);
                }
                .mask__content {
                    .b-b;
                    padding: 0.4rem 0.3rem 0;
                    .fs(0.32, 0.4);
                    .c(#aaaaaa);
                    .mask__prize-item {
                        .mt(0.2);
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
                        .mt(0.4);
                        color: #888888;
                        .fs(0.26);
                    }
                }
                .mask__bottom {
                    .mt(0.56);
                    .p-b;
                    border-top: 1px solid #dadada;
                    .fs(0.34);
                    button {
                        height: 1rem;
                        width: 50%;
                        &:last-child {
                            .c(#ff6262);
                            border-left: 1px solid #dadada;
                        }
                    }
                }
            }
        }
    }
</style>
