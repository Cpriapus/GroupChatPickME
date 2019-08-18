function InitAnchorControl(start, stop) {
    let start_btn = $('#' + start);
    let stop_btn = $('#' + stop);
    let lolhome = $('#lolhome');
    let showMsg = $('#modalMsg');
    let Msg = $('#msgText');
    // Hide all button
    start_btn.hide();
    stop_btn.hide();
    lolhome.show()
    // Get repot status
    helper.getAnchorStats(data => {
        if (data.ret === 0 && data.rep_res_org.code === 0 && data.rep_res_org.msg > 0) {
            helper.getUserInfo(info => {
                let zone = info.zone_id;
                let area = LOLZoneArea.zoneToArea(zone);
                let url = 'https://lol.ams.game.qq.com/lol/live/v1/anchor/live?zone=' + zone + '&area=' + area;
                // Bind click
                start_btn.click(() => {
                    $.ajax({
                    	url : "https://apps.game.qq.com/lol/a20180306live/broadcast.php?a0=startLive",
                        type: 'GET',
                        xhrFields: {
                            withCredentials: true
                        },
                        success: result => {
                            if (result) {
                                start_btn.hide();
                                stop_btn.show();
                                lolhome.hide();
                                showMsg.fadeIn();
                                Msg.html('已成功开播');
                                $('#ShowModalMask').fadeIn();
                            }
                        },
                        error: req => {
                            showMsg.fadeIn();
                            Msg.html(req.responseJSON.msg);
                            $('#ShowModalMask').fadeIn();
                            console.error('Start live failed.', req);
                        }
                    });
                });
                stop_btn.click(() => {
                    $.ajax({
                    	url : "https://apps.game.qq.com/lol/a20180306live/broadcast.php?a0=stopLive",
                        type: 'GET',
                        xhrFields: {
                            withCredentials: true
                        },
                        success: result => {
                            if (result) {
                                stop_btn.hide();
                                start_btn.show();
                                lolhome.hide();
                                showMsg.fadeIn();
                                Msg.html('下播成功');
                                $('#ShowModalMask').fadeIn();
                            }
                        },
                        error: req => {
                            showMsg.fadeIn();
                            Msg.html(req.responseJSON.msg);
                            $('#ShowModalMask').fadeIn();
                            console.error('Stop live failed.', req);
                        }
                    });
                });
                
                helper.checkLogin(() => {
                	$.ajax({
                		url : "https://apps.game.qq.com/lol/a20180306live/broadcast.php?a0=init",
                		type : "GET",
                		xhrFields : {
                			withCredentials : true
                		},
                		crossDomain : true,
                		success : function(result) {
                			console.log(result);
                        	result = JSON.parse(result);
                			if (+result.status == 0) {
                				var status = result.msg;
                				if (status > 0) {
                					stop_btn.hide();
                					lolhome.hide();
                					start_btn.show();
                				} else {
                					lolhome.hide();
                					start_btn.hide();
                					stop_btn.show();
                				}
                			} else {
                				console.log(data.msg);
                				return;
                			}
                		},
                		error : function(req) {
                			console.error('Get live status failed.', req);
                		}
                	});
                });
            });
        } else {
            console.error('Get anchor stats failed.', data);
        }
    });
}