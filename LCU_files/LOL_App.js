/** 拉起掌盟 **/
var CommApp_QT = {
	sPlat: "",
	bIsAppInstalled: false,
	bIsMobile: false,
	//功能描述：检查打开web页面的平台（QQ,WX,APP）
	//参数描述：
	//sAppTarget    APP特有的标记,CF:cfapp,LOL:lolapp
	//callBack  获取到对应平台后需要执行的方法
	CheckPlat: function(sAppTarget, callBack) {
		if (new RegExp(' QQ/').test(navigator.userAgent)) {
			this.sPlat = "QQ";
			callBack();
			return "QQ";
		}
		if (new RegExp(sAppTarget).test(navigator.userAgent)) {
			this.sPlat = "APP";
			callBack();
			return "APP";
		}
		if (navigator.userAgent.match("MicroMessenger")) {
			this.sPlat = "WX";
			callBack();
			return "WX";
		}
		if (/weibo/i.test(navigator.userAgent)) {
			this.sPlat = "WEIBO";
			callBack();
			return "WEIBO";
		}
		if (typeof(HostApp) != "undefined" || milo.cookie.get('djc_appVersion') != null) {
			this.sPlat = "DJC";
			callBack();
			return "DJC";
		}
		if (milo.cookie.get('lcu_client') != null) {
			this.sPlat = "LCU";
			callBack();
			return "LCU";
		}
		this.sPlat = "Browser";
		callBack();
		return "Browser";
	},

	//功能描述：从QQ检查APP的安装状态
	//参数描述：
	//sPackageName  包名，类似于 com.tencent.qt.qtl
	//sAppIdForQQ   手Q的APPID，类似于 tencent100543809
	//callBackInstalled 检查到已经安装APP后执行的方法
	//callBackNotInstall    检查到未安装APP后执行的方法
	CheckAppInstallForQQ: function(sPackageName, sAppIdForQQ, callBackInstalled, callBackNotInstall) {
		//android
		if (navigator.userAgent.match(/android/i)) {

			var value = sPackageName;

			mqq.app.isAppInstalled(value, function(result) {

				if (result) {
					this.bIsAppInstalled = true;

					callBackInstalled();

				} else {
					callBackNotInstall();
				}
			});
		}

		//IOS
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			var value = sAppIdForQQ;
			mqq.app.isAppInstalled(value, function(result) {

				if (result) {
					this.bIsAppInstalled = true;
					callBackInstalled();
				} else {
					callBackNotInstall();
				}
			});
		}
	},

	//功能描述：从微信检查APP是否安装
	//参数描述：
	//sAppIdForWX   APP在微信平台的ID，类似于：wx5a4a8ac0fd48303a
	//sPackageName  APP的包名，类似于：com.tencent.qt.qtl
	//extInfo   附带信息，类似于：from=webview&type=requestApp&icon=....
	//iBaseVersion APP的版本号，低于该版本号，则认为没有安装APP
	CheckAppInstallForWX: function(sAppIdForWX, sPackageName, extInfo, iBaseVersion, callBackInsatalled, callBackNotInstall) {

		WeixinJSBridge.invoke("getInstallState", {
			"packageUrl": sAppIdForWX + "://" + "?" + extInfo,
			"packageName": sPackageName
		}, function(res) {

			if (res.err_msg.substring(0, 21) == "get_install_state:yes") {
				this.bIsAppInstalled = true;
			} else if (res.err_msg == "get_install_state:yes") {
				this.bIsAppInstalled = true;
			} else if (res.err_msg == "get_install_state:no") {
				this.bIsAppInstalled = false;
			} else {
				alert(res.err_msg);
			}

			if (iBaseVersion > 0) {
				if (res.err_msg.length > 22) {
					var iVersion = parseInt(res.err_msg.substring(22, res.err_msg.length));
					if (iVersion < iBaseVersion) {
						this.bIsAppInstalled = false;
					}
				}
			}


			if (this.bIsAppInstalled) {
				callBackInsatalled();
			} else {
				callBackNotInstall();
			}
		});
	},
	//功能描述：从QQ打开APP
	//参数描述：
	//sPackageName  包名
	//sAppIdForQQ   APP在手Q上的ID
	LaunchAppFromQQ: function(sPackageName, qqappID, sExtInfo, qqlanchflags) {
		//android
		if (navigator.userAgent.match(/android/i)) {
			mqq.app.launchAppWithTokens({
				appID: qqappID,
				paramsStr: 'intent=' + encodeURIComponent('qtpage://news_detail?url=' + encodeURIComponent(location.href)),
				packageName: sPackageName,
				flags: qqlanchflags
			});
		}
		//IOS
		var ua = navigator.userAgent;
		var iosversion = ua.match(/OS (\d+)_\d[_\d]* like Mac OS X/i)[1] || 0;
		if (iosversion >= 9) {
			if (sExtInfo) {
				location.href = 'mlolapp://jump_page?intent=' + encodeURIComponent('qtpage://news_detail?url=' + encodeURIComponent(location.href));
			} else {
				location.href = 'mlolapp://jump_page?intent=';
			}
		} else {
			mqq.app.launchAppWithTokens({
				appID: qqappID,
				paramsStr: sExtInfo,
				packageName: sPackageName,
				flags: qqlanchflags
			});
		}
	},
	//功能描述：从微信打开APP
	//参数描述：
	//sAppIdForWX APP在微信平台的APPID
	//sMessageExt 附加信息，一般填空
	//sExtInfo  附加信息，打开APP以后传递给APP的参数
	LaunchAppFormWX: function(sAppIdForWX, sMessageExt, sExtInfo) {
		WeixinJSBridge.invoke(
			'launch3rdApp', {
				'appID': sAppIdForWX,
				'messageExt': sMessageExt,
				'extInfo': sExtInfo
			},
			function(res) {
				//alert(res.err_msg); 
			});
	},
	BlockPC: function(callBackMobile, callBackPC) {
		//LOL APP :http://lol.qq.com/app/pcopen.shtml
		//CF APP:  http://cf.qq.com/app/act/a20140918handcf/expand.htm
		if (navigator.userAgent.match(/android/i)) {

			this.bIsMobile = true;
		}

		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			this.bIsMobile = true;
		}

		if (new RegExp('cfapp').test(navigator.userAgent)) {
			this.bIsMobile = true;
		}

		if (new RegExp('lolapp').test(navigator.userAgent)) {
			this.bIsMobile = true;
		}

		if (this.bIsMobile) {
			callBackMobile();
		} else {
			callBackPC();
		}
	}
}

/** 判断是否掌盟 **/
var CheckApp = {
	Is_App: false,
	Is_Installed: null,
	Is_Plat: '',
	DownLoadAPP: location.protocol + "//lol.qq.com/app/m/select_app.shtml",
	CurrentUrl: '',
	Is_System: '',
	sAppIdForQQ: "mlolapp",
	sAppIdForWX: "wx5a4a8ac0fd48303a",
	sPackageName: "com.tencent.qt.qtl",
	qqlanchflags: '67108864',
	qqappID: '100543809',
	iBaseVersion: 322,
	sAppTarget: "lolapp",
	extInfo: '',
	messageExt: "",
	iVersion: 0,
	iSubversion: 0,
	init: function() {
		var self = CheckApp;
		self.CurrentUrl = location.href;
		self.CheckIsMoblie();
		var param = $.param({
			from: 'webview',
			type: 'requestApp',
			is_act: 1,
			url: self.CurrentUrl,
			intent: 'qtpage://news_detail?url=' + encodeURIComponent(self.CurrentUrl)
		});
		self.extInfo = encodeURIComponent(param);
		self.messageExt = encodeURIComponent(param);
		self.CheckApp();
		//android
		if (navigator.userAgent.match(/android/i)) {
			self.Is_System = "android"
		}
		//IOS
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			self.Is_System = "ios"
		}
		CommApp_QT.CheckPlat(self.sAppTarget, self.HandlerPlatChecked);
		if (milo.request('is_call') == 1) {
			self.Call_Up();
		}

	},
	CheckIsMoblie: function() {
		var bIsMobile = false;
		if (navigator.userAgent.match(/android/i)) {
			bIsMobile = true;
		}
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			bIsMobile = true;
		}
		if (!bIsMobile) {
			//window.location.href="http://qt.qq.com/act/a20141218lolpc/index.shtml";   
		}
	},
	HandlerPlatChecked: function() {
		var self = CheckApp;
		if (CommApp_QT.sPlat == "QQ") {
			self.Is_Plat = 'QQ';
			CommApp_QT.CheckAppInstallForQQ(self.sPackageName, self.sAppIdForQQ, self.HandlerAppInstalled, self.HandlerAppNotInstalled);
		}
		if (CommApp_QT.sPlat == "WX") {
			self.Is_Plat = 'WX';
			self.CheckAppInstallForWX();
		}
		if (CommApp_QT.sPlat == "APP") {
			self.Is_Plat = 'ZM';
		}
		if (CommApp_QT.sPlat == "WEIBO") {
			self.Is_Plat = 'WEIBO';
		}
		if (CommApp_QT.sPlat == "DJC") {
			self.Is_Plat = 'DJC';
		}
		if (CommApp_QT.sPlat == "LCU") {
			self.Is_Plat = 'LCU';
		}
		if (CommApp_QT.sPlat == "Browser") {
			self.Is_Plat = 'Browser';
			self.HandlerAppNotInstalled();
		}
	},
	CheckAppInstallForWX: function() {
		var self = CheckApp;
		document.addEventListener('WeixinJSBridgeReady', function() {
			CommApp_QT.CheckAppInstallForWX(self.sAppIdForWX, self.sPackageName, self.extInfo, self.iBaseVersion, self.HandlerAppInstalled, self.HandlerAppNotInstalled);
		}, false);
	},
	HandlerAppInstalled: function() {
		var self = CheckApp;
		self.Is_Installed = true;
		$("#know").html("去掌盟");

		if (CommApp_QT.sPlat == "QQ") {
			$("#know").attr("href", "javascript:CommApp_QT.LaunchAppFromQQ('" + self.sPackageName + "','" + self.qqappID + "','" + self.extInfo + "','" + self.qqlanchflags + "')");
		}
		if (CommApp_QT.sPlat == "WX") {
			$("#know").attr("href", "javascript:CommApp_QT.LaunchAppFormWX('" + self.sAppIdForWX + "','" + self.messageExt + "','" + self.extInfo + "')");
		}
	},
	HandlerAppNotInstalled: function() {
		var self = CheckApp;
		self.Is_Installed = false;
		$("#know").html("去下载");
		$("#know").attr("href", self.DownLoadAPP);
	},
	CheckApp: function() {
		var self = CheckApp;
		if (new RegExp('MicroMessenger/5.0.3.354').test(navigator.userAgent)) {
			self.Is_App = true;
			return;
		}
		if (milo.request('android_version')) {
			self.Is_App = true;
			return;
		}
		if (new RegExp('lolapp').test(navigator.userAgent)) {
			self.iVersion = parseFloat(navigator.userAgent.match(/lolapp\/\d+.\d+/)[0].replace('lolapp/', ''));
			self.iSubversion = navigator.userAgent.match(/lolapp\/\d+.\d+.\d+/)[0].replace('lolapp/', '').split('.')[2];
			self.Is_App = true;
			return;
		}
		if (typeof(HostApp) != "undefined" || milo.cookie.get('djc_appVersion') != null) {
			self.Is_App = true;
			return;
		}
	},
	Call_Up: function() {
		var self = CheckApp;
		var timer = setInterval(function() {
			if (self.Is_Installed) {
				clearInterval(timer);
				if (!self.Is_App) {
					if (self.Is_Plat == "QQ") {
						var a = document.createElement('a');
						a.href = "javascript:CommApp_QT.LaunchAppFromQQ('" + self.sPackageName + "','" + self.qqappID + "','" + self.extInfo + "','" + self.qqlanchflags + "')";
						var body = document.getElementsByTagName('body').item(0);
						body.appendChild(a);
						a.click();
					}
					if (self.Is_Plat == "WX") {
						var a = document.createElement('a');
						a.href = "javascript:CommApp_QT.LaunchAppFormWX('" + self.sAppIdForWX + "','" + self.messageExt + "','" + self.extInfo + "')";
						var body = document.getElementsByTagName('body').item(0);
						body.appendChild(a);
						a.click();
					}
				}
			}
		}, 200);
	}
};
// milo.ready(function() {
//    CheckApp.init();
// });
CheckApp.init();


/** 掌盟分享 **/
var config_data = {
	'share': {
		'title': '',
		'summery': '',
		'subtitle': '',
		'img': '',
		'url': '',
		'act': ''
	},
	'comment': '',
	'aritcleid': '',
	'video': {
		'vid': '',
		'imgurl': '',
		'title': ''
	}
};
var g_data = {};
var G_Soruce = '';
var qtshare;
var lolapp_Share_CallBack = null;

function init_ZMApp(data) {
	if (data.title && data.summery && data.img && data.url) {
		config_data.share.title = data.title;
		config_data.share.summery = data.summery;
		config_data.share.img = data.img;
		config_data.share.url = data.url;
	} else {
		loadScript(location.protocol + "//lol.ams.game.qq.com/CGA/CommShare?p0=" + CheckApp.Is_Plat + "&p1=" + encodeURIComponent(location.href) + "&r1=shareInfo", function() {
			if (shareInfo.status == 0 && shareInfo.msg != "") {
				data.title = shareInfo.msg.sTitle;
				data.summery = shareInfo.msg.sDesc;
				data.img = shareInfo.msg.sImg;
				data.url = shareInfo.msg.sUrl ? shareInfo.msg.sUrl : location.href;
			} else {
				data.title = document.title;
				data.summery = document.title;
				data.img = location.protocol + "//ossweb-img.qq.com/images/lol/appskin/89008.jpg";
				data.url = location.href;
			}
			init_ZMApp(data)
		})
		return
	}
	if (data.comment) {
		config_data.comment = data.comment;
	}
	if (data.subtitle) {
		config_data.subtitle = data.subtitle;
	}
	if (data.aritcleid) {
		config_data.aritcleid = data.aritcleid;
	}
	if (data.vid && data.imgurl && data.title) {
		config_data.video.vid = data.vid;
		config_data.video.imgurl = data.imgurl;
		config_data.video.title = data.title;
	}
	g_data = {
		'title': encodeURIComponent(config_data.share.title),
		'content': encodeURIComponent(config_data.share.summery),
		'thumb_url': encodeURIComponent(config_data.share.img),
		'url': encodeURIComponent(config_data.share.url)
	};
	if (G_Soruce != '') {
		qtconfig(G_Soruce);
	}
	qtshare = function(soruce) {
		if (data.LOL_APPsuccess) {
			lolapp_Share_CallBack = function(res) {
				data.LOL_APPsuccess(res);
			}
			if (soruce != 'lolapp_my' && soruce != 'favor' && soruce != 'lolapp_neshrine') {
				lolapp_Share_CallBack(soruce);
			}
		}
		if (soruce == "wx_timeline") {
			window.location.href = "qtshare://" + soruce + "?title=" + g_data.title + "&content=" + g_data.content + "&thumb_url=" + g_data.thumb_url + "&url=" + g_data.url;
		} else {
			window.location.href = "qtshare://" + soruce + "?title=" + g_data.title + "&content=" + g_data.content + "&thumb_url=" + g_data.thumb_url + "&url=" + g_data.url;
		}
	}
	onBridgeReady(data);
	if (CheckApp.Is_Plat == 'DJC') {
		// var timer = setInterval(function(){
		//     if(typeof(HostApp) != "undefined"){
		//         alert(123);
		//         HostApp._registerShareInfo = 'title='+encodeURIComponent(config_data.share.title)+'&content='+encodeURIComponent(config_data.share.summery)+'&pic='+encodeURIComponent(config_data.share.img)+'&share_url='+encodeURIComponent(config_data.share.url);
		//     }
		// },200);
		setTimeout(function() {
			var url = location.protocol + '//' + encodeURIComponent(config_data.share.url.split("://")[1]);
			//alert(url);

			HostApp._registerShareInfo = 'title=' + config_data.share.title + '&content=' + config_data.share.summery + '&pic=' + encodeURIComponent(config_data.share.img) + '&share_url=' + url + '&type=1,2,3,4,5,6';
		}, 1000);
	}
}

function launchShareWindow() {
	window.location.href = config_data.share.url + "?type=requestApp&title=" + encodeURIComponent(config_data.share.title) + "&summary=" + encodeURIComponent(config_data.share.summery) + "&is_act=1&url=" + config_data.share.url + "&icon=" + config_data.share.img;
}

function qtconfig(soruce) {
	G_Soruce = soruce;
	subtitle = config_data.subtitle ? config_data.subtitle : '资讯详情';
	var tj = "qtconfig://" + soruce + "?title=" + encodeURIComponent(subtitle);
	//var tj = "qtconfig://config_info?title=" + encodeURIComponent(subtitle);
	var str = {
		"share": ["qq", "wx", "lolfriend", "weibo"],
		"sharetype": "url"
	};
	var commentinfo = {
		"commentid": config_data.comment,
		'aritcleid': config_data.aritcleid
	};
	//var herotimeinfo = {"uuid":"df1ed715-8ed4-49df-9e7e-80c26360e924","vid":"100600702"};
	var video_list = {};
	var tlist = [{
		vid: config_data.video.vid,
		imgurl: config_data.video.image_url
	}];
	video_list["title"] = config_data.video.title;
	video_list["list"] = tlist;
	console.log(config_data.share.title);
	console.log(config_data.share.summery);
	console.log(config_data.share.img);
	if (config_data.share.title != '' && config_data.share.summery != '' && config_data.share.img != '' && config_data.share.url != '') {
		tj += "&share=" + encodeURIComponent(JSON.stringify(str));
	}
	if (config_data.comment != '') {
		tj += "&comment=" + encodeURIComponent(JSON.stringify(commentinfo));
	}
	if (config_data.video.title != '' && config_data.video.vid != '' && config_data.video.imgurl != '') {
		tj += "&video=" + encodeURIComponent(JSON.stringify(video_list));
	}

	window.location.href = tj;
}
/** 微信手Q分享 **/
function onBridgeReady(data) {
	need("biz.mobileclient", function(mClient) {
		var obj = {
			//wx_appid: 'wxb30cf8a19c708c2a', //微信appid
			wx_appid: 'wx0abed84681090cfd', //微信appid
			title: config_data.share.title, // 分享标题，默认为活动页面标题（可手动调整）
			desc: config_data.share.summery, //分享活动简介
			link: config_data.share.url, //分享链接
			imgUrl: config_data.share.img, //分享后朋友看到的图标
			WXtrigger: function(res) { //微信点击事件回调
				if (data.WXtrigger) {
					data.WXtrigger(res);
				}
			},
			WXsuccess: function(res) { //微信分享成功回调
				if (data.WXsuccess) {
					data.WXsuccess(res);
				}
			},
			WXcancel: function(res) { //微信分享取消回调
				if (data.WXcancel) {
					data.WXcancel(res);
				}
			},
			WXfail: function(res) { //微信分享失败回调
				if (data.WXfail) {
					data.WXfail(res);
				}
			},
			QQtrigger: function(res) {
				if (data.QQtrigger) {
					data.QQtrigger(res);
				}
			},
			QQcallback: function(res) {
				if (data.QQcallback) {
					data.QQcallback(res);
				}
			}
		};
		console.log(obj)
		mClient.shareAll(obj);
	});
};

function LoadJS(url, callback) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = url;
	var done = false;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
			done = true;
			callback();
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		}
	};
	head.appendChild(script);
}

var QTVideoChat = {
	init: function(vc) {
		var self = QTVideoChat
		if (vc.modId && vc.channelId && vc.width && vc.height) {
			self.qtLive(vc.modId, vc.channelId, vc.width, vc.height)
		}
		if (vc.boxId && vc.roomId && vc.sendBtn && vc.contentId) {
			window["G_VodBattleFunc"] = {};
			window["G_VodBattleFunc2"] = {};
			window["G_VodBattleFunc3"] = {};
			include([location.protocol + "//lpl.qq.com/web201612/js/app/seeding_chart.js", location.protocol + "//lpl.qq.com/web201612/js/dist/seeding_bundle.js"], function() {
				// 聊天室初始化
				chat.init({
					// obj结构：{nick/*昵称*/,time/*时间戳*/,str/*聊天信息原始串*/,formatStr/*聊天信息格式化串（表情替换及html格式化）*/,barrageStr/*用于传给qt视频播放器的弹幕数据结构*/,isSelf/*是否自己发的消息*/}
					chatMsgCallback: function(obj) { // 聊天广播消息
						self.addChat(obj, vc);
					},
					errorCallback: function(obj) { // flash出错回调
						var box = $("#" + vc.boxId);
						box.append('<li class="chat-item chat-tips">' + obj.msg + '</li>');
					}
				});
				chat.joinRoom(vc.roomId);
				// 发言按钮
				$("#" + vc.sendBtn).click(function() {
					self.sendMessage(vc);
				});
				// 回车发言
				$('#' + vc.contentId).keydown(function(e) {
					if (e.keyCode == 13) {
						self.sendMessage(vc);
					}
				});
			})
		}
	},
	sendMessage: function(vc) {
		need(["biz.login"], function(LoginManager) {
			LoginManager.checkLogin(function() {
				var msg = $.trim($("#" + vc.contentId).val());
				if (!msg) {
					return false;
				}
				$("#" + vc.contentId).val("");
				chat.sendChatMsg(msg, function(ret) {
					if (ret.errno != 0) {
						if (ret.errno == 90100) {
							LoginManager.login();
						} else {
							var box = $("#" + vc.boxId);
							box.append('<li class="chat-item chat-tips">' + ret.msg + '</li>');
						}
					}
				});
				return false;
			}, function() {
				LoginManager.login();
			});
		});
	},
	addChat: function(obj, vc) {
		var box = $("#" + vc.boxId),
			tTimer = null,
			chat = $("#" + vc.boxId).parent(),
			sHtml = '';
		var d = new Date(+obj.time * 1000);
		var datetime = date("Y-m-d H:i:s")
		if (obj.isSelf) {
			sHtml += '<li class="chat-item chat-me">';
		} else {
			sHtml += '<li class="chat-item">';
		}
		sHtml += ''
		sHtml += '<div class="chat-detail"><span>' + obj.nick + '：</span>' + '<p>' + obj.formatStr + '</p>' + '<i class="index-spr"></i>' + '</div>' + '</li>';
		box.append(sHtml);
		var boxheight = box.height();
		if (boxheight >= 510) {
			chat.css({
				"overflow-y": "scroll"
			})
		}
		chat.scrollTop(chat[0].scrollHeight);
		// 保留100条聊天记录
		var lis = $("#" + vc.boxId + " li");
		if (lis.length > 100) {
			if (navigator.userAgent.indexOf('MSIE') >= 0) {
				lis[0].removeNode(true);
			} else {
				lis[0].remove();
			}
		}
		// qt直播弹幕 ifrVideo是QT播放器的iframe id
		var objVideo = window.ifrVideo && (window.ifrVideo.window || window.ifrVideo.contentWindow);
		if (objVideo && vc.openBarrage !== false) {
			objVideo.AddLiveBarrage(obj.barrageStr); // 视频弹幕
		}
	},
	qtLive: function(modId, channelId, width, height) {
		var iframesrc = location.protocol + '//qt.qq.com/zhibo/index.html?tag=' + channelId + '&ADTAG=zhibo.inner.lolweb.match2&usebarrage=1';
		$("#" + modId).html('<iframe id="ifrVideo" frameborder="0" scrolling="no" width="' + width + '" height="' + height + '" src="' + iframesrc + '"></iframe>')
	}
} /*  |xGv00|c0f120227e53983917ad422094ff1aea */

var lolapp = {
	dialog: {
		maskId: '__cimi_dialog_mask',
		curTarget: null,
		show: function(elmId) {
			var target = document.getElementById(elmId),
				that = this;

			var maskElm = document.createElement('div');
			maskElm.id = that.maskId;
			maskElm.style.cssText = 'position:fixed;top:0;left:0;background: #000;width:100%;height:100%;z-index:9998;opacity: 0.7;filter:alpha(opacity=70)';

			if (that.curTarget) {
				that.curTarget.removeAttribute('style');
				that.curTarget.style.cssText = 'display:none';
			}
			if (!document.getElementById(that.maskId)) {
				document.body.appendChild(maskElm);
			}
			target.style.cssText = 'position:fixed;display:block;left:50%;top:50%;z-index:9999';
			target.style.marginLeft = '-' + (target.offsetWidth / 2) + 'px';
			target.style.marginTop = '-' + (target.offsetHeight / 2) + 'px';
			that.curTarget = target;
		},
		close: function() {
			var maskElm = document.getElementById(this.maskId);
			if (maskElm) maskElm.parentNode.removeChild(maskElm);

			if (this.curTarget) {
				this.curTarget.style.display = 'none';
				this.curTarget = null;
			}
		}
	}
}