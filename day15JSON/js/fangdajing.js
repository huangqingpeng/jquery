var smallUl=document.getElementById("smallul");
var tabUl=document.getElementById("tabul");
var bigUl=document.getElementById("bigul");
//获取cookie存储数据    ，把存储的数据加载在页面         实现点击谁就跳转到那个商品的详情页  
var cookieData=cookieObjectFunction.getCookie("id");//取出cookie  字符串
console.log(typeof cookieData);//
console.log(cookieData);//
var pId=JSON.parse(cookieData).id;
console.log(pId);
var obj = {
	method: "get",
	url: "js/fangdajing.json",
	isAnsyc: false,
	success: function(data) {
			var arrData = JSON.parse(data);
			console.log(arrData);
			for(var i=0;i<arrData.length;i++){
				if(arrData[i].id==pId){
					//console.log(arrData[i]);
					//开始渲染页面
					//循环创建12 个li
					for(var key in arrData[i].smallPic){
						//console.log(key);
					   var oLi=document.createElement("li");
					   oLi.innerHTML='<img src="'+ arrData[i].smallPic[key]+'"/>';
					   smallUl.appendChild(oLi);
					}
					for(var key in arrData[i].bigPic){
						//console.log(key);
					   var oLi=document.createElement("li");
					   oLi.innerHTML='<img src="'+ arrData[i].bigPic[key]+'"/>';
					   bigUl.appendChild(oLi);
					}
					for(var key in arrData[i].tabPic){
						//console.log(key);
					   var oLi=document.createElement("li");
					   oLi.className="tablist";
					   oLi.innerHTML='<img src="'+ arrData[i].tabPic[key]+'"/>';
					   tabUl.appendChild(oLi);
					}
					
				}
			}
			
		},
	error: function error(data) {
           alert("data");
       }
}
ajax(obj); //调用封装好的ajax函数



		var smallBox=document.getElementById("smallBox");
		var outBox=document.getElementById("outbox");
		var oTool=document.getElementById("tool");
		var bigBox=document.getElementById("bigBox");
		var imgList=bigBox.getElementsByTagName("img");
		var smallUl=document.getElementById("smallul");
		var bigUl=document.getElementById("bigul");
		var tabUl=document.getElementById("tabul");
		var tabList=document.querySelectorAll(".tablist");
		var bLeft=document.getElementById("left");
		var bRight=document.getElementById("right");
		var pageIndex=0;//记录轮播的时，向一个方向滚动的次数
		var index=0;
		bLeft.onclick=function(){//向左移动,切换列表图片
			pageIndex++;
			if(pageIndex>7){
				pageIndex=7;
				alert("已到最后一张")
			}
			tabUl.style.left=-pageIndex*50+"px";
		}
		bRight.onclick=function(){//向右移动,切换列表图片
			pageIndex--;
			if(pageIndex>7){
				pageIndex=7;
			}
			if(pageIndex<0){
				pageIndex=0;
				alert("已到最后一张")
			}
			tabUl.style.left=-pageIndex*50+"px";
		}
		
		/*
		 * 选中列表图片的同时，显示当前图片
		 */
		var current;
		console.log(tabList);
		for(var i=0;i<tabList.length;i++){
			tabList[i].index=i;
			tabList[i].onmouseover=function(){
				if(current){
					current.className="tablist";
				}
				current=this;
				current.className="tablist bordercolor";
				smallUl.style.left=-this.index*300+"px";
				bigUl.style.left=-this.index*1200+"px";
				index=this.index;
			}
		}
		
		smallBox.onmouseenter=function(){
			oTool.className="tool active";
			bigBox.className="big-box  active";
		}
		outBox.onmousemove=function(e){
			var _e=window.event||e;
			//不能用 clientX   clientY ，他们是鼠标在浏览器可视区域的坐标      但是当浏览器窗口发生变化时，坐标也会发生相应变化
			var x=_e.offsetX-oTool.offsetWidth/2;  // 移动工具盒子时   到父元素左边距距离
			var y=_e.offsetY-oTool.offsetHeight/2;// 移动工具盒子时   到父元素上边距距离
			if(x<0){
				x=0;
			}
			if(y<0){
				y=0
			}
			//小盒子的宽度-移动的盒子的宽度为右边界
			if(x>smallBox.offsetWidth-tool.offsetWidth){
				x=smallBox.offsetWidth-tool.offsetWidth;
			}
			if(y>smallBox.offsetHeight-tool.offsetHeight){
				y=smallBox.offsetHeight-tool.offsetHeight;
			}
			oTool.style.left=x+"px";
			oTool.style.top=y+"px";
			imgList[index].style.left=-x*4+"px";
			imgList[index].style.top=-y*4+"px";
		}
		smallBox.onmouseleave=function(){
			oTool.className="tool";
			bigBox.className="big-box";
		}