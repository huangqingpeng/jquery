var oList = document.getElementById("list");
var count=document.getElementById("ccount");
var aCount=0;
count.innerHTML=total();
var obj = {
	method: "get",
	url: "js/goodList.json", //暂时用相对路径
	isAnsyc: true,
	success: function(data) {
			var arrData = JSON.parse(data);
			console.log(arrData);
			for(var i = 0; i < arrData.length; i++) {
				var oDl = document.createElement("dl");
				oDl.setAttribute("pid",arrData[i].id);
				//console.log(pid);
				oDl.innerHTML = '<dt><a href="#"><img src = "'+ arrData[i].src+'"/></a></dt>'+
					            '<dd>' + arrData[i].name +'</dd>'+ 
					            '<dd>' + arrData[i].desc +'</dd>' +
					            '<dd> ￥ <span>'+ arrData[i].price +'</span></dd >'+
					            '<dd><button>添加购物车</button></dd>';
			    oList.appendChild(oDl);
			}
		},
	error: function error(data) {
           alert("data");
       }
}
ajax(obj); //调用封装好的ajax函数

//事件委托方式  点击“加入购物车”，事件委托在oList上
oList.onclick=function(e){
	var _e=window.event||e;
	var _t=_e.srcElement||_e.target;
	if(_t.tagName.toLocaleLowerCase()=="button"){//点击的是加入购物车
		var dl=_t.parentNode.parentNode;
		var curId=dl.getAttribute("pid");//商品编号
		var isId=checkId(curId);//判断cookie是否存有此商品编号
		if(isId){//存在    直接更新本地cookie数据
			//让对应商品的数量增加
			var num=getNumChange(curId);
			var objData={//定义变量存放商品信息
					id:curId,
					num:num
			    };
			//更新cookie
			uPcookie(objData);//跟新本地cookie
		}else{//不存在则需要创建
			var objData={//定义变量存放商品信息
					id:curId,
					num:1
			};
			//更新cookie
			uPcookie(objData);//跟新本地cookie
		}
	}
	count.innerHTML=total();//添加的商品数量跟着变化
	
	
	
	if(_t.tagName.toLocaleLowerCase()=="img"){//跳转到放大镜 页    即是商品详情页
		//首先创建cookie    
		var  dl=_t.parentNode.parentNode.parentNode;
		var  pId=dl.getAttribute("pid");// 获取商品编号
		console.log(pId);
		var  object={
			      id:pId
		    };
		   // alert(1);
		//存到cookie中     重新取个cookie名
		var date=new Date();
		date.setDate(date.getDate()+7);
		//存不存在  则创建cookie   同时把之前的给覆盖   这样就是点击那个商品   就能保证跳转的是本商品详情页
			var obj={
				name:"id",
				value:JSON.stringify(object),
				expires:date,
				path:"/"
			}
		cookieObjectFunction.setCookie(obj);//cookie创建成功
		//同时页面跳转
		location.href="fangdajing.html";
		//window.open("fangdajing.html","_blank");
	}
	
	
}

 