(function() {
  var urfModeEligible = false;
  var playEnabled = false;
  RClientWindowMessenger.addMessageListener({
    messageType: 'play-enabled-response',
    handlers: function(messageType, data) {
      playEnabled = !!data.enabled;
    }
  });

  RClientWindowMessenger.addMessageListener({
    messageType: 'eligible-queues-response',
    handlers: function(messageType, data) {
      eligibleQueue = data;
      RClientWindowMessenger.sendMessage({
        messageType: 'rcp-fe-lol-home-play-enabled'
      });
    }
  });
  RClientWindowMessenger.sendMessage({
    messageType: 'rcp-fe-lol-home-eligible-queues'
  });
  RClientWindowMessenger.addMessageListener({
    messageType: 'create-lobby-response',
    handlers: function(messageType, data) {}
  });
  $(".GuideGameModel-list .qid").click(function() {
    var Qid = parseInt($(this).data('type-id'));
    if (helper.isModeAllow(Qid)) {
      RClientWindowMessenger.sendMessage({
        messageType: 'rcp-fe-lol-home-create-lobby',
        data: {
          queueId: Qid
        }
      });
      RClientWindowMessenger.sendMessage({
          messageType: 'rcp-fe-lol-home-play-sound',
          data: {
              key: 'button-click'
          }
      });
    } else {
      helper.showDisallowModeDialog(Qid);
    }
  });
})();

var LcuHelper = {
    Champ: {
        _cache: {
            lastGetChampsCallback: null,
            lastGetChampsNum: 0,
            lastGetChampsData: [],
            lastGetChampsDataHash: {},
            gettingChampsDataFlag: false
        },
        _usefulCampCount:0,
        init: function (callback) {
            var tis = this;
            RClientWindowMessenger.addMessageListener({
                messageType: 'rcp-fe-lol-home-champ-game-data-response',
                handlers: function (messageType, data) {
                    if (data.champJSON) {
                        tis._cache.lastGetChampsData.push(data);
                        tis._cache.lastGetChampsDataHash[data.champJSON.id] = data;
                    }
                    else {
                        tis._cache.lastGetChampsNum -= 1;
                    }

                    if (tis._cache.lastGetChampsNum == tis._cache.lastGetChampsData.length) {
                        if (typeof (tis._cache.lastGetChampsCallback) == 'function') {
                            tis._cache.gettingChampsDataFlag = false;
                            tis._cache.lastGetChampsCallback({
                                // 获取全部英雄的全部信息
                                getAllHeroesFullInfo: function (returnArray) {
                                    if (returnArray) {
                                        return this._cache.lastGetChampsData;
                                    }
                                    else {
                                        return tis._cache.lastGetChampsDataHash;
                                    }
                                },
                                // 获取指定英雄的全部信息
                                getHeroesFullInfo: function (ids, returnArray) {
                                    var re = {};
                                    if (returnArray) {
                                        re = [];
                                    }

                                    if (ids) {
                                        for (var i = 0; i < ids.length; i++) {
                                            var key = ids[i] + '';
                                            var item = tis._cache.lastGetChampsDataHash[key];
                                            if (returnArray) {
                                                re.push(item);
                                            }
                                            else {
                                                re[key] = item;
                                            }
                                        }
                                    }

                                    return re;
                                },
                                // 获取指定英雄皮肤图片信息
                                getHeroSkinPics: function (skinIds, returnArray) {
                                    var re = {};
                                    if (returnArray) {
                                        re = [];
                                    }
                                    if (skinIds) {
                                        for (var i = 0; i < skinIds.length; i++) {
                                            var skinId = skinIds[i] + '';
                                            var heroId = (parseInt(parseInt(skinId) / 1000));
                                            if (typeof (tis._cache.lastGetChampsDataHash[heroId]) != 'undefined') {
                                                var campItem = tis._cache.lastGetChampsDataHash[heroId]; // 英雄
                                                var champJSON = campItem.champJSON; // 英雄信息
                                                var returkSkinInfo = null;
                                                for (var j = 0; j < champJSON.skins.length; j++) {
                                                    if (typeof (champJSON.skins[j]) != 'undefined') {
                                                        var skinItem = champJSON.skins[j]; // 皮肤
                                                        if ((skinItem.id + '') == skinId) {
                                                            var returkSkinInfo = {
                                                                skinId: skinItem.id,
                                                                name: skinItem.name,
                                                                isBase: skinItem.isBase,
                                                                title: (campItem.basePath + skinItem.tilePath),
                                                                splash: (campItem.basePath + skinItem.splashPath),
                                                                uncenteredSplash: (campItem.basePath + skinItem.uncenteredSplashPath),
                                                                emblems: null,
                                                                rarityGem: null
                                                            };
                                                            if (skinItem.emblems && skinItem.emblems.length > 0) {
                                                                returkSkinInfo.emblems = [];
                                                                for (var k = 0; k < skinItem.emblems.length; k++) {
                                                                    var emblem = skinItem.emblems[k];
                                                                    returkSkinInfo.emblems.push(campItem.basePath + emblem.emblemPath.large);
                                                                }
                                                            }
                                                            if (skinItem.rarityGemPath) {
                                                                returkSkinInfo.rarityGem = (campItem.basePath + skinItem.rarityGemPath);
                                                            }
                                                            break;
                                                        }
                                                    }
                                                }
                                                if (returnArray) {
                                                    re.push(returkSkinInfo);
                                                }
                                                else {
                                                    re[skinId] = returkSkinInfo;
                                                }
                                            }
                                            else {
                                                if (returnArray) {
                                                    re.push(null);
                                                }
                                                else {
                                                    re[skinId] = null;
                                                }
                                            }
                                        }
                                    }
                                    return re;
                                },
                                // 获取所有英雄头像
                                getAllHeroPortraits: function (returnArray) {
                                    var re = {};
                                    if (returnArray) {
                                        re = [];
                                    }
                                    var tee = 0;
                                    if (tis._cache.lastGetChampsData) {
                                        for (var i = 0; i < tis._cache.lastGetChampsData.length; i++) {
                                            var campInfo = tis._cache.lastGetChampsData[i];
                                            var resultItem = {
                                                heroId: campInfo.champJSON.id,
                                                portrait: (campInfo.basePath + campInfo.champJSON.squarePortraitPath)
                                            };
                                            if (returnArray) {
                                                re.push(resultItem);
                                            }
                                            else {
                                                re[resultItem.heroId + ''] = resultItem;
                                            }
                                        }
                                    }
                                    return re;
                                },
                                // 获取英雄头像
                                getHeroPortraits: function (ids, returnArray) {
                                    var re = {};
                                    if (returnArray) {
                                        re = [];
                                    }
                                    if (ids) {
                                        for (var i = 0; i < ids.length; i++) {
                                            var heroId = ids[i] + '';
                                            var resultItem = {
                                                heroId: heroId,
                                                portrait: null
                                            };
                                            if (typeof (tis._cache.lastGetChampsDataHash[heroId]) != 'undefined') {
                                                var campInfo = tis._cache.lastGetChampsDataHash[heroId];
                                                resultItem.portrait = (campInfo.basePath + campInfo.champJSON.squarePortraitPath);
                                            }
                                            if (returnArray) {
                                                re.push(resultItem);
                                            }
                                            else {
                                                re[resultItem.heroId] = resultItem;
                                            }
                                        }
                                    }
                                    return re;
                                }
                            });
                        }
                    }
                }
            });
            tis._initChampsInfo(callback);
        },
        _initChampsInfo: function (callback) {
            var tis = this;
            //var champids = [86,22,54,37,99,24,11,5,62,21,51,1];
            var champids = [];
            for (var i in LOLherojs.champion.keys) {
                champids.push(i);
            }
            if (tis._cache.gettingChampsDataFlag == false) {
                tis._cache.gettingChampsDataFlag = true;
                tis._cache.lastGetChampsNum = champids.length;
                tis._cache.lastGetChampsCallback = callback;
                tis._cache.lastGetChampsData = [];
                for (var i = 0; i < champids.length; i++) {
                    var cid = champids[i];
                    RClientWindowMessenger.sendMessage({
                        messageType: 'rcp-fe-lol-home-champ-game-data-request',
                        data: {
                            champId: cid
                        }
                    });
                }
            }
        }
    }
}

LcuHelper.Champ.init(function (champHelper) {
    function getskin(skinid){
         var heroSkinPics = champHelper.getHeroSkinPics([skinid]);
         var heroSkinImg = heroSkinPics[skinid].uncenteredSplash;
         return heroSkinImg;
    }
    $.getJSON('//lol.qq.com/client/lcu/js/guideData.js'+ '?r=' + Math.random(),function(data) {
          $.each(data,function(key, value) {
            var datas = data;

            if (key == 'hero') {
                var heroList = [],heroHtml='';
                    $.each(value,function(index,value) {
                        var heroSkinP = champHelper.getHeroSkinPics([value.skin],true);
                        for (var i = 0; i < heroSkinP.length; i++) {
                            heroHtml +='<li><div style="background-image:url('+heroSkinP[i].title+')"></div></li>'
                         }
                        $('#heroList').html(heroHtml)
                    })
                };

            $('#heroList li').each(function(i) {
                 $(this).click(function() {
                    $('#guideVideo').hide();
                    $('#guideVideo').html('');
                    $('#raiders').show();
                    $('#raiders').html('<div class="raiders-title"><h2>'+datas.hero[i].title+'</h2><span>'+datas.hero[i].title+'</span></div><h3 class="raiders-subtitle"></h3><div class="raider-link"><a href="'+datas.hero[i].link+'" class="inlink" target="_blank" onclick="pgvSendClick({hottag:\'lcu_client.link.'+datas.hero[i].skin+'\'});">攻略</a></div><div class="raiders-bg" style="background-image:url('+getskin(datas.hero[i].skin)+')"></div>')
                    if (i == 2) {$('.raiders-bg').css({"background-position":"50%"})}
                    if (i == 3) {$('.raiders-bg').css({"background-position":"50% 20%"})}
                    if (i == 7) {$('.raiders-bg').css({"background-position":"50% 10%"})}
                     $('.inlink').click(function() {
                         //var urls = $(this).attr('data-url');
                         // RClientWindowMessenger.sendMessage({
                         //     messageType: 'rcp-fe-lol-home-open-full-page-modal',
                         //     data: {
                         //         url: urls
                         //     }
                         // });
                         RClientWindowMessenger.sendMessage({
                             messageType: 'rcp-fe-lol-home-play-sound',
                             data: {
                                 key: "button-click"
                             }
                         });
                    });

                 });
            });
            if (key == 'video') {
                var videoList = [];
                    $.each(value,function(index,value) {
                        for (var i = 0; i < heroSkinP.length; i++) {
                            heroHtml +='<li><div style="background-image:url('+heroSkinP[i].title+')"></div></li>'
                         }
                        $('#heroList').html(heroHtml)
                    })
                };
        });

    });

});
$(".outlink").click(function(){
    window.open($(this).attr('data-url'),'_blank');
    RClientWindowMessenger.sendMessage({
                             messageType: 'rcp-fe-lol-home-play-sound',
                             data: {
                                 key: "button-click"
                             }
                         });
    pgvSendClick({hottag:'lcu_client.link.outlink'});
});

$('.Guideqid').click(function() {
    $('#tooltip').fadeIn(function(){
        setTimeout(function(){$('#tooltip').fadeOut()},2000)
    });
});
