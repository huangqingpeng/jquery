

var url="js/goodList.json";
$.get(url,function(data){//ajax获取数据
	console.log(data);
	htmlLoad(data);//渲染页面
	bindDomEvent();
})

//参数arr
function htmlLoad(arr){
	for(var i=0;i<arr.length;i++){
		var dl=$('<dl pid="'+arr[i].id+'">'+
				'<dt><img src="'+ arr[i].src+'" /></dt>'+
				'<dd>'+ arr[i].name+'</dd>'+
				'<dd>'+ arr[i].desc+'</dd>'+
				'<dd>￥<span>'+ arr[i].price+'</span></dd>'+
				'<dd><button>添加购物车</button></dd>'+
		        '</dl>');
		dl.appendTo($("#list"));
	}
}

//商品总数量显示在页面

$("#ccount").html(getGoodsTotal());

//点击加入购物车事件   事件委托
function bindDomEvent(){
	$("#list").on("click","button",function(){
		//获取商品的id 编号
		var dl=$(this).parents("dl");
		var curId=dl.attr("pid");//商品编号
		console.log(curId);
	    if(checkHasId(curId)){//本地有
	    	var num=getNumChange(curId);//修改该商品的数量
	    	var obj={
	    		id:curId,
	    		num:num
	    	}
	    	upCookieData(obj);//更新本地 cookie 数据
	    }else{//本地无
	    	//只存商品id  编号    和商品数量
	    	var obj={
	    		id:curId,
	    		num:1
	    	}
	    	upCookieData(obj);//更新本地 cookie 数据
	    }
	    $("#ccount").html(getGoodsTotal());
   })
}







