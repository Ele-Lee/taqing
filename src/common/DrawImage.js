export default class DrawPoster {
    constructor(w, h) {
        this.canvas = null;
        this.init(w, h);
    }

    init(w, h, type = 'image/png') {
        this.canvas = document.createElement('canvas');
        this.canvas.useCORS = true;
        this.canvas.width = w;
        this.canvas.height = h;
        this.resultType = type;
    }

    circleImg(ctx, img, x, y, r) {
        ctx.save();
        ctx.beginPath();
        let d = 2 * r;
        let cx = x + r;
        let cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();

        // 加上下面会有边框
        // ctx.lineWidth = 18
        // ctx.strokeStyle = `rgba(73,116,235,1)`
        // ctx.strokeStyle = "#fff"
        // ctx.stroke();

    }

    showDemo(cssText) {
        const domId = '_demo_';
        if (document.querySelector(`#${domId}`)) {
            return document.querySelector(`#${domId}`).src = this.canvas.toDataURL(this.resultType);;
        }

        const cssStr = cssText || 'position: fixed; top: 0; left: 0;border: 2px solid #58ffaa;z-index: 9999';

        const demo = new Image();
        demo.onload = () => {
            demo.style.cssText = cssStr;
            demo.style.width = this.canvas.width / 100 + 'rem';
            demo.id = domId;
            document.querySelector('body').appendChild(demo);
        }
        demo.src = this.canvas.toDataURL(this.resultType)

    }

    writeText({text, x, y, fs = '28', color = '#fff', maxW = 58}) {
        let textTemp = text;
        let _w = this.getCanvasCtx().measureText(textTemp).width.toFixed(2);
        // 查看字符有多长
        if (_w > maxW) {
            while(this.getCanvasCtx().measureText(textTemp).width.toFixed(2) > maxW) {
                textTemp = textTemp.slice(0, -1);
            }
            let _tempW = this.getCanvasCtx().measureText(textTemp).width.toFixed(2);
            if (_tempW > maxW - 1) {
                textTemp = textTemp.slice(0, -1) + '...';
            }
        }
        this.getCanvasCtx().fillStyle = color;
        this.getCanvasCtx().textAlign = "center";
        this.getCanvasCtx().font = `bold ${fs}px SimHei`;
        this.getCanvasCtx().fillText(textTemp, x, y);
    }

    /* jshint ignore:start */
    /**
     * 在canvas上画东西
     * @param { Array|Array... } -[source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight]
     * source是图片资源，如果数组长度是3，就使用图片默认宽高；
     * 一个数组画一次，可以多个数组，drawImg2Canvas([source, dx, dy, dWidth, dHeight], [source2, dx2, dy2, dWidth2, dHeight2])
     * 对应 ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
     * @return img.src
     */
    drawImg2Canvas() {
        return new Promise((resolve, reject) => {
            const ctxInstance = this.getCanvasCtx();
            const _drawImage = (img, sourceArr) => {
                sourceArr.shift();
                const _len = sourceArr.length;
                // 显示demo要二被稿缩小
                switch (_len) {
                    case 2:
                        ctxInstance.drawImage(img, sourceArr[0], sourceArr[1], img.width, img.height)
                        break;
                    case 3:
                        // 画圆
                        this.circleImg(ctxInstance, img, ...sourceArr)
                        break;
                    default:
                        // 其他长度按照原生drawImage写法
                        ctxInstance.drawImage(img, ...sourceArr)
                        break;
                }
            }
            // 首先画背景
            this.getImgObject(arguments[0][0]).then(async imgObj => {
                _drawImage(imgObj, arguments[0])
                // 不算上第一个参数
                for(let i = 1; i < arguments.length; i++) {
                    // 之后的参数是数据，第一个是图片src内容，所以去掉
                    if(!Array.isArray(arguments[i])) reject('drawImg2Canvas: it is not an array');
                    let img = await this.getImgObject(arguments[i][0]);
                    _drawImage(img, arguments[i])
                }
                resolve(this.canvas.toDataURL(this.resultType));
            });
        });
    }
    /* jshint ignore:end */

    getImgObject(source) {
        return new Promise((resolve, reject) => {
            if (Object.prototype.toString.call(source).slice(8, -1) === 'HTMLImageElement') resolve(source);
            let _img = new Image();
            _img.crossOrigin = '*';
            const compatibilityKey = /anonymous/i.test(_img.crossOrigin) ? true : false;
            _img.onload = () => resolve(_img);
            // compatibilityKey为true, 支持image的跨域属性,不需要走兼容规避的操作
            // 或者不支持，同时传入了是base64，就克隆一个Blob对象
            if (compatibilityKey || /data:image\/[a-z]*;base64,/.test(source)) {
                _img.onerror = (err) => reject(err);
                _img.src = compatibilityKey ? source : this.base64toNewBlob(source);
            } else {
                this.loadImgXHR(source).then(_url => _img.src = _url);
            }
        }).catch(err => console.log('getImgObject:', err));
    }

    getCanvasCtx() {
        if (!this.ctx) {
            this.ctx = this.canvas.getContext('2d');
        }
        return this.ctx;
    }

    base64toNewBlob(base64) {
        let arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(new Blob([u8arr], {
            type: mime
        }));
    }

    loadImgXHR(url) {

        return new Promise((resolve, reject) => {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = () => reject("loadImgXHR: Network error.");
                xhr.onload = () => {
                    if (xhr.status === 200 && /image/.test(xhr.response.type)) {
                        const urlCreator = window.URL || window.webkitURL;
                        const imageUrl = urlCreator.createObjectURL(xhr.response);
                        resolve(imageUrl);
                        // 如果还有问题，可以考虑克隆一份Blob
                        // this.cloneBlob(xhr.response).then(blob => {})
                    } else if (!/image/.test(xhr.response.type)) {
                        reject('loadImgXHR: It is not a image: ' + xhr.response.type)
                    } else {
                        reject("loadImgXHR: Loading error:" + xhr.statusText)
                    }
                };
                xhr.send();
            } catch(err) {
                reject('loadImgXHR' + err.message);
            }
        })
    }

    // cloneBlob(b) {
    //     return new Promise((resolve, reject) => {
    //         const r = new FileReader();
    //         r.readAsArrayBuffer(b)
    //         r.addEventListener('load', () => resolve(new Blob([r.result], {type: b.type})));
    //         r.addEventListener('error', (err) => reject('cloneBlob: error', err));
    //     });
    // }
}
