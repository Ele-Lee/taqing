const os = require('os');
const ifaces = os.networkInterfaces();
let ipv4 = null;

Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
            console.warn('本项目暂时没做多IP处理');
        } else {
            // this interface has only one ipv4 adress
            console.log('本机局域网ipv4', ifname, iface.address);
            ifname === 'en1' && (ipv4 = iface.address);
        }
        ++alias;
    });
});

module.exports = ipv4;
