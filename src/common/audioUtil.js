import { isWeixinBrowser } from './util'
import {Howl, Howler} from '@static/js/howler.min.js'

class AudioUtil {
    constructor() {
        this.audioList = {}
        this.muted = false
        this.loadListener = null
        this.loaded = 0
        this.preloadLen = 0
        this.isWx = isWeixinBrowser()
    }

    addLoadListener(listener) {
        this.loadListener = listener
        return this
    }

    load(list = {}) {
        let len = 0
        Object.keys(list).forEach(key=> {
            const audio = list[key]
            let params = {
                src: audio.src,
                onplay: (id)=> {
                    this.audioList[key].id = id
                },
                onload: ()=> {
                    this.loaded++
                    if (!audio.noPreload) {
                        this.preloadLen++
                        this.loadListener && this.loadListener(this.preloadLen)
                    }
                    if (audio.autoplay) {
                        if (!this.isWx) {
                            this.audioList[key].id === -1 ? this.play(key) : ''
                            console.log('自动播放音乐', key)
                        }
                    }
                },
                onloaderror: (id)=> {
                    this.loaded++
                    this.audioList[key].loaderror = true
                    console.log('music loaderror', key)
                    if (!audio.noPreload) {
                        this.preloadLen++
                        this.loadListener && this.loadListener(this.preloadLen)
                    }
                }
            }
            if (!audio.noPreload) {
                len++
            }
            // if (audio.autoplay) {
            //     params.autoplay = true
            // }
            if (audio.loop) {
                params.loop = true
            }
            this.audioList[key] = {
                id: -1,
                autoplay: audio.autoplay,
                audio: new Howl(params)
            }
        })
        if(len === 0) {
            this.loadListener && this.loadListener(0)
        }
        this._autoPlayInWeiXin()
    }

    _autoPlayInWeiXin() {
        if (this.isWx) {
            document.addEventListener('WeixinJSBridgeReady', () => {
                console.log('audio WeixinJSBridgeReady')
                Object.keys(this.audioList).forEach(key=>{
                    let data = this.audioList[key]
                    if (data.autoplay) {
                        let t = setInterval(()=> {
                            console.log('music', data.audio.state(), key)
                            if (!data.loaderror) {
                                if(data.audio.state() === 'loaded') {
                                    clearInterval(t)
                                    data.id === -1 ? this.play(key) : ''
                                    console.log('自动播放音乐', key)
                                }
                            } else {
                                clearInterval(t)
                            }
                        }, 500)
                    }
                })
            }, false)
        }
    }

    /**
     * 
     * @param {*} muted 是否静音
     */
    mute(muted = false) {
        console.log('music meted', muted)
        Howler.mute(muted)
        if (!muted && muted !== this.muted) {
            Object.keys(this.audioList).forEach(key=>{
                let data = this.audioList[key]
                if (data.autoplay) {
                    if(data.audio.state() === 'loaded') {
                        data.id === -1 ? data.audio.play() : data.audio.play(data.id)
                        console.log('自动播放音乐', key)
                    }
                }
            })
        } else if (muted && muted !== this.muted) {
            this.stopAll()
        }
        this.muted = muted
    }

    /**
     * 
     * @param {*} name 播放的音乐的名称
     */
    play(name) {
        if (this.muted) {
            return
        }
        if (this.audioList[name]) {
            let id = this.audioList[name].id
            if (id !== -1) {
                this.audioList[name].audio.play(id)
            } else {
                this.audioList[name].audio.play()
            }
        }
    }

    /**
     * 
     * @param {*} name 暂停的音乐的名称
     */
    pause(name) {
        if (this.audioList[name]) {
            let id = this.audioList[name].id
            if (id !== -1) {
                this.audioList[name].audio.pause(id)
            } else {
                this.audioList[name].audio.pause()
            }
        }
    }

    /**
     * 暂停所有音乐
     */
    pauseAll() {
        Object.keys(this.audioList).forEach(key=>{
            let id = this.audioList[key].id
            if (id !== -1) {
                this.audioList[key].audio.pause(id)
            }
        })
    }

    /**
     * 
     * @param {*} name 停止播放音乐的名称
     */
    stop(name) {
        if (this.audioList[name]) {
            let id = this.audioList[name].id
            if (id !== -1) {
                this.audioList[name].audio.stop(id)
            } else {
                this.audioList[name].audio.stop()
            }
        }
    }

    /**
     * 停止播放所有音乐
     */
    stopAll() {
        Object.keys(this.audioList).forEach(key=>{
            let id = this.audioList[key].id
            if (id !== -1) {
                this.audioList[key].audio.stop(id)
            }
        })
    }
}

export default {
    install: function install(Vue) {
        const audioUtil = new AudioUtil()
        Vue.prototype.$audio = audioUtil
    }
}