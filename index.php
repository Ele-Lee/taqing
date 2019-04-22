<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <script>
        (function (doc, win) {
            var docEl = doc.documentElement,
                isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
                dpr = window.top === window.self ? dpr : 1,
                //被iframe引用时，禁止缩放
                dpr = 1, scale = 1 / dpr, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'; docEl.dataset.dpr = dpr;
            var metaEl = doc.createElement('meta');
            metaEl.name = 'viewport';
            metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
            docEl.firstElementChild.appendChild(metaEl);
            var recalc = function () {
                var width = docEl.clientWidth;
                if (width / dpr > 750) {
                    width = 750 * dpr;
                }
                // 乘以100，px : rem = 100 : 1
                docEl.style.fontSize = 100 * (width / 750) + 'px';
            };
            recalc()
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
        })(document, window);
    </script>
    <title>宝龙中秋赢大礼</title>
    <link href="http://24haowan-cdn.shanyougame.com/dingzhi/baolong/resource/dist/static/css/app.css?v=<?php echo Yii::app()->params['version']; ?>" rel=stylesheet>
</head>

<body>
    <div id=app></div>
    <script type=text/javascript src="http://24haowan-cdn.shanyougame.com/dingzhi/baolong/resource/dist/static/js/manifest.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
    <script type=text/javascript src="http://24haowan-cdn.shanyougame.com/dingzhi/baolong/resource/dist/static/js/vendor.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
    <script type=text/javascript src="http://24haowan-cdn.shanyougame.com/dingzhi/baolong/resource/dist/static/js/app.js?v=<?php echo Yii::app()->params['version']; ?>"></script>
</body>

</html>
