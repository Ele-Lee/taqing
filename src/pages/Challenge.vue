<template>
    <div class="challenge">
        <div class="badge">
            <p class="hint">= {{fromSomeoneName}}的得分 =</p>
            <div class="socre"></div>
        </div>
        <div class="over__cloud"></div>
        <!-- @todo -->
        <p class="desc">我在踏青活动中得了7分，<br>快来试试你的实力，满60分还能抽奖哦！</p>
        <div class="btn-box"><button class="challenge__btn"></button></div>
        <section class="challenge__gift"></section>
        <footer class="over__road">
            <div class="home__man"></div>
        </footer>
    </div>
</template>

<script>
    export default {
        computed: {
            fromSomeoneName() {
                return '二狗';
            }
        }
    };
</script>

<style lang="less">
    .challenge {
        .page();
        .b-c(#87bff9);
        .badge {
            .mt(-0.4);
        }
        .desc {
            .mt(-1.4);
            .tac;
            .c(#7684b8);
            font-weight: 600;
            .fs(0.3, 0.4);
        }
        .challenge__btn {
            .pr;
            .mt(0.2);
            .bg-contain('challenge__btn');
            z-index: 3;
        }
        .over__cloud {
            top: 6.3rem;
        }
        .challenge__gift {
            .p-b;
            .bg-contain('challenge__gift');
            z-index: 3;
        }

        .home__man {
            .pf;
            .b(-1.8);
            .r(0.2);
            .bg-contain('home__man');
            transform: scale(0.7);
            z-index: 4;
        }
    }
</style>
