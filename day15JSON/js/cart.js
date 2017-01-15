var oTb=document.getElementById("table");
var oBox=document.getElementById("box");
var oTbd=document.getElementById("tbody");
var tP=document.getElementById("totalPrice");//
var totals=total();//调用函数    计算商品总数量
console.log(totals);
if(totals){//购物车数量不为空
	oTb.className=" "
	oBox.className="box hide";
	var arrCookieData=getCookieData();//首先获取本地cookie数据
	//用ajax渲染页面，需要先获取数据，同时需要获取本地cookie存的数据
	var obj = {
			method: "get",
			url: "js/goodList.json",//暂时用相对路径
			isAnsyc: true,
			success: function(data) {
						var arrJsonData = JSON.parse(data);//获取json数据
						console.log(arrJsonData);
						//循环遍历，去和cookie里存的id比较  如果相等  则渲染
						for(var i = 0; i < arrJsonData.length; i++) {
							for(var j = 0; j < arrCookieData.length; j++){
								if(arrJsonData[i].id==arrCookieData[j].id){
									//相等则数明添加购物车了，开始渲染
									var tr=document.createElement("tr");
									tr.setAttribute("pid",arrJsonData[i].id);//给tr定义一个属性
									tr.innerHTML='<td><input type="checkbox" class="ck"/></td>'+
													'<td><img src="'+arrJsonData[i].src  +'"alt=""/></td>'+
													'<td>'+ arrJsonData[i].desc +'</td>'+
													'<td><button class="down">-</button><input type="text" value="'+arrCookieData[j].num+
													'" readonly="readonly" /><button class="up">+</button></td>'+
													'<td>￥<span>'+ arrJsonData[i].price +'</span></td>'+
													'<td>￥<span>'+ arrJsonData[i].price*arrCookieData[j].num+'</span></td>'+
													'<td><button class="del"  >删除</button></td>';
									oTbd.appendChild(tr);
									totalPrice();
								}
							}
						}
					},
			error: function error(data) {
		           alert("data");
		       }
		}
	ajax(obj); //调用封装好的ajax函数
	
}else{//购物车数量为空
	oTb.className="hide";
	oBox.className="box";
}

var checkAll=document.getElementById("allCheck");
//给每个cks 上绑定onchange 事件  判断是否勾选   勾选就计算价格
//事件委托在tobady上  
console.log(oTbd);
oTbd.onchange=function(e){
	//alert(1);
	var _e=window.event||e;
	var _t=_e.srcElement||_e.target;
	if(_t.className=="ck"){
		totalPrice();
	}
	checkAllbox();//判断是否全选
}

//全选功能

checkAll.onchange=function(){
	//alert(1);
	var cks=document.querySelectorAll("tbody .ck");
	console.log(cks);
	for(var i=0;i<cks.length;i++){
	  	 cks[i].checked=this.checked;
	 }
	totalPrice();
}

//全选功能    判断是否全选
function checkAllbox(){
	  var cks=document.querySelectorAll("tbody .ck");
	  var falg=true;
	  for(var i=0;i<cks.length;i++){
	  	 if(cks[i].checked==false){
	  	 	falg=false;
	  	 }
	  }
	checkAll.checked=falg;
}
console.log(total());
//委托的方式   去给数量加减         删除    添加事件
oTbd.onclick=function(e){
	var _e=window.event||e;
	var _t=_e.srcElement||_e.target;
	//添加删除事件
	if(_t.className=="del"){
		var tr=_t.parentNode.parentNode;
		oTbd.removeChild(tr);//从页面中删除
		//更新cookie
		var curId=tr.getAttribute("pid");
	    console.log(curId);
	    console.log(tr);
		delCookie(curId);//同时更新本地cookie
	}
	//添加数量增加事件
	if(_t.className=="up"){
	    var tr=_t.parentNode.parentNode;
	    var curId=tr.getAttribute("pid");
		var v=tr.children[3].children[1].value;//获取商品数量
		var p=tr.children[4].firstElementChild.innerHTML;//获取商品单价
		var tolprice=tr.children[5].firstElementChild;////单一商品的价格总计
		console.log(v);
		console.log(tolprice);
		var num=++v;
		//页面显示的数量增加    单一商品的价格总计增加
		tr.children[3].children[1].value=num;
		tolprice.innerHTML= num*Number(p);
		tr.firstElementChild.firstElementChild.checked=true;
		//更改cookie
		var obj={
			   num:num,
			   id:curId
		    };
		uPcookie(obj);
	}
	if(_t.className=="down"){
	    var tr=_t.parentNode.parentNode;
	    var curId=tr.getAttribute("pid");
		var v=tr.children[3].children[1].value;//获取商品数量
		var p=tr.children[4].firstElementChild.innerHTML;//获取商品单价
		var tolprice=tr.children[5].firstElementChild;////单一商品的价格总计
		console.log(v);
		console.log(tolprice);
		var num=--v;
		if(num<1){
			num=1;
			alert("亲，商品数量不能小于1");
		}
		//页面显示的数量增加    单一商品的价格总计增加
		tr.children[3].children[1].value=num;
		tolprice.innerHTML= num*Number(p);
		tr.firstElementChild.firstElementChild.checked=true;
		//更改cookie
		var obj={
			   num:num,
			   id:curId
		    };
		uPcookie(obj);
		
	}
	//计算商品总量   如果为0   则换页面
	checkAllbox();//判断是否全选
	totalPrice();//计算总价格
	show();
}
//判断购物车是不是为空
function show(){
	//console.log(total());
	var totall=total();
	if(!totall){
		oTb.className="hide";
	    oBox.className="box";
	}else{
		oTb.className=" "
	    oBox.className="box hide";
	}
}

//功能： 计算购物车总价格，只要选中相对应的单选框 ，就计算相对应的的总价格
//参数：arr 数组，里面存的是对象
function totalPrice(){
	//获取tobdy里的所有单选框    需要写下面   启动ajax在页面加载之后     才能获取到
    var cks=document.querySelectorAll("tbody .ck");
	var sum=0;
	for(var i=0;i<cks.length;i++){
		if(cks[i].checked==true){
			var tr=cks[i].parentNode.parentNode;
			var totalPrice=tr.children[5].firstElementChild;
			console.log(totalPrice);
			sum+=parseInt(totalPrice.innerHTML);
		}
	}
	tP.innerHTML= sum;
}
//处理数据在handler.js里面处理
///***********************数据处理************************************/
////功能：判断是存有该商品  参数id   商品编号
//function checkId(id){
//	var arr=getCookieData();//获取cookie数据      为arr  里面存的为对象
//	for(var i=0;i<arr.length;i++){
//		if(arr[i].id==id){
//			return true;
//		}
//	}
//	return false;
//}
//
///*功能：更新本地cookie   参数为对象       存放每个商品的信息的编号   和数量
//obj={
//	id:值,
//	num:值
//}*/
//function  uPcookie(obj){
//	//先获取本地cookie
//	var arr=getCookieData();//已转化成数组，里面存的是对象
//	for(var i=0;i<arr.length;i++){//把已经存在的删除 ，从新添加
//		if(arr[i].id==obj.id){
//			arr.splice(i,1);
//		}
//	}
//	arr.push(obj);//从新添加
//	console.log(arr);
//	var date=new Date();
//	date.setDate(date.getDate()+7);
//	var obj={
//		   name:"list",
//			value:JSON.stringify(arr),//记得转成字符串
//			expires:date,
//			path:"/"
//	   };
//	cookieObjectFunction.setCookie(obj);//存进本地
//}
//
////删除cookie数据   参数为   id   商品编号
//
//function delCookie(id){
//	//先获取本地cookie
//	var arr=getCookieData();//已转化成数组，里面存的是对象
//	for(var i=0;i<arr.length;i++){//把已经存在的删除 ，从新添加
//		if(arr[i].id==id){
//			arr.splice(i,1);
//		}
//	console.log(arr);
//	var date=new Date();
//	date.setDate(date.getDate()+7);
//	var obj={
//		   name:"list",
//			value:JSON.stringify(arr),//记得转成字符串
//			expires:date,
//			path:"/"
//	   };
//	cookieObjectFunction.setCookie(obj);//存进本地
//	}
//}
// 
////功能：获取本地cookie  并返回数组
//function getCookieData(){
//	var str=cookieObjectFunction.getCookie("list");//获取cookie
//	console.log(str);
//	var date=new Date();
//	date.setDate(date.getDate()+7);
//	if(!str){//不存在  则创建cookie
//		var obj={
//			name:"list",
//			value:"[]",
//			expires:date,
//			path:"/"
//		};
//		console.log(obj);
//		cookieObjectFunction.setCookie(obj);
//		console.log(cookieObjectFunction.getCookie("list"))
//	}
//	var str=cookieObjectFunction.getCookie("list");//获取cookie
//	var arr=JSON.parse(str);
//	return arr;//里面存的是对象
//}
//
////功能：计算对应商品的数量    的变化
////参数：id   对应商品的编号
//function getNumChange(id){
//	var  arr=getCookieData();//获取本地数据
//	for(var i=0;i<arr.length;i++){
//		if(arr[i].id==id){
//			var num=++arr[i].num;
//			break;
//		}
//	}
//	return num;
//}
//
////计算添加商品的总数量
//function total(){
//	var arr=getCookieData();//得到本地数据   存放的数组  数组里面是对象
//	console.log(arr);
//	var totalNum=0;
//	if(arr.length>0){
//		for(var i=0;i<arr.length;i++){
//			totalNum+=arr[i].num;
//	  	}
//	}
//	return totalNum;
//}


