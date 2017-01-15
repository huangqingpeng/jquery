//获取cookie数据
function getcookieData(){
	var cookieData=$.cookie("goods");//获取本地cookie
	if(!cookieData){//本地不存在，则创建
		$.cookie("goods","[]");
		cookieData=$.cookie("goods");//获取本地cookie
	}
	var list=JSON.parse(cookieData);//转化为对象
	return  list;
}

//计算商品总数量 

function getGoodsTotal(){
	var cookieData=getcookieData();
	console.log(cookieData);
	var total=0;
	for(var i=0;i<cookieData.length;i++){
		total+=cookieData[i].num;
	}
	return total;
	
}

//检查本地是否存有该商品的       参数id  商品编号

function checkHasId(id){
	var cookieData=getcookieData();//获取本地cookie
	var isHas=false;
	for(var i=0;i<cookieData.length;i++){
		if(cookieData[i].id==id){//本地有
			isHas=true;
			break;
		}
	}
	return isHas;
}

//传的是对象
function upCookieData(obj){
	var arr=getcookieData();//获取本地cookie   arr
	console.log(arr);
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==obj.id){//存在
			arr.splice(i,1);//把存在的删除   
			break;
		}
	}
	arr.push(obj);//重新添加
	$.cookie("goods",JSON.stringify(arr),"expires:7");
}

//传入id 商品编号    修改对应商品的数量
function  getNumChange(id){
	var cookieData=getcookieData();//获取本地cookie   arr
	for(var i=0;i<cookieData.length;i++){
		if(cookieData[i].id==id){//本地有
			var num=++cookieData[i].num
			return num;
		}
	}
}


//参数 id 商品编号
function delCookie(id){
	var arr=getcookieData();//获取本地cookie   arr
	console.log(arr);
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id){//存在
			arr.splice(i,1);//把存在的删除   
			break;
		}
	}
	$.cookie("goods",JSON.stringify(arr),"expires:7");//同时更新cookie
}
