var oNavul = document.getElementById("navul");
var oList = oNavul.getElementsByTagName("li");
for(var j = 0; j < oList.length; j++) {
	oList[j].className = "";
	$(oList[j]).children().css({
		color: "#fff"
	});
}
oList[0].className = "list1";
$(oList[0]).children().css({
	color: "#f60"
});
for(var i = 0; i < oList.length; i++) {
	oList[i].index = i;
	oList[i].onmouseover = function() {
		for(var j = 0; j < oList.length; j++) {
			oList[j].className = "";
			$(oList[j]).children().css({
				color: "#fff"
			});
		}
		this.className = "list1";
		$(this).children().css({
			color: "#f60"
		});
	}
}


	

//显示时间,到当前时间的倒计时
function showTime() {
	var time_start = new Date().getTime(); //设定当前时间
	var time_end = new Date("2017/12/04 01:00:00").getTime(); //设定目标时间
	// 计算时间差 
	var time_distance = time_end - time_start; //目标时间和当前时间的时间差
	// 天
	var int_day = Math.floor(time_distance / 86400000)
	time_distance -= int_day * 86400000; //计算天
	// 时
	var int_hour = Math.floor(time_distance / 3600000)
	time_distance -= int_hour * 3600000; //计算时
	// 分
	var int_minute = Math.floor(time_distance / 60000)
	time_distance -= int_minute * 60000; //计算分
	// 秒 
	var int_second = Math.floor(time_distance / 1000)
		// 时分秒为单数时、前面加零 
	if(int_day < 10) {
		int_day = "0" + int_day;
	}
	if(int_hour < 10) {
		int_hour = "0" + int_hour;
	}
	if(int_minute < 10) {
		int_minute = "0" + int_minute;
	}
	if(int_second < 10) {
		int_second = "0" + int_second;
	}
	// 显示时间 
	//			$("#main .item_wrap .speed_cont .time .count span").first().val(int_day);

	$(".day_show").html(int_day);
	$(".hour_show").html(int_hour);
	$(".minute_show").html(int_minute);
	$(".second_show").html(int_second);
	//			console.log($("#main .item_wrap .speed_cont .time .count span").first().val(int_hour))
    // 设置定时器
	
//	setTimeout(showTime,1000);
}

//执行定时器
setInterval(function(){
	showTime();
},1000);




var bannerMove=function () {
	var timer;
	var pageIndex=0;
	timer=setInterval(function(){
		$(".scroll").stop().animate({top:-(pageIndex+1)*253},1000);
		pageIndex++;
		console.log(pageIndex)	
		if(pageIndex==4){
			pageIndex=0;
			$(".scroll").animate({top:0},1);
		}	
	},3000)
};
bannerMove() ;




