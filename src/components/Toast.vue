<!-- Toast弹窗组件 -->
<template>
    <transition name="fade">
        <div v-if='text || loading'>
            <section class='toast' v-if='text'>
                <div class='toast__info' :class="this.bigSize ? 'toast__info--big' : ''">{{ text }}</div>
            </section>
            <section class='toast' v-if='loading'>
                <div class='toast__loading'>
                    <img :src="require('@imgs/loading.gif')" alt="">
                    <p>正在生成...</p>
                </div>
            </section>
        </div>
    </transition>
</template>
<script>
    export default {
        data() {
            return {
                text: undefined,
                loading: false,
                currentClass: 'toast__hide',
                timeout: '',
                bigSize: false
            };
        },
        beforeMount() {
            this.$bus.$on('alert', (text, size, duration = 1800) => {
                // 先清除上一个计时器
                if (this.timeout) clearTimeout(this.timeout);
                this.bigSize = size == 'big' ? true : false;
                this.text = text;
                this.timeout = setTimeout(() => {
                    this.text = null;
                }, duration);
            });
            this.$bus.$on('showAlertLoading', () => {
                this.loading = true;
            });
            this.$bus.$on('hideAlertLoading', () => {
                this.loading = false;
            });
        }
    };
</script>
<style lang='scss'>
    .toast {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        font-size: 0.18rem;
        z-index: 100;

        &__info {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            width: 2.6rem;
            height: 0.8rem;
            line-height: 0.8rem;
            border-radius: 0.1rem;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            text-align: center;
            z-index: 101;
            &--big {
                width: 4rem;
            }
        }
        &__loading {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            width: 2.4rem;
            height: 1.4rem;
            border-radius: 0.1rem;
            background-color: rgba(0, 0, 0, 0.6);
            text-align: center;
            z-index: 101;
            img {
                width: 0.6rem;
                height: auto;
                margin-top: 0.2rem;
                margin-bottom: 0.05rem;
                /* transform: translateY(20%); */
            }
            p {
                color: #ffffff;
                font-weight: 700;
                font-size: 0.26rem;
            }
        }
        &__concurrent {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            width: 3rem;
            height: 1.4rem;
            border-radius: 0.1rem;
            background-color: rgba(0, 0, 0, 0.6);
            padding-top: 0.14rem;
            text-align: center;
            z-index: 101;
            p {
                color: #ffffff;
                font-weight: 700;
                font-size: 0.26rem;
                padding: 0.05rem 0;
            }
        }
    }
</style>
