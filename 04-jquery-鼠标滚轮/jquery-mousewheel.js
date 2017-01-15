(function(){

/*jquery 封装鼠标滚轮滚动事件
 * 参数：fn 为传入的函数     这个函数需要传入一个参数n  
 *     之后可以获取他的属性值 n.dir   若是"up",则鼠标是向上滚动       若是"down"，则鼠标是向下滚动
 **/
 $.fn.mousewheel=function(fn){
	//this   指的是调用该函数jquery对象  ，需要转变为js原生对象  this[0]
	//火狐中DOMMouseScroll事件只能用事件监听的方式绑定     定义一个函数，给对象用事件监听的方式绑定事件
	on(this[0],"mousewheel",handler);  //谷歌      IE  鼠标滚轮滚动
	on(this[0],"DOMMouseScroll",handler); // 火狐    鼠标滚轮滚动
	
	
	/*定义的函数handler 为鼠标滚轮滚动时的回调函数
	 * 参数为e  是事件对象
	 */
	function handler(e){
		if(e.detail==-3||e.wheelDelta==120){//鼠标滚轮向上滚动
			//alert("向上滚动");
			e.dir="up";//给事件对象添加一个属性及属性值   {dir:"up"} 代表鼠标滚轮向上
		}else{//鼠标滚轮向下滚动
			//alert("向下滚动");
			e.dir="down";//给事件对象添加一个属性及属性值   {dir:"down"}  代表鼠标滚轮向下
		}
		
		fn(e);
	}
	//火狐中DOMMouseScroll事件只能用事件监听的方式绑定     定义一个函数，给对象用事件监听的方式绑定事件
	/*事件监听的的方式绑定事件  
	 * 参数 ：1.event    事件处理程序    函数function
	 *     2. dom     事件目标            原生js对象
	       3. name    事件名称          
	*/
	function on(dom,name,event){
		if(dom.addEventListener){//标准模式
			dom.addEventListener(name,event)
		}else{//IE 低版本
			dom.attachEvent("on"+name,event)
		}
	}
}
})()
