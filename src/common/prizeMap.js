const descMap = {
    shiwu_1: '国内（不含港澳台）双人往返直飞机票',
    yijia_1: 'BOSE SoundSport Free真无线蓝牙耳机 蓝牙运动耳机',
    yijia_2: 'WAAGE GMO ZERO系列MIA Link the world 艺术家印花拉杆箱 气球',
    yijia_3: '蕉下莲町双层防晒小黑伞折叠晴雨伞女防紫外线太阳遮阳伞',
    yijia_4: '维士十字 旅行收纳袋三件套装3002G1',
    yijia_5: '飞利浦 线控自拍杆 自拍神器 苹果、华为、三星等通用 DLK36005L 白色',
    yijia_6: '中信易家20减10元满减券',
    // 中信优享+积分
    pointBag: {
        point_1: 2,
        point_2: 50,
        point_3: 100,
        point_4: 200,
        point_5: 500,
        point_6: 1000,
        point_7: 2000,
        point_8: 5000
    }
};

let tableArr = [];
Object.keys(descMap).forEach(key => tableArr.push(key));

let nameMap = {
    shiwu_1: '机票',
    yijia_1: '耳机',
    yijia_2: '旅行箱',
    yijia_3: '太阳伞',
    yijia_4: '收纳盒',
    yijia_5: '自拍杆',
    yijia_6: '满减券',
    pointBag: '积分礼包'
};
export { descMap, nameMap, tableArr };
