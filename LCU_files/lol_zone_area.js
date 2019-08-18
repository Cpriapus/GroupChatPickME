if (!LOLZoneArea) {
    var LOLZoneArea = {};
}

LOLZoneArea.data = [{
    t: "艾欧尼亚  电信",
    v: "1",
    z: "257"
}, {
    t: "比尔吉沃特  网通",
    v: "2",
    z: "258"
}, {
    t: "祖安 电信",
    v: "3",
    z: "513"
}, {
    t: "诺克萨斯  电信",
    v: "4",
    z: "769"
}, {
    t: "德玛西亚 网通",
    v: "6",
    z: "514"
}, {
    t: "班德尔城 电信",
    v: "5",
    z: "1025"
}, {
    t: "皮尔特沃夫 电信",
    v: "7",
    z: "1281"
}, {
    t: "战争学院 电信",
    v: "8",
    z: "1537"
}, {
    t: "弗雷尔卓德 网通",
    v: "9",
    z: "770"
}, {
    t: "巨神峰 电信",
    v: "10",
    z: "1793"
}, {
    t: "雷瑟守备 电信",
    v: "11",
    z: "2049"
}, {
    t: "无畏先锋 网通",
    v: "12",
    z: "1026"
}, {
    t: "裁决之地 电信",
    v: "13",
    z: "2305"
}, {
    t: "黑色玫瑰 电信",
    v: "14",
    z: "2561"
}, {
    t: "暗影岛 电信",
    v: "15",
    z: "2817"
}, {
    t: "钢铁烈阳 电信",
    v: "17",
    z: "3073"
}, {
    t: "恕瑞玛 网通",
    v: "16",
    z: "1282"
}, {
    t: "均衡教派 电信",
    v: "19",
    z: "3585"
}, {
    t: "水晶之痕 电信",
    v: "18",
    z: "3329"
}, {
    t: "教育网专区",
    v: "21",
    z: "65539"
}, {
    t: "影流 电信",
    v: "22",
    z: "3841"
}, {
    t: "守望之海 电信",
    v: "23",
    z: "4097"
}, {
    t: "扭曲丛林 网通",
    v: "20",
    z: "1538"
}, {
    t: "征服之海 电信",
    v: "24",
    z: "4353"
}, {
    t: "卡拉曼达 电信",
    v: "25",
    z: "4609"
}, {
    t: "皮城警备 电信",
    v: "27",
    z: "4865"
}, {
    t: "巨龙之巢 网通",
    v: "26",
    z: "1794"
}, {
    t: "男爵领域 全网络",
    v: "30",
    z: "261"
}, {
    t: "峡谷之巅 全网络",
    v: "31",
    z: "517"
}, {
    t: "试炼之地",
    v: "100",
    z: "65537"
}];

LOLZoneArea.searchNodeByAttr = function (attr, value) {
    for (var idx in LOLZoneArea.data) {
        if (LOLZoneArea.data[idx][attr] == value) {
            return LOLZoneArea.data[idx];
        }
    }
    return null;
}

LOLZoneArea.zoneToName = function (zone) {
    var node = LOLZoneArea.searchNodeByAttr('z', zone);
    return node ? node.t : null;
}

LOLZoneArea.areaToName = function (area) {
    var node = LOLZoneArea.searchNodeByAttr('v', area);
    return node ? node.t : null;
}

LOLZoneArea.zoneToArea = function (zone) {
    var node = LOLZoneArea.searchNodeByAttr('z', zone);
    return node ? node.v : null;
}

LOLZoneArea.areaToZone = function (area) {
    var node = LOLZoneArea.searchNodeByAttr('v', area);
    return node ? node.z : null;
} /*  |xGv00|c22276f3c6b89f3c3ef1fc379847238c */