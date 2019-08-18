if (!LOLZoneArea) {
    var LOLZoneArea = {};
}

LOLZoneArea.data = [{
    t: "��ŷ����  ����",
    v: "1",
    z: "257"
}, {
    t: "�ȶ�������  ��ͨ",
    v: "2",
    z: "258"
}, {
    t: "�氲 ����",
    v: "3",
    z: "513"
}, {
    t: "ŵ����˹  ����",
    v: "4",
    z: "769"
}, {
    t: "�������� ��ͨ",
    v: "6",
    z: "514"
}, {
    t: "��¶��� ����",
    v: "5",
    z: "1025"
}, {
    t: "Ƥ�����ַ� ����",
    v: "7",
    z: "1281"
}, {
    t: "ս��ѧԺ ����",
    v: "8",
    z: "1537"
}, {
    t: "���׶�׿�� ��ͨ",
    v: "9",
    z: "770"
}, {
    t: "����� ����",
    v: "10",
    z: "1793"
}, {
    t: "��ɪ�ر� ����",
    v: "11",
    z: "2049"
}, {
    t: "��η�ȷ� ��ͨ",
    v: "12",
    z: "1026"
}, {
    t: "�þ�֮�� ����",
    v: "13",
    z: "2305"
}, {
    t: "��ɫõ�� ����",
    v: "14",
    z: "2561"
}, {
    t: "��Ӱ�� ����",
    v: "15",
    z: "2817"
}, {
    t: "�������� ����",
    v: "17",
    z: "3073"
}, {
    t: "ˡ���� ��ͨ",
    v: "16",
    z: "1282"
}, {
    t: "������� ����",
    v: "19",
    z: "3585"
}, {
    t: "ˮ��֮�� ����",
    v: "18",
    z: "3329"
}, {
    t: "������ר��",
    v: "21",
    z: "65539"
}, {
    t: "Ӱ�� ����",
    v: "22",
    z: "3841"
}, {
    t: "����֮�� ����",
    v: "23",
    z: "4097"
}, {
    t: "Ť������ ��ͨ",
    v: "20",
    z: "1538"
}, {
    t: "����֮�� ����",
    v: "24",
    z: "4353"
}, {
    t: "�������� ����",
    v: "25",
    z: "4609"
}, {
    t: "Ƥ�Ǿ��� ����",
    v: "27",
    z: "4865"
}, {
    t: "����֮�� ��ͨ",
    v: "26",
    z: "1794"
}, {
    t: "�о����� ȫ����",
    v: "30",
    z: "261"
}, {
    t: "Ͽ��֮�� ȫ����",
    v: "31",
    z: "517"
}, {
    t: "����֮��",
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