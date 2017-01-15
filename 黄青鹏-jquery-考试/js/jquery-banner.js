bannerMove() ;
function bannerMove() {
	var timer;
	var pageIndex=0;
	setInterval(function(){
		$(".scroll").stop().animate({top:-(pageIndex+1)*253},1000);
		pageIndex++;
		console.log(pageIndex)	
		if(pageIndex==4){
			pageIndex=0;
			$(".scroll").animate({top:0},1);
		}	
	},3000)
};