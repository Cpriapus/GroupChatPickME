var qs=function(o){return document.querySelector(o)},
show=function(o){
	var a=qs(o),
	b=qs("#cover"),
	c=document.documentElement.clientHeight;
	a.style.display="block";
	b.style.display="block";
	b.style.height=c+"px";
},
hdn=function(o){
	qs(o).style.display="none";
	qs("#cover").style.display="none";
},
chkload=function(u,s,v){
	var o=document.createElement("script");
	o.src=u;
	qs("head").appendChild(o);
	o.onload=function(){s(v);};
};
var CTips = {
	dUin : 0,
	dArea : 0,
	dNode : 0, //保存zoneid
	dTimestamp : 0,
	dAreaList : [1,7,21],
	dAreaListOpen : false,
	dSignature : '',
	dTipsStyle : 1, // 弹窗类型：1 为 幸运星， 2 为系统公告
	dTipsWidth : 900, // 幸运星 的宽
	dTipsHeight : 530, // 幸运星 的高
	dTipsNoticeWidth : 537, // 为系统公告 的宽
	dTipsNoticeHeight : 266, // 为系统公告 的高
    dTipsSmallTxt:['幸运召唤师','新手礼包','生日派对','神秘商店','战斗之夜','全球总决赛','周边商城','荣耀奖励','挑战试练塔','双倍活动'],
	dCookieDomain : 'lol.qq.com',
	dCookieTime : 3600,
	dCookieKey : 'LWC_A20130416_',
	dAreaURI : 'https://lol.qq.com/biz/tcls/LOL_TCLS_AREALIST.js',
	//dCTipsURI : 'http://apps.game.qq.com/client_pop/getLolRecommend?',
	dCTipsURI : 'https://apps.idata.qq.com/outer/client_pop/getLolRecommend?',
	init : function(config) {
		var self = CTips;

    window.addEventListener('message', function(ev){

			if (ev.data.type=='RpcsWindowMessenger'){
                console.log("[ctips_lcu_https]get message:", ev.data.type,"get message data:", ev.data.data);
				if(ev.data.data.uin && ev.data.data.zone_id){
					self.loadUserinfo(ev.data.data,function(info){
						if(self.checkArealist(info.area)) {
							self.loadTips(info);
						}
					});
				}
			}
		}, false);

        var omessage = {
            type: 'RpcsWindowMessenger',
            messageType: 'get-player-basic-info',
            sequence:Date.parse(new Date())+'_ctips_lcu_https',
        };
        console.log("[ctips_lcu_https] postMessage: ", omessage);
		window.parent.postMessage(omessage, '*');


	},
	loadCookieSet : function(sName,sValue,iExpireSec,sDomain,sPath,bSecure){
        if(sName==undefined) {return;}
        if(sValue==undefined) {sValue="";}
        var oCookieArray = [sName+"="+escape(sValue)];
        if(!isNaN(iExpireSec)){
            var oDate = new Date();
            oDate.setTime(oDate.getTime()+iExpireSec*1000);
            iExpireSec==0 ? '' : oCookieArray.push("expires=" + oDate.toGMTString()) ;
        }
        if(sDomain!=undefined){
                oCookieArray.push("domain="+sDomain);
        }
        if(sPath!=undefined){
                oCookieArray.push("path="+sPath);
        }
        if(bSecure){
                oCookieArray.push("secure");
        }
        document.cookie=oCookieArray.join("; ");
	},
	loadCookieGet : function(sName,sDefaultValue){
        var sRE = "(?:; |^)" + sName + "=([^;]*);?";
        var oRE = new RegExp(sRE);
        
        if (oRE.test(document.cookie)) {
                return unescape(RegExp["$1"]);
        } else {
                return sDefaultValue||null;
        }
	},
	loadCookieClear : function(sName, sDomain, sPath){
        var oDate = new Date();
        CTips.loadCookieGet(sName,"", -oDate.getTime()/1000, sDomain, sPath);
	},
	loadUserinfo : function(data,callback) {
		var self = CTips;
		self.dUin = data.uin;
		self.dNode = data.zone_id;
		self.dArea = LOLZoneArea.zoneToArea(data.zone_id);
		
		if(self.dUin && self.dArea ) {
			
			callback({
				'uin' : self.dUin,
				'area' : self.dArea,
				'node' : self.dNode,
				'timestamp' : "",
				'signature' : ""
			});
		}
		return false;
	},
	showHidPlayer : function(e){
/*
		if(qs("#popupNum") && "undefined"!=typeof(qs("#popupNum"))){
			var cPNUM = qs("#popupNum").getAttribute("data-num");
			if(cPNUM=="1"){
				e=="1"?showVOD():hidPlayerVOD();
			}
		}else{
			showVOD();
		}
*/
	},
	showTips : function(){
		var self = CTips;
		CTips.showHidPlayer("0");
		show("#jCtipsDiv");
		qs('#jCtipsDivSmall').style.display="none";
	},
	loadTips : function(info) {	
		var self = CTips,
		TWidth = self.dTipsWidth,
		THight = self.dTipsHeight;
		if(self.dTipsStyle==2){
			TWidth = self.dTipsNoticeWidth;
			THight = self.dTipsNoticeHeight;
		}
        
		if('object' == typeof(info)) {
			var submiturl = self.dCTipsURI +'timestamp='+info.timestamp+ '&gameid=lol&client=lcu&uin='+info.uin+'&area='+info.area+'&node='+self.dNode+'&signature='+info.signature+'&r='+Math.random();
			chkload(submiturl, function(){
                //console.log("[ctips_lcu_https]get client pop result:", clientPopResult);
				if(1 == clientPopResult.isPop) {
					var iframeSrc = clientPopResult.sUrl +'?timestamp='+info.timestamp+ '&&client=lcu&uin='+info.uin+'&area='+info.area+'&node='+self.dNode+'&signature='+info.signature+'&r='+Math.random();
                    var sTitle = clientPopResult.sTitle;
					var retHTML = '<div class="ctips_iframediv" style="width:'+TWidth+'px; height:'+THight+'px;margin: 0 auto;"><iframe class="ctips_iframe" src="'+iframeSrc+'" scrolling="no" frameborder="0" framespacing="0" width="'+TWidth+'px" height="'+THight+'px"></iframe><a class="ctips_close" href="javascript:CTips.closeTips(\''+ sTitle +'\');">&times;</a>';
					qs("#jCtipsDiv").innerHTML = retHTML;

					var cooki=self.loadCookieGet("tcls_pop");
                    console.log("[ctips_lcu_https]get TCLSCTIPS cookie:", cooki);
					if(cooki=="TCLSCTIPS=1"){
						CTips.showTips();
						self.loadCookieSet("tcls_pop","TCLSCTIPS=2",604800,"lol.qq.com","/",false);
					}else if(cooki=="TCLSCTIPS=2"){
						CTips.showTips();
						self.loadCookieSet("tcls_pop","TCLSCTIPS=3",604800,"lol.qq.com","/",false);
					}else if(cooki=="TCLSCTIPS=3"){
						CTips.showTips();
						self.loadCookieSet("tcls_pop","TCLSCTIPS=4",604800,"lol.qq.com","/",false);
					}else if(cooki=="TCLSCTIPS=4"){
            CTips.showTips();
            self.loadCookieSet("tcls_pop","TCLSCTIPS=5",604800,"lol.qq.com","/",false);
          }else if(!cooki){
						CTips.showTips();
						self.loadCookieSet("tcls_pop","TCLSCTIPS=1",604800,"lol.qq.com","/",false);
					}else{
                        CTips.closeTips(sTitle);
						CTips.showHidPlayer("1");
					}
				}
			});
		}		
	},
	closeTips : function(sTitle) {
		var self = CTips,
            retHTML = '';
        //if(type == 0){
        //    retHTML = '<a class="ctips_smalllnk" href="javascript:CTips.showTips();" style="background-image:url(http://ossweb-img.qq.com/images/lol/client/popupstar/bg.png);">Dò???ù??ê|</a>';
        //}
        //if(type == 1){
        //    retHTML = '<a class="ctips_smalllnk ctips_newlnk" href="javascript:CTips.showTips();" style="background-image:url(http://ossweb-img.qq.com/images/lol/client/popupstar/bg-pop-new.png);">D?ê?à?°ü</a>';
        //}
        //if(type == 2){
            retHTML = '<a class="ctips_smalllnk" href="javascript:CTips.showTips();">'+sTitle+'</a>';
        //}
		qs('#jCtipsDivSmall').innerHTML = retHTML;
		self.dTipsStyle==1?qs('#jCtipsDivSmall').style.display="block":qs('#jCtipsDivSmall').style.display="none";
		hdn("#jCtipsDiv");
	},
	checkArealist : function(area){		
		var self = CTips;
		if(!self.dAreaListOpen) return true;
		var flag = false;
		for(var i=0; i<self.dAreaList.length; i++) {
			if(area == self.dAreaList[i]) {
				flag = true;
			}
		}
		return flag;
	}
}
CTips.init();/*  |xGv00|3ba3f841360a267d29daaed3c831c6f0 */