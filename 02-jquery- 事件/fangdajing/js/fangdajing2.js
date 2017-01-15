/**
 * Created by Administrator on 2016/12/20.
 */
var path="img/";
var url="js/fangdajing.json";
$.get(url,function(data){
        console.log(data);//data为对象
        bindDom(data);
        bindEvent();
   })
/*
*   dom  页面加载数据
* */
function bindDom(obj){
    var arr=obj.banner;//对象转化为数组
	for(var i=0;i<arr.length;i++){
	 	var li=$("<li></li>");//动态创建li
	 	//给创建的li添加自定义属性
	 	$(li).attr({"smallImg":arr[i].sImgSrc,"bigImg":arr[i].bImgSrc});
	 	if(i==0){
	 		$(li).addClass("active");
	 		var bImg=$('<img src="' + path +arr[i].bImgSrc + '"alt=""/>');
	 		bImg.appendTo($(".box-right"));//把大图片插入到大盒子里；
	 		var sImg=$('<img src="' + path +arr[i].sImgSrc + '"alt=""/>');
	 		sImg.appendTo($(".smallBox"));//把小图片插入到大盒子里；
	 	}
	 	var img=$('<img src="' + path +arr[i].tabSrc + '"alt=""/>');//创建img
	 	img.appendTo(li);
	 	li.appendTo($(".list"));
	 }
}
/*
* 放大镜的事件的绑定
*定义一个函数，包含所有的事件，
*/
function bindEvent(){
    //tab左右轮播切换操作
    var  w=$(".control-tabs").width();//tab盒子显示的宽度
    console.log(w);
    //左侧按钮
	$(".control-left").click(function(){//向左运动
		var uLeft=$(".list").position().left+w*-1;//ul的左侧的定位
	    console.log(uLeft);
	    // alert(1);
	    if(uLeft<w-$(".list").width()){
            uLeft=w-$(".list").width();
            //alert(1);
        }
	    $(".control-tabs .list").animate({left:uLeft},100);
	})
	//右侧按钮
	$(".control-right").click(function(){//向有运动
		var uLeft=$(".list").position().left+w;//ul的左侧的定位
		if(uLeft>0){
            uLeft=0;
        }
		$(".control-tabs .list").animate({left:uLeft},100);
	})


	//事件委托方法  tab图片切换    事件委托
	$(".list").on("mouseover","li",function(){
		$(this).addClass("active").siblings().removeClass("active");//鼠标移上，此图片显示边框
		var bigImgSrc=$(this).attr("bigImg");
		//$(".box-right img").removeAttr("src");
		$(".box-right img").attr("src",path+bigImgSrc);
		var smallImgSrc=$(this).attr("smallImg");
		//$(".smallBox img").removeAttr("src");
		$(".smallBox img").attr("src",path+smallImgSrc);
	});

    //放大镜的放大效果控制事件    事件委托
    $(".smallBox").mousemove(function(e){
    	var x=e.pageX-$(".tool").width()/2-$(".fdj").offset().left;
        var y=e.pageY-$(".tool").height()/2-$(".fdj").offset().top;
    	if(x<0){
            x=0;
        }
    	if(x>$(".smallBox").width()-$(".tool").width()){
            x=$(".smallBox").width()-$(".tool").width();
        }
    	if(y<0){
            y=0;
        }
    	if(y>$(".smallBox").height()-$(".tool").height()){
            y=$(".smallBox").height()-$(".tool").height();
        }
    	
    	$(".tool").css({left:x,top:y});
    	$(".box-right img").css({left:-3*x,top:-3*y});
    })

   //鼠标移入移出事件
	$(".smallBox").mouseenter(function(){//鼠标移进类名为smallBox，工具盒子和右侧放大图片的盒子显示出来
		$(".tool").addClass("active");
		$(".box-right").addClass("active");
	}).mouseleave(function(){//鼠标移出类名为smallBox，工具盒子和右侧放大图片的盒子显示出来
		$(".tool").removeClass("active");
		$(".box-right").removeClass("active");
	});
}