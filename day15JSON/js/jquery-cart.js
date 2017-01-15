
//调用函数，计算商品总数量
var total=getGoodsTotal();
if(total){//购物车不为空
	$("#table").removeClass("hide");
	$("#box").addClass("hide");
	var url ="js/goodList.json";
	$.get(url,function(data){
		var jsonData=data;//ajax请求的数据
		console.log(jsonData);
		cartLoad(jsonData);//加载页面
		bindDom();//绑定事件
	})
	
	
}else{//购物车为空
	$("#table").addClass("hide");
	$("#box").removeClass("hide");
}

//渲染页面
function cartLoad(arr){
	var  cookieData=getcookieData();//数组     存放的是对象   为商品id 编号     对应商品的数量
	for(var i=0;i<cookieData.length;i++){
		for(var j=0;j<arr.length;j++){
			if(cookieData[i].id==arr[j].id){//找到对应商品
				var tr=$('<tr pid='+arr[j].id +'>'+
						'<td>'+
							'<input type="checkbox" class="ck"  />'+
						'</td>'+
						'<td>'+
							'<img src="'+arr[j].src +'" alt="" />'+
						'</td>'+
						'<td>'+arr[j].desc+
						'</td>'+
						'<td>'+
							'<button class="down">-</button><input type="text" value="'+cookieData[i].num +'" readonly="readonly" /><button class="up">+</button>'+
						'</td>'+
						'<td>'+
							'￥<span>'+arr[j].price +'</span>'+
						'</td>'+
						'<td>'+
							'￥<span>'+arr[j].price*cookieData[i].num +'</span>'+
						'</td>'+
						'<td>'+
							'<button class="del"  >删除</button>'+
						'</td>')
				tr.appendTo($("#tbody"));
			}
		}
	}
}


//绑定事件
function bindDom(){
	checkAllChange();
	goodNumAdd();
	goodNumEven();
	delGoods();
	totalPrice();
	allCheck();
}

//全选按钮 判断是否全选
function checkAllChange(){
	$("#tbody").on("change",".ck",function(){
		isChanged();
	})
}

function  isChanged(){
	var cks=$("tbody .ck");//jquery对象
	var falg=true;
	//console.log(cks[0]);
	for(var i=0;i<cks.length;i++){
		console.log(cks[i])
		if(cks[i].checked==false){
			falg=false;
			break;
		}
	}
	$("#allCheck")[0].checked=falg;
	totalPrice();
}
function allCheck(){
	$("#allCheck").on("change",function(){
		var flag=$(this)[0].checked;
		var cks=$("tbody .ck");//jquery对象
		for(var i=0;i<cks.length;i++){
			//console.log(cks[i])
			cks[i].checked=flag;
		}
		totalPrice();
	})
	
}


//计算总价格
function totalPrice(){
    var sum =0;
    $("tbody .ck").each(function(index,element){
    	console.log(element.checked);
   	   if(element.checked==true){//单选框被勾选
   	   	  var num=Number($(this).parents("tr").children().eq(5).find("span").html());
   	   	  sum+=num;
   	   }
    })
	$("#totalPrice").html(sum);
}

//点击"+"按钮商品数量增加 
function  goodNumAdd(){
	$(".up").click(function(){
		$(this).parents("tr").children().find(".ck")[0].checked=true;
		var pId=$(this).parents("tr").attr("pid");
		console.log(pId);
		var count=Number($(this).prev().val());//商品数量
		++count;
		$(this).prev().val(count);//修改页面商品数量
		var price=Number($(this).parents("tr").children().eq(4).find("span").html());
		$(this).parents("tr").children().eq(5).find("span").html(count*price);
		var obj={
			num:count,
			id:pId
		}
		console.log(obj);
		upCookieData(obj);//更新本地cookie
	    isChanged();
	    console.log($.cookie("goods"));
	})
}

//点击"-"按钮商品数量减少
function  goodNumEven(){
	$(".down").click(function(){
		$(this).parents("tr").children().find(".ck")[0].checked=true;
		var pId=$(this).parents("tr").attr("pid");
		console.log(pId);
		var count=Number($(this).next().val());//商品数量
		--count;
		if(count<1){
			count=1
		}
		$(this).next().val(count);//修改页面商品数量
		var price=Number($(this).parents("tr").children().eq(4).find("span").html());
		//修改对应商品的总价格
		$(this).parents("tr").children().eq(5).find("span").html(count*price);
		var obj={
			num:count,
			id:pId
		}
		console.log(obj);
		upCookieData(obj);//更新本地cookie
	    isChanged();
	    console.log($.cookie("goods"));
	})
}

//点击删除按钮  删除商品
function  delGoods(){
	$(".del").click(function(){
		var tr=$(this).parents("tr");
		var pId=tr.attr("pid");
		tr.remove();
		delCookie(pId);
		var total=getGoodsTotal();
		if(total){//购物车不为空
			$("#table").removeClass("hide");
			$("#box").addClass("hide");
		}else{//购物车为空
			$("#table").addClass("hide");
			$("#box").removeClass("hide");
		}
	})
	
}









