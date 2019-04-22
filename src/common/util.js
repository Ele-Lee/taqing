//获取当前URL某个参数，传URL就获取url内某个
const getOneURLQuery = (key, url) => {
    let query = url ? url.split("?")[1] : window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == key) {
            return pair[1];
        }
    }
    return false;
}

//获取某URL所有参数，集成一个对象
const getAllUrlQuery = (url)=> {
    let _url = url || window.location.href
    // 获取连接后面的参数，微信分享的链接可能会有编码问题，先decodeURI
    let params = decodeURI(_url).split('#')[0].split('?')
    // 如果只有一个数据，说明没有带参数
    if (params.length > 1) {
        let result = {}
        params = params[1].split('&')
        params.forEach(item=> {
            // 取出键值对
            let arr = item.split('=')
            let key = arr[0]
            let value = arr[1]
            // 如果出现大于2的数组，说明value中有 = 这个符号，需要拼接起来
            // 比如微信分享，中文参数先base64编码后有可能会出现这种情况
            if (arr.length > 2) {
                arr.splice(0, 1)
                value = arr.join('=')
            }
            // 因为直接解析为对象可能会出错，如果value是对象，需要自己用JSON.parse(str)解析
            // 同样，直接解码可能会报错，因为有些value是没有编码的，如果value是base64Encode编码的，也需要自己调用base64Decode(str)解码
            result[key] = value
        })
        return result
    }
    // 返回一个空对象
    return {}
}

// base64解码
const base64Decode = (str)=> {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}
// base64编码（微信分享附带中文参数时需要用到）
const base64Encode = (str)=> {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1)
    }))
}

//获取某URL所有参数，集成一个对象
// const getAllUrlQuery = (url) => {
//     let _url = url || window.location.href;
//     let queryTemp = _url.split("?query=")[1];
//     let queryStr = queryTemp.substring(0, queryTemp.indexOf('}') + 1)
//     let queryObj = JSON.parse(queryStr);
//     return queryObj;
// }
// 判断是不是ios
const isIos = ()=> /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())

// 判断是不是微信打开
const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);


// 判断是不是生产环境
const isProdENV = process.env.NODE_ENV === 'production';

export {
    setTranslate,
    getOneURLQuery,
    getAllUrlQuery,
    isWeixinBrowser,
    isProdENV,
    isIos,
    base64Decode,
    base64Encode
};
