var helper = new ClientHelper(true);
helper.getUserInfo(info => {

    CGA.iArea = LOLZoneArea.zoneToArea(info.zone_id);
    CGA.iUin = info.uin;
    
    helper.initLogin();

    helper.checkLogin(() => {

    }, () => {
        helper.login(function(){
        	
        });
    });
});

// 立即领取
// iActId : 活动ID（231）
// iTaskId : 任务ID（11013）
// iPackageId : 领取的礼包ID
function EloDiff (iActId, iTaskId,type) {
	var self = CGA;
	if (!iActId || !iTaskId) {
		return;
	}
	if (self.dClickLock) {
		self.dClickLock = false;
		var param = $.param({
			'p0': CheckApp.Is_Plat,	// 来源渠道（默认方法）
			'p1': iActId,			// 活动ID
			'p2': iTaskId,			// 任务ID
			'p3': self.iArea,		// 大区
			'p4': '',	// 领取的礼包ID,如果是挖掘合成，则传入需要合成的流水号，多个流水号之间用逗号“,”隔开
			'p5': '0', 				// 如果是挖掘支付抽奖 0:如果挖掘返回抽取道具可能是重复时会退出确认 1:确认可能抽出重复道具的抽奖
			'sExt4': '',			// 扩展字段
			'sExt5': '',			// 扩展字段
			'sExt6': '',			// 扩展字段
			'sExt7': ''				// 扩展字段
		})
		self.LoadJSONData(self.SubmitURI + "ExecTask?" + param, function(data) {
			self.dClickLock = true;
			console.log(data);
			if(type == 'link'){
				window.location.href='https://lol.qq.com/client/lcu/page/returnguide/index.html?zone-id='+zoneid;
			}else if(type == 'dialog'){
				closeModal()
			}
		})
	}
}


function bindClick(type){
	var now = milo.getSeverDateTime().getTime();
   var starttime = new Date('2019/03/31 18:00:00').getTime();
   if(now > starttime){
		EloDiff(343,12072,type);
   }	else {
   	if(type == 'link'){
				window.location.href='https://lol.qq.com/client/lcu/page/returnguide/index.html?zone-id='+zoneid;
			}else if(type == 'dialog'){
				closeModal()
			}
   }
}
