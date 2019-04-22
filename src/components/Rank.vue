<template>
    <transition name="slide">
        <div class="rank">
            <div class="rank__top">
                <img class="page-icon" alt="" src="//res.cdn.24haowan.com/public/images/t/icon-page-rank.png">
                <div class="page-title">排行榜</div>
                <!-- 集字排行榜 -->
                <img class="page-close" @click="closeRank" src="https://24haowan-cdn.shanyougame.com/public/images/t/icon-close-light.png"
                    alt="">
            </div>
            <main class="rank__content">
                <div class="scroll-box">
                    <section class="user" style="">
                        <!-- there is diff rankicon when the rank is diff -->
                        <i class="icon--rank" :style="`background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/rank-${userData.rank}.png');`"
                            v-if="userData.rank < 4 && userData.rank"></i>
                        <div class="avatar-box">
                            <img class="avatar" :src="userData.avatar" alt="">
                            <div class="cover" :style="`background-image: url('//static.cdn.24haowan.com/24haowan/public/rankIcon/img/self-No.${userData.rank < 4 ? userData.rank : ''}.png');`">
                                <p class="score-dec" v-if="userData.rank > 3">NO.{{userData.rank}}</p>
                            </div>
                            <p class="name"><span></span>{{userData.name}}</p>
                            <p class="score">{{userData.score}}</p>
                        </div>
                    </section>
                    <ul class="rank-list">
                        <li class="rank-item" v-for="(item, index) in rankList" :key="index">
                            <!-- the top tree are showed with icon image -->
                            <i class="ranking" v-if="item.rank < 4" :style="`background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/rank-${item.rank}.png');`"></i>
                            <i class="ranking" v-else>{{item.rank}}</i>
                            <div class="avatar-box">
                                <img class="avatar" :style="item.rank > 3 ? `border: 2px solid #d8d8d8;` : ''" :src="item.headimgurl">
                                <div class="cover" :style="item.rank < 4 ? `background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/No.${item.rank}.png');` : ''"></div>
                            </div>
                            <span class="name">{{item.nickname}}</span>
                            <span class="score">{{item.score}}</span>
                        </li>
                        <!-- <li class="rank-item">
                            <i class="ranking" style="background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/rank-1.png');"></i>
                            <div class="avatar-box">
                                <img class="avatar" src='http://thirdwx.qlogo.cn/mmopen/vi_32/gkUZm0MHVRxTMaAlJD18DhuLloZlNmkncaSwzDmbPibYzwj4ibOBAxPpEXKpcXyGsdBQrSaXpHgQmGtswAF9tYZw/0'>
                                <div class="cover" style='background-image: url("//static.cdn.24haowan.com/24haowan/rankIcon/img/No.1.png");'></div>
                            </div>
                            <span class="name">🔥</span>
                            <span class="score">41</span>
                        </li>
                        <li class="rank-item">
                            <i class="ranking" style="background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/rank-2.png');"></i>
                            <div class="avatar-box">
                                <img class="avatar" src='http://thirdwx.qlogo.cn/mmopen/vi_32/gkUZm0MHVRxTMaAlJD18DhuLloZlNmkncaSwzDmbPibYzwj4ibOBAxPpEXKpcXyGsdBQrSaXpHgQmGtswAF9tYZw/0'>
                                <div class="cover" style='background-image: url("//static.cdn.24haowan.com/24haowan/rankIcon/img/No.2.png");'></div>
                            </div>
                            <span class="name">12345678901234567890123456789012</span>
                            <span class="score">41</span>
                        </li>
                        <li class="rank-item">
                            <i class="ranking" style="background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/rank-3.png');"></i>
                            <div class="avatar-box">
                                <img class="avatar" src='http://thirdwx.qlogo.cn/mmopen/vi_32/gkUZm0MHVRxTMaAlJD18DhuLloZlNmkncaSwzDmbPibYzwj4ibOBAxPpEXKpcXyGsdBQrSaXpHgQmGtswAF9tYZw/0'>
                                <div class="cover" style='background-image: url("//static.cdn.24haowan.com/24haowan/rankIcon/img/No.3.png");'></div>
                            </div>
                            <span class="name">88</span>
                            <span class="score">41</span>
                        </li>
                        <li class="rank-item">
                            <i class="ranking">4</i>
                            <div class="avatar-box">
                                <img class="avatar" style='border: 2px solid #d8d8d8;' src='http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJlrDU3ia4zj00eh2LibVI4ibex7QMDjs3hdocRIhaBfUicYJepJTfFsTMCxJIP1eTicAZYtlZPmCDibBlA/0'>
                                <div class="cover"></div>
                            </div>
                            <span class="name">88</span>
                            <span class="score" style="color: #ACACAC;">11</span>
                        </li>
                        <li class="rank-item">
                            <i class="ranking">4</i>
                            <div class="avatar-box">
                                <img class="avatar" style='border: 2px solid #d8d8d8;' src='http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJlrDU3ia4zj00eh2LibVI4ibex7QMDjs3hdocRIhaBfUicYJepJTfFsTMCxJIP1eTicAZYtlZPmCDibBlA/0'>
                                <div class="cover"></div>
                            </div>
                            <span class="name">88</span>
                            <span class="score" style="color: #ACACAC;">11</span>
                        </li> -->
                    </ul>
                </div>
            </main>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                offset: 0,
                limit: 20,
                userData: {
                    avatar: undefined,
                    name: undefined,
                    openId: undefined,
                    rank: undefined,
                    score: undefined
                },
                rankList: [],
                hasNext: false
            };
        },
        watch: {
            '$bus.ready'(newV, oldV) {
                if (newV) {
                    this.getInfoFromBus();
                    this.getRank();
                }
            }
        },
        computed: {
            userCover() {}
        },
        created() {},
        methods: {
            getRank() {
                // don't change the code order in this function;
                if (this.hasNext) {
                    this.offset = this.limit;
                    this.limit += this.limit;
                }
                let offset = this.offset,
                    limit = this.limit;
                this.$api.getRank({ offset, limit }).then(res => {
                    this.rankList = !this.hasNext ? res.list : this.rankList.concat(res.list);
                    this.userData['rank'] = res.self.rank;
                    this.userData['score'] = res.self.score;
                    this.hasNext = res.hasNext;
                    console.log('%celelee test:', 'background:#000;color:#fff', res);
                });
            },
            closeRank() {
                this.$emit('closeRank');
            },
            getInfoFromBus() {
                this.initUserInfo2bus();
                Object.keys(this.$bus.userInfo).forEach(key => (this.userData[key] = this.$bus.userInfo[key]));
            },
            // get the url of user's avatar and other data from jwt in api.js.Then set it inside to bus.js
            initUserInfo2bus() {
                this.$bus.setUserInfo(this.$api.getUserInfo());
            }
        }
    };
</script>

<style lang="less">
    .rank {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        color: #222222;
        display: flex;
        flex-direction: column;
        .rank__top {
            flex: 0 1 auto;
            width: 100%;
            text-align: center;
            background: white;
            border-bottom: 1px solid #f6f6f6;
            .page-icon {
                top: 0.14rem;
                left: 0.3rem;
                width: 0.7rem;
                height: 0.7rem;
                position: absolute;
                z-index: 1;
            }
            .page-title {
                line-height: 1rem;
                font-size: 0.36rem;
            }
            .page-close {
                position: absolute;
                width: 1.1rem;
                height: 1rem;
                top: 0;
                right: 0;
                padding: 0.24rem 0.3rem;
                box-sizing: border-box;
            }
        }
        .rank__content {
            .b-b;
            width: 100%;
            flex: 2;
            padding: 0.3rem;
            overflow: hidden;
            .scroll-box {
                .wh(100%, 100%);
                overflow-y: auto;
            }
            .user {
                .pr;
                width: 100%;
                height: 3.44rem;
                .mt(-0.2);
                border-bottom: 1px solid #f6f6f6;
                .icon--rank {
                    margin: 0 0.16rem;
                    .pa;
                    .l;
                    .t(50%);
                    transform: translateY(-50%);
                    display: inline-block;
                    .wh(0.3, 0.4);
                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .avatar-box {
                    margin-top: -0.2rem;
                    .p-c;
                    .avatar {
                        .pa;
                        left: 50%;
                        .t(46%);
                        height: 1.36rem;
                        width: 1.36rem;
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                    }
                    .cover {
                        .pa;
                        left: 50%;
                        .t(40%);
                        width: 4.34rem;
                        height: 2.26rem;
                        transform: translate(-50%, -50%);
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        .score-dec {
                            .p-b(0.24);
                            .tac;
                            .fs(0.24);
                            color: #644702;
                        }
                    }
                    .name {
                        .p-b(0.7);
                        .tac;
                        .fs(0.28);
                        span {
                            display: inline-block;
                            .wh(0.3, 0.3);
                            margin-right: 0.1rem;
                            .fs(0);
                            vertical-align: middle;
                            background-image: url('//static.cdn.24haowan.com/24haowan/rankIcon/img/self.png');
                            background-size: cover;
                        }
                    }
                    .score {
                        .p-b(0.2);
                        .tac;
                        .c(#644702);
                        .fs(0.36);
                    }
                }
            }
            .rank-list {
                .rank-item {
                    .wh(100%, 1.2rem);
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    border-bottom: 1px solid #f6f6f6;
                    .fs(0.28);
                    .c(#333333);
                    .ranking {
                        flex: none;
                        width: 0.3rem;
                        height: 0.4rem;
                        display: inline-block;
                        margin: 0 0.16rem;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        text-align: center;
                    }
                    .avatar-box {
                        flex: none;
                        .pr;
                        margin: auto 0.4rem;
                        height: 0.76rem;
                        width: 0.76rem;
                        img {
                            border-radius: 50%;
                            height: 100%;
                        }
                        .cover {
                            .wh(0.9, 1);
                            box-sizing: content-box;
                            background-position: center;
                            background-size: cover;
                            background-repeat: no-repeat;
                            position: absolute;
                            left: 50%;
                            top: -0.2rem;
                            transform: translateX(-50%);
                        }
                    }
                    .name {
                        flex: 1;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .score {
                        flex: none;
                        margin: 0 0.16rem;
                        color: #644702;
                        .fs(0.36);
                    }
                }
            }
        }
    }
</style>
