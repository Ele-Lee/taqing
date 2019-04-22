<!--
    @touchstart.prevent 是防止点击穿透，插槽内所有点击缓存touchend,不能滑动！！！
 -->
<template>
    <transition name="fade">
        <div class="masking" @touchstart.self.prevent :style="`background: ${rgba}`">
            <main class="masking__frame">
                <slot></slot>
            </main>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'masking',
        props: {
            maskColor: {
                type: String,
                default: '#000000'
            },
            maskAlpha: {
                type: String,
                default: '0.8'
            }
        },
        data() {
            return {
                rgba: '(0,0,0,0.8)'
            };
        },
        methods: {
            closeMask() {
                this.$emit('closeMask');
            },
            hexToRgba(hex, opacity) {
                let _hex = hex.substr(1);
                if (_hex.length == 3) {
                    let temp = [];
                    let _hexArr = _hex.split('');
                    for (let i in _hexArr) {
                        temp[i] = _hexArr[i] + _hexArr[i];
                    }
                    _hex = temp.join('');
                }
                return (
                    'rgba(' +
                    parseInt('0x' + _hex.slice(0, 2)) +
                    ',' +
                    parseInt('0x' + _hex.slice(2, 4)) +
                    ',' +
                    parseInt('0x' + _hex.slice(4, 6)) +
                    ',' +
                    opacity +
                    ')'
                );
            }
        },
        created() {
            this.rgba = this.hexToRgba(this.maskColor, this.maskAlpha);
        }
    };
</script>

<style lang="scss">
    .masking {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        z-index: 300;
        content: ' ';
        .masking__frame {
            @extend .c;
        }
    }
</style>
