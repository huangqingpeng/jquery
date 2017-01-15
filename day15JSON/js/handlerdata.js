  //功能：判断是存有该商品  参数id   商品编号
  function checkId(id){
  	var arr=getCookieData();//获取cookie数据      为arr  里面存的为对象
  	for(var i=0;i<arr.length;i++){
  		if(arr[i].id==id){
  			return true;
  		}
  	}
  	return false;
  }

//功能：更新本地cookie   参数为对象       存放每个商品的信息的编号   和数量
function  uPcookie(obj){
	//先获取本地cookie
	var arr=getCookieData();//已转化成数组，里面存的是对象
	for(var i=0;i<arr.length;i++){//把已经存在的删除 ，从新添加
  		if(arr[i].id==obj.id){
  			arr.splice(i,1);
  		}
  	}
	arr.push(obj);
	console.log(arr);
	var date=new Date();
	date.setDate(date.getDate()+7);
	var obj={
		  name:"list",
			value:JSON.stringify(arr),//记得转成字符串
			expires:date,
			path:"/"
	   };
	cookieObjectFunction.setCookie(obj);//存进本地
}


//功能：获取本地cookie  并返回数组
function getCookieData(){
	var str=cookieObjectFunction.getCookie("list");//获取cookie
	console.log(str);
	var date=new Date();
	date.setDate(date.getDate()+7);
	if(!str){//不存在  则创建cookie
		var obj={
			name:"list",
			value:"[]",
			expires:date,
			path:"/"
		};
		console.log(obj);
		cookieObjectFunction.setCookie(obj);
		console.log(cookieObjectFunction.getCookie("list"))
	}
	var str=cookieObjectFunction.getCookie("list");//获取cookie
	var arr=JSON.parse(str);
	return arr;//里面存的是对象
}

//功能：计算对应商品的数量    的变化
//参数：id   对应商品的编号
function getNumChange(id){
	var  arr=getCookieData();//获取本地数据
	for(var i=0;i<arr.length;i++){
		if(arr[i].id==id){
  			var num=++arr[i].num;
  			return num;
  		}
	}
}
//计算添加商品的总数量
function total(){
	var arr=getCookieData();//得到本地数据   存放的数组  数组里面是对象
	var total=0;
	for(var i=0;i<arr.length;i++){
		total+=arr[i].num;
  	}
	return total;
}


//删除cookie数据   参数为   id   商品编号

function delCookie(id){
	//先获取本地cookie
	var arr=getCookieData();//已转化成数组，里面存的是对象
	for(var i=0;i<arr.length;i++){//把已经存在的删除 ，从新添加
		if(arr[i].id==id){
			arr.splice(i,1);
		}
	console.log(arr);
	var date=new Date();
	date.setDate(date.getDate()+7);
	var obj={
		   name:"list",
			value:JSON.stringify(arr),//记得转成字符串
			expires:date,
			path:"/"
	   };
	cookieObjectFunction.setCookie(obj);//存进本地
	}
}