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

// ������ȡ
// iActId : �ID��231��
// iTaskId : ����ID��11013��
// iPackageId : ��ȡ�����ID
function EloDiff (iActId, iTaskId,type) {
	var self = CGA;
	if (!iActId || !iTaskId) {
		return;
	}
	if (self.dClickLock) {
		self.dClickLock = false;
		var param = $.param({
			'p0': CheckApp.Is_Plat,	// ��Դ������Ĭ�Ϸ�����
			'p1': iActId,			// �ID
			'p2': iTaskId,			// ����ID
			'p3': self.iArea,		// ����
			'p4': '',	// ��ȡ�����ID,������ھ�ϳɣ�������Ҫ�ϳɵ���ˮ�ţ������ˮ��֮���ö��š�,������
			'p5': '0', 				// ������ھ�֧���齱 0:����ھ򷵻س�ȡ���߿������ظ�ʱ���˳�ȷ�� 1:ȷ�Ͽ��ܳ���ظ����ߵĳ齱
			'sExt4': '',			// ��չ�ֶ�
			'sExt5': '',			// ��չ�ֶ�
			'sExt6': '',			// ��չ�ֶ�
			'sExt7': ''				// ��չ�ֶ�
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
