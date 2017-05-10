$(function(){
    var serverQQ = $('.serverInfo').children('.serverQQ').attr('info');
    var wxcode = $('.serverInfo').children('.wxcode').attr('info');
    var linkPhone = $('.serverInfo').children('.linkPhone').attr('info');
    var jdUrl = $('.serverInfo').children('.jdurl').attr('info');
    var tmallUrl = $('.serverInfo').children('.tmallurl').attr('info');
	var tophtml="<div id=\"izl_rmenu\" class=\"izl-rmenu\">";
        tophtml +="<a href=\""+jdUrl+"\" class=\"btn btn-jd\" target=\"_blank\"></a>";
        tophtml +="<a href=\""+tmallUrl+"\" class=\"btn btn-tmall\" target=\"_blank\"></a>";
        tophtml +="<a href=\"tencent://Message/?Uin="+serverQQ+"&Menu=yes\" class=\"btn btn-qq\"></a>";
        tophtml +="<div class=\"btn btn-wx\"><img class=\"pic\" src=\""+wxcode+"\" onclick=\"window.location.href=\'http://www.belovedbaby-china.com\'\"/></div>";
        //tophtml +="<div class=\"btn btn-phone\"><div class=\"phone\">"+linkPhone+"</div></div>";
        tophtml +="<div class=\"btn btn-top\"></div>";
        tophtml +="</div>";
	$("#top").html(tophtml);
	$("#izl_rmenu").each(function(){
		$(this).find(".btn-wx").mouseenter(function(){
			$(this).find(".pic").fadeIn("fast");
		});
		$(this).find(".btn-wx").mouseleave(function(){
			$(this).find(".pic").fadeOut("fast");
		});
		$(this).find(".btn-phone").mouseenter(function(){
			$(this).find(".phone").fadeIn("fast");
		});
		$(this).find(".btn-phone").mouseleave(function(){
			$(this).find(".phone").fadeOut("fast");
		});
		$(this).find(".btn-top").click(function(){
			$("html, body").animate({
				"scroll-top":0
			},"fast");
		});
	});
	var lastRmenuStatus=false;
	$(window).scroll(function(){//bug
		var _top=$(window).scrollTop();
		if(_top>200){
			$("#izl_rmenu").data("expanded",true);
		}else{
			$("#izl_rmenu").data("expanded",false);
		}
		if($("#izl_rmenu").data("expanded")!=lastRmenuStatus){
			lastRmenuStatus=$("#izl_rmenu").data("expanded");
			if(lastRmenuStatus){
				$("#izl_rmenu .btn-top").slideDown();
			}else{
				$("#izl_rmenu .btn-top").slideUp();
			}
		}
	});
});