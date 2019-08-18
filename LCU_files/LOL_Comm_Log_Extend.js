//------------------------------------客户端LCU START-----------------------------------
/*
LCU客户端视频中心轮播视频
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
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
LCU客户端视频中心轮播曝光
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Client_Lcu_Video_Promo_Pop'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) { //客户端轮播
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
客户端资讯无图
pos : 位置ID
id : 资讯iMediaID
vid : 目标url
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
客户端资讯小图
pos : 位置ID
id : 资讯iMediaID
vid : 目标url
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
客户端视频中心列表
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
客户端视频中心排行
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
//------------------------------------客户端LCU END-------------------------------------

//------------------------------------客户端START-----------------------------------
/*
客户端视频中心轮播视频
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
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
客户端视频中心轮播曝光
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Client_Video_Promo_Pop'] = function(pos, id, contentId, url, task_id, recommand_id, algo_type) { //客户端轮播
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
客户端视频中心列表
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
客户端视频中心排行
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
客户端资讯无图
pos : 位置ID
id : 资讯iMediaID
vid : 目标url
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
客户端资讯小图
pos : 位置ID
id : 资讯iMediaID
vid : 目标url
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
客户端资讯大图
pos : 位置ID
id : 资讯iMediaID
vid : 目标url
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
//------------------------------------客户端END-----------------------------------

//------------------------------------官网START-----------------------------------
/*
官网视频中心首页大图轮播视频
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_bPromo'] = function(pos, id, contentId, url) { //官网视频轮播
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
官网视频中心首页大图轮播曝光
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_bPromo_Pop'] = function(pos, id, contentId, url) { //客户端轮播
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
官网视频中心首页小图视频
pos : 位置ID
id : 视频广告位ID
contentId : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_sPromo'] = function(pos, id, contentId, url) { //官网视频小图
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
官网视频中心首页最新视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_New'] = function(pos, id, url) { //官网视频最新
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
官网视频中心首页日排行视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
官网视频中心首页周排行视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
官网视频中心首页月排行视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
官网视频中心首页解说视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
官网视频中心首页赛事视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_Match'] = function(pos, id, url) { //客户端视频排行
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
官网视频中心首页周免英雄视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_FreeHero'] = function(pos, id, url) { //客户端视频排行
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
官网视频中心首页趣味集锦视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
官网视频中心首页官方视频
pos : 位置ID
id : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_Official'] = function(pos, id, url) { //客户端视频排行
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
官网视频中心列表页
pos : 位置ID
id : 视频iVideoID
vid : 目标url
*/
LOL_Comm_Log['Web_Video_Search'] = function(pos, id, url) { //客户端视频排行
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
官网首页视频图推
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
id : 视频iVideoID
vid : 视频VID
pos : 来源e_code
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
官网视频中心详情页视频拖动上报
id : 视频ID
start : 拖动开始时间
end : 拖动结束
*/
LOL_Comm_Log['Web_Video_Drag'] = function(id, start, end) { //官网视频轮播
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
官网视频中心视频点赞上报
id : 视频ID
type : 
*/
LOL_Comm_Log['Web_Video_Digg'] = function(id, type) { //官网视频轮播
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
官网视频中心媒体点赞上报
id : 视频ID
type : 
*/
LOL_Comm_Log['Web_Media_Digg'] = function(id) { //官网视频轮播
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
//------------------------------------官网END-----------------------------------

//------------------------------------掌盟START-----------------------------------
/*
掌盟首页视频图推
pos : 位置ID
id : 视频iVideoID
vid : 目标url
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
//------------------------------------掌盟END-----------------------------------

//------------------------------------电视台START-----------------------------------
/*
电视台媒体大图推荐
pos : 位置ID
id : 视频iMediaID
vid : 目标url
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
电视台媒体大图推荐
pos : 位置ID
id : 视频iMediaID
vid : 目标url
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
//------------------------------------掌盟END-----------------------------------/*  |xGv00|a42cbcb412d937e9fb1e649f35c43ac0 */