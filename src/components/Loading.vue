<template>
    <div id="loading">
        <div class="balls">
            <div class="ball" v-for='e in num' :key='e' :style="'animation-delay:' + e / num + 's'"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Making',
        data() {
            return {
                num: 5
            };
        }
    };
</script>

<style lang='scss'>
    #loading {
        @include full-screen;
        z-index: 99999;
        background-color: rgba($color: $black, $alpha: 0.6);
        .balls {
            @include center;
            .ball {
                float: left;
                margin-left: 0.13rem;
                width: 0.26rem;
                height: 0.26rem;
                background-color: white;
                border-radius: 50%;
                animation: jump 1s infinite;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    @keyframes jump {
        10% {
            transform: translateY(-30%);
        }
        20% {
            transform: translateY(0%);
        }
    }
</style>
