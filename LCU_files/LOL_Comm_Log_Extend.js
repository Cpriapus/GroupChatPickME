//------------------------------------�ͻ���LCU START-----------------------------------
/*
LCU�ͻ�����Ƶ�����ֲ���Ƶ
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_Video_Promo'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_Lcu_Video_Promo',
		'adId': 'lcu_client.videopromo.' + pos + '.a' + id,
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url,
		'task_id': task_id,
		'recommand_id': recommand_id,
		'algo_type': algo_type
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lcu_client.videopromo.' + pos,
		'VType': 'click'
	});
};
/*
LCU�ͻ�����Ƶ�����ֲ��ع�
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_Video_Promo_Pop'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) { //�ͻ����ֲ�
	var self = LOL_Comm_Log;
	var tmp = [];
	var adName = [];
	if (url.split('|').length > 1) {
		for (var x in pos.split('|')) {
			adName.push("Client_Lcu_Video_Promo_Pop");
			tmp.push('lcu_client.videopromopop.' + pos.split('|')[x] + '.a' + id.split('|')[x])
		}
	} else {
		tmp.push('lcu_client.videopromopop.' + pos + '.a' + id)
	}
	self.POP({
		'actionType': 'pop',
		'adName': adName.length > 0 ? adName.join('|') : 'Client_Lcu_Video_Promo_Pop',
		'adId': tmp.join('|'),
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url,
		'task_id': task_id,
		'recommand_id': recommand_id,
		'algo_type': algo_type
	});
};
/*
�ͻ�����Ѷ��ͼ
pos : λ��ID
id : ��ѶiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_News_nPic'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Client_Lcu_News_nPic',
		'adId': 'lcu_client.medianews.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
};
/*
�ͻ�����ѶСͼ
pos : λ��ID
id : ��ѶiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_News_sPic'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_Lcu_News_sPic',
		'adId': 'lcu_client.mediapic.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
};
/*
�ͻ�����Ƶ�����б�
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_Video_MainLink'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_Lcu_Video_MainLink',
		'adId': 'lcu_client.video.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lcu_client.video.' + pos,
		'VType': 'click'
	});
};

/*
�ͻ�����Ƶ��������
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Lcu_Video_Rank'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Client_Lcu_Video_Rank',
		'adId': 'lcu_client.video.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lcu_client.video.' + pos,
		'VType': 'click'
	});
};
//------------------------------------�ͻ���LCU END-------------------------------------

//------------------------------------�ͻ���START-----------------------------------
/*
�ͻ�����Ƶ�����ֲ���Ƶ
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Video_Promo'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_Video_Promo',
		'adId': 'client.videopromo.' + pos + '.a' + id,
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url,
		'task_id': task_id,
		'recommand_id': recommand_id,
		'algo_type': algo_type
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'client.videopromo.' + pos,
		'VType': 'click'
	});
};
/*
�ͻ�����Ƶ�����ֲ��ع�
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Video_Promo_Pop'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) { //�ͻ����ֲ�
	var self = LOL_Comm_Log;
	var tmp = [];
	var adName = [];
	if (url.split('|').length > 1) {
		for (var x in pos.split('|')) {
			adName.push("Client_Video_Promo_Pop");
			tmp.push('client.videopromopop.' + pos.split('|')[x] + '.a' + id.split('|')[x])
		}
	} else {
		tmp.push('client.videopromopop.' + pos + '.a' + id)
	}
	self.POP({
		'actionType': 'pop',
		'adName': adName.length > 0 ? adName.join('|') : 'Client_Video_Promo_Pop',
		'adId': tmp.join('|'),
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url,
		'task_id': task_id,
		'recommand_id': recommand_id,
		'algo_type': algo_type
	});
};
/*
�ͻ�����Ƶ�����б�
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Video_MainLink'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_Video_MainLink',
		'adId': 'client.video.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'client.video.' + pos,
		'VType': 'click'
	});
};
/*
�ͻ�����Ƶ��������
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_Video_Rank'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Client_Video_Rank',
		'adId': 'client.video.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'client.video.' + pos,
		'VType': 'click'
	});
};
/*
�ͻ�����Ѷ��ͼ
pos : λ��ID
id : ��ѶiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_News_nPic'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Client_News_nPic',
		'adId': 'client.medianews.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
};
/*
�ͻ�����ѶСͼ
pos : λ��ID
id : ��ѶiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_News_sPic'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_News_sPic',
		'adId': 'client.mediapic.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
};
/*
�ͻ�����Ѷ��ͼ
pos : λ��ID
id : ��ѶiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['Client_News_bPic'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Client_News_bPic',
		'adId': 'client.mediapic.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
};
//------------------------------------�ͻ���END-----------------------------------

//------------------------------------����START-----------------------------------
/*
������Ƶ������ҳ��ͼ�ֲ���Ƶ
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_bPromo'] = function(pos, id, contentId, url) { //������Ƶ�ֲ�
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_bPromo',
		'adId': 'lolweb.videobpromo.' + pos + '.a' + id,
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videobpromo.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ��ͼ�ֲ��ع�
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_bPromo_Pop'] = function(pos, id, contentId, url) { //�ͻ����ֲ�
	var self = LOL_Comm_Log;
	self.POP({
		'actionType': 'pop',
		'adName': 'Web_Video_bPromo_Pop',
		'adId': 'lolweb.videobpromopop.' + pos + '.a' + id,
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url
	});
};
/*
������Ƶ������ҳСͼ��Ƶ
pos : λ��ID
id : ��Ƶ���λID
contentId : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_sPromo'] = function(pos, id, contentId, url) { //������ƵСͼ
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_sPromo',
		'adId': 'lolweb.videospromo.' + pos + '.a' + id,
		'contentId': contentId,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videospromo.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_New'] = function(pos, id, url) { //������Ƶ����
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_New',
		'adId': 'lolweb.videonewslist.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videonewslist.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ��������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Rank_TPV'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Web_Video_Rank_TPV',
		'adId': 'lolweb.videotpvlist.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videotpvlist.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ��������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Rank_WPV'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Web_Video_Rank_WPV',
		'adId': 'lolweb.videowpvlist.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videowpvlist.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ��������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Rank_MPV'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'wordlink',
		'adName': 'Web_Video_Rank_MPV',
		'adId': 'lolweb.videompvlist.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videompvlist.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ��˵��Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Author'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Author',
		'adId': 'lolweb.videoauthorindex.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videoauthorindex.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Match'] = function(pos, id, url) { //�ͻ�����Ƶ����
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Match',
		'adId': 'lolweb.videomatchindex.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videomatchindex.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ����Ӣ����Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_FreeHero'] = function(pos, id, url) { //�ͻ�����Ƶ����
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_FreeHero',
		'adId': 'lolweb.videoheroindex.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videoheroindex.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳȤζ������Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Combo'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Combo',
		'adId': 'lolweb.videocomboindex.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videocomboindex.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ������ҳ�ٷ���Ƶ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Official'] = function(pos, id, url) { //�ͻ�����Ƶ����
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Combo',
		'adId': 'lolweb.videoofficialindex.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videoofficialindex.' + pos,
		'VType': 'click'
	});
};
/*
������Ƶ�����б�ҳ
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Search'] = function(pos, id, url) { //�ͻ�����Ƶ����
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Search',
		'adId': 'lolweb.videosearch.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolweb.videosearch.' + pos,
		'VType': 'click'
	});
};
/*
������ҳ��Ƶͼ��
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['Web_Video_Main'] = function(pos, id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'Web_Video_Main',
		'adId': 'main.videototal.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'main.videototal.' + pos,
		'VType': 'click'
	});
};
/*
id : ��ƵiVideoID
vid : ��ƵVID
pos : ��Դe_code
*/
LOL_Comm_Log['Web_Video_Play'] = function(id, vid, pos) {
	var self = LOL_Comm_Log;
	self.VShow({
		'VUrl': location.href,
		'Vid': id,
		'Vvid': vid,
		'e_code': pos,
		'VType': 'play'
	});
};
/*
������Ƶ��������ҳ��Ƶ�϶��ϱ�
id : ��ƵID
start : �϶���ʼʱ��
end : �϶�����
*/
LOL_Comm_Log['Web_Video_Drag'] = function(id, start, end) { //������Ƶ�ֲ�
	var self = LOL_Comm_Log;
	self.Drag({
		'actionType': 'drag',
		'contenProperty': 'image',
		'adName': 'Web_Video_Drag',
		'adId': 'lolweb.videodrag.' + (end - start > 0 ? 'fastforward' : 'rewind') + '.a' + id,
		'contentId': id,
		'contentType': 'video',
		'starttime': start,
		'endtime': end,
		'millisecond': end - start * 1000
	});
};
/*
������Ƶ������Ƶ�����ϱ�
id : ��ƵID
type : 
*/
LOL_Comm_Log['Web_Video_Digg'] = function(id, type) { //������Ƶ�ֲ�
	var self = LOL_Comm_Log;
	self.Digg({
		'actionType': 'digg',
		'contenProperty': 'image',
		'adName': 'Web_Video_Digg',
		'adId': 'lolweb.videodigg.' + (type == 1 ? 'detail' : 'go') + '.a' + id,
		'contentId': id,
		'contentType': 'video'
	});
};
/*
������Ƶ����ý������ϱ�
id : ��ƵID
type : 
*/
LOL_Comm_Log['Web_Media_Digg'] = function(id) { //������Ƶ�ֲ�
	var self = LOL_Comm_Log;
	self.Digg({
		'actionType': 'digg',
		'contenProperty': 'image',
		'adName': 'Web_Media_Digg',
		'adId': 'lolweb.mediadigg.' + 'go.a' + id,
		'contentId': id,
		'contentType': 'news'
	});
};
//------------------------------------����END-----------------------------------

//------------------------------------����START-----------------------------------
/*
������ҳ��Ƶͼ��
pos : λ��ID
id : ��ƵiVideoID
vid : Ŀ��url
*/
LOL_Comm_Log['App_Video_Main'] = function(id, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'App_Video_Main',
		'adId': 'lolapp.v.videoList.a' + id,
		'contentId': id,
		'contentType': 'video',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'lolapp.v.videoList',
		'VType': 'click'
	});
};
//------------------------------------����END-----------------------------------

//------------------------------------����̨START-----------------------------------
/*
����̨ý���ͼ�Ƽ�
pos : λ��ID
id : ��ƵiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['LOLTV_Media_bPromo'] = function(pos, id, contentId, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'LOLTV_Media_bPromo',
		'adId': 'loltv.mediabpromo.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'loltv.mediabpromo.' + pos,
		'VType': 'click'
	});
};
/*
����̨ý���ͼ�Ƽ�
pos : λ��ID
id : ��ƵiMediaID
vid : Ŀ��url
*/
LOL_Comm_Log['LOLTV_Media_sPromo'] = function(pos, id, contentId, url) {
	var self = LOL_Comm_Log;
	self.Click({
		'actionType': 'click',
		'contenProperty': 'image',
		'adName': 'LOLTV_Media_sPromo',
		'adId': 'loltv.mediaspromo.' + pos + '.a' + id,
		'contentId': id,
		'contentType': 'news',
		'clickUrl': url
	});
	self.VShow({
		'VUrl': url,
		'Vid': id,
		'Vvid': '',
		'e_code': 'loltv.mediaspromo.' + pos,
		'VType': 'click'
	});
};
//------------------------------------����END-----------------------------------/*  |xGv00|a42cbcb412d937e9fb1e649f35c43ac0 */