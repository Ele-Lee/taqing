// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    //  下面这个写法也是生效的
    // "plugins": [
    //     require('autoprefixer')
    // ]
    "plugins": {
        // to edit target browsers: use "browserlist" field in package.json
        "autoprefixer": {
            browsers: ["> 1%", 'ie >= 9', 'last 2 versions', 'iOS 8.1']
        },
        "cssnano": {
            autoprefixer: false,
            safe: true
        }
    }
}
