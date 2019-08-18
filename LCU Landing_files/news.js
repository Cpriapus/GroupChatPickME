function set_news_detail(){
	$.getJSON("get_data.php?data=news_detail",{},function(data){
		$.each( data, function( key, value ) {
			sessionStorage.setItem('news_'+value.news_id,value.news_content);
		});
	});
	setTimeout("set_news_detail()", 600000);
}

function set_news_list(){
	$.get("get_data.php?data=news_list",{},function(data){
		sessionStorage.setItem('news_list',data);
	});
	setTimeout("set_news_list()", 600000);

}
function remove_disabled(){
	$("a.link").removeAttr("disabled");
}
function get_banner(){
	$.getJSON("get_data.php?data=banner_list",{},function(data){
		$('#news_slide').html('');
		if(data.length > 0){
			var html = '<div class="news-slide swiper-slide" >';

			$.each( data, function( key, value ) {
				if((key+1) > 1 && (key+1) % 3 == 1){
					html+='</div><div class="news-slide swiper-slide swiper-slide-next">';
				}
				html+='<div class="news">';
	            html+='<div class="news-image">';
	            html+='<a class="link" type="'+value.target+'" url="'+value.link+'"><img src="'+value.img+'" style="width: 224px;height: 132px;"></a>';
	            html+='</div>';
	            html+='<div class="news-title"><a class="link" type="'+value.target+'" url="'+value.link+'" style="cursor:pointer;"><span >'+value.title;
	            if(value.target == "out"){
	            	html+='<i class="icon-link"></i>';
	            }
	            html+='</span></a></div>';
	            html+='</div>';
	            
	        });
	        html += '</div>';
			$('#news_slide').append(html);
        }
            var swiperA = new Swiper('.news-container', {
		        paginationClickable: true,
		        nextButton: '.arrowRight',
		        prevButton: '.arrowLeft'
		      
		    });
		    $("a.link").click(function(e){
		    	
		    	
		    	if ($(this).attr("disabled") == "disabled") {
		    		return false;
		    	}
		    	$(this).attr('disabled', 'disabled');
		        var url = $(this).attr('url');
		        linkIO(url,$(this).attr('type'));
		        
		        setTimeout("remove_disabled()",2000);
		        
		    });


	});
	setTimeout("get_banner()", 300000);

}