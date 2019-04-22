export default {
    // 分享文案
    share: {
        title: '分享标题',
        desc: '分享描述',
        link: window.location.href.split('#')[0],
        imgUrl: '',
        type: 'link',
        dataUrl: ''
    },
    audioList: {
        bgm: {
            src: require('@audios/bgm.mp3'), // 本地音频地址
            autoplay: true, // 自动播放
            loop: true, // 循环播放
        }
    }
};
