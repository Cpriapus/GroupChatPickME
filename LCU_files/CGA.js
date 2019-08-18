var CGA = {
	ReportURI: "//apps.game.qq.com/daoju/v3/dcrpt/ping",
	SubmitURI: "//lol.ams.game.qq.com/CGA_v1/",
	StorageKey: "UserData",
	UserFriendKey: "UserFriend",
	CheckWhiteKey: "CheckWhite",
	dCookieKey: 'LOL_CGA_Lottery_',
	dCookieTime: 86400,
	iUin: 0,
	iArea: 0,
	iChangeArea: 0,
	iLevel: 0,
	iAccountId: 0,
	dClickLock: true,
	iAction: 0,
	dActionObj: [],
	iPage: 1,
	G_UnLock: true,
	dLoadImg: true,
	init: function() {},
	PageShare: function(iActId, iTaskId) {
		var self = CGA;
		need("biz.login", function(LoginManager) {
			LoginManager.checkLogin(function() {
				var param = $.param({
					'p0': CheckApp.Is_Plat,
					'p1': iActId,
					'p2': iTaskId,
					'p3': 'Register',
					'r1': 'shareData',
					'r': Math.random()
				})
				loadScript(self.SubmitURI + "ExecShare?" + param, function() {
					if (shareData.status == 0) {
						alert('分享成功！')
					} else {
						alert(JSON.stringify(shareData))
					}
				})
			}, function() {
				LoginManager.login(function() {
					window.location.reload();
				});
			});
		});
	},
	DoLottery: function(iActId, iTaskId, iPackageId) {
		var self = CGA;
		if (!iActId || !iTaskId) {
			alert('抱歉！参数有误！')
		}
		self.BindArea(function() {
			if (self.dClickLock) {
				self.dClickLock = false;
				var param = $.param({
					'p0': CheckApp.Is_Plat,
					'p1': iActId,
					'p2': iTaskId,
					'p3': self.iArea,
					'p4': iPackageId ? iPackageId : '',
					'r1': 'ReceiveData',
					'r': Math.random()
				})
				loadScript(self.SubmitURI + "ExecTask?" + param, function() {
					self.dClickLock = true;
					if (ReceiveData.status == 0) {
						alert('领取成功！游戏道具将在24小时内发放，请耐心等待！')
					} else {
						alert(JSON.stringify(ReceiveData))
					}
				})
			}
		})
	},
	InviteList: function(iActId, iTaskId, inviteType) {
		var self = CGA;
		self.BindArea(function() {
			var param = $.param({
				'p0': CheckApp.Is_Plat,
				'p1': self.iArea,
				'p2': inviteType,
				'r1': 'inviteListData',
				'r': Math.random()
			})
			loadScript(self.SubmitURI + "QueryInviteList?" + param, function() {
				if (inviteListData.status == 0) {
					$("#InviteList").html(template('InviteListTemp', inviteListData.msg));
					$("#GameInvite a").attr('onclick', 'CGA.DoInvite(' + iActId + ',' + iTaskId + ')')
					CommTool.ShowDia($('#GameInvite'), ['800px', '500px'], "好友列表");
				} else {
					alert(JSON.stringify(inviteListData.msg))
				}
			})
		})
	},
	DoInvite: function(iActId, iTaskId) {
		var self = CGA;
		var invite = [];
		$('#InviteList :checkbox:checked').each(function() {
			invite.push($(this).val())
		})
		if (invite.length == 0) {
			alert("请选择邀请的好友！")
		}
		self.BindArea(function() {
			var param = $.param({
				'p0': CheckApp.Is_Plat,
				'p1': iActId,
				'p2': iTaskId,
				'p3': self.iArea,
				'p4': invite.join(','),
				'r1': 'inviteData',
				'r': Math.random()
			})
			loadScript(self.SubmitURI + "ExecInvite?" + param, function() {
				if (inviteData.status == 0) {
					alert('您已成功邀请了' + inviteData.msg + "个好友（已邀请过的好友无法重复邀请）")
					$('#InviteList :checkbox').attr('checked', false)
				} else {
					alert(JSON.stringify(inviteData.msg))
				}

			})
		})
	},
	UserPackage: function(iActId) {
		var self = CGA;
		need("biz.login", function(LoginManager) {
			LoginManager.checkLogin(function() {
				loadScript(self.SubmitURI + "ExecPackage?p0=" + CheckApp.Is_Plat + "&p1=" + iActId + "&r1=PackageInfo", function() {
					if (PackageInfo.status == 0) {
						if (PackageInfo.msg.length > 0) {
							for (var x in PackageInfo.msg) {
								PackageInfo.msg[x]['iActId'] = iActId
								PackageInfo.msg[x]['sArea'] = LOLServerSelect.zoneToName(PackageInfo.msg[x]['iArea'])
								PackageInfo.msg[x]['vItemName'] = PackageInfo.msg[x]['vItemType'] == 1 || PackageInfo.msg[x]['vItemType'] == 2 ? RALFSHEN_LOLHeroAndSkin[PackageInfo.msg[x]['vItemCode']] + "(" + (PackageInfo.msg[x]['iDuration'] == 0 ? '永久' : '7天') + ")" : PackageInfo.msg[x]['vItemName'];
							}
							$("#sPackageList").html(template('sPackageListTemp', PackageInfo));
						}
						CommTool.ShowDia($('#UserPackage'), ['800px', '500px'], "领取记录");
					} else {
						alert(JSON.stringify(PackageInfo.msg))
					}
				})
			}, function() {
				LoginManager.login(function() {
					window.location.reload();
				});
			});
		});
	},
	DoReceive: function(iActId, vSerialNo) {
		var self = CGA;
		layer.closeAll();
		self.ChangeArea(function(iArea) {
			if (self.dClickLock) {
				self.dClickLock = false
				loadScript(self.SubmitURI + "ExecReceive?p0=" + CheckApp.Is_Plat + "&p1=" + iActId + "&p2=" + iArea + "&p3=" + vSerialNo + "&r1=ReceiveObj", function() {
					self.dClickLock = true
					if (ReceiveObj.status == 0) {
						alert('领取成功！游戏道具将在24小时内发放，请耐心等待！')
					} else {
						alert(JSON.stringify(ReceiveObj.msg))
					}
				})
			}
		})
	},
	BindArea: function(callback) {
		var self = CGA;
		need("biz.login", function(LoginManager) {
			LoginManager.checkLogin(function() {
				var cookieKey = self.dCookieKey + self.iUin;
				var cookieValue = milo.cookie.get(cookieKey);
				if (cookieValue && callback) {
					self.iArea = cookieValue.split('|')[0];
					self.sRoleName = cookieValue.split('|')[1];
					self.iLevel = cookieValue.split('|')[2];
					self.iAccountId = cookieValue.split('|')[3];
					self.iExp = cookieValue.split('|')[4];
					callback();
				} else {
					need(["biz.roleselector", "util.object"], function(RoleSelector, jo) {
						RoleSelector.init({
							'gameId': 'lol',
							'submitEvent': function(roleObject) {
								self.iArea = roleObject.submitData['areaid'];
								self.sRoleName = roleObject.submitData['rolename'];
								self.iLevel = milo.unSerialize(query_role_result.data)["summonerLevel"];
								self.iAccountId = milo.unSerialize(query_role_result.data)["accountId"];
								self.iExp = milo.unSerialize(query_role_result.data)["expPoints"];
								var cookieKey = self.dCookieKey + roleObject.submitData['roleid'];
								milo.cookie.set(cookieKey, self.iArea + "|" +
									self.sRoleName + "|" + self.iLevel + "|" + self.iAccountId + "|" + self.iExp, self.dCookieTime, "qq.com", "/", false);
								$('#noBind').hide();
								$('#area_info').html(LOLServerSelect.zoneToName(self.iArea)).show();
								$('#isBind').show();
								$('.area span').html("“" + LOLServerSelect.zoneToName(self.iArea) + "”");
								alert('大区绑定成功！当前绑定大区【' + LOLServerSelect.zoneToName(self.iArea) + '】')
								if (self.BindAreaCallback) {
									self.BindAreaCallback()
								}
							}
						});
						RoleSelector.show();
					});
				}
			}, function() {
				LoginManager.login(function() {
					window.location.reload();
				});
			});
		});
	},
	ChangeArea: function(callback) {
		var self = CGA;
		need("biz.login", function(LoginManager) {
			LoginManager.checkLogin(function() {
				need(["biz.roleselector", "util.object"], function(RoleSelector, jo) {
					RoleSelector.init({
						'gameId': 'lol',
						'submitEvent': function(roleObject) {
							callback(roleObject.submitData.areaid)
						}
					});
					RoleSelector.show();
				});
			}, function() {
				LoginManager.login(function() {
					window.location.reload();
				});
			});
		});
	},
	CheckHeroSkin: function(vItemType, vItemCode) {
		var self = CGA;
		self.BindArea(function() {
			var param = $.param({
				'p0': CheckApp.Is_Plat,
				'p1': self.iArea,
				'p2': vItemType == 1 ? vItemCode : '',
				'p3': vItemType == 2 ? vItemCode : '',
				'r1': 'CheckIsOwn'
			})
			loadScript(self.SubmitURI + "QueryHeroSkin?" + param, function() {
				if (CheckIsOwn.status == 0) {
					if (CheckIsOwn.msg[vItemCode] == 1) {
						alert('已拥有')
					} else {
						alert('尚未拥有')
					}
				} else {
					alert(JSON.stringify(inviteData.msg))
				}
			})
		})
	},
	LoadJSONData: function(url, success, error) {
		$.ajax({
			url: url,
			dataType: 'jsonp',
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				success(data)
			},
			error: function(jqXHR, textStatus, errorThrown) {
				/*弹出jqXHR对象的信息*/
				if (error) {
					error(jqXHR, textStatus, errorThrown)
				}
			}
		});
	}
}/*  |xGv00|ade3d59f136bd88ae13476f499dcafaa */