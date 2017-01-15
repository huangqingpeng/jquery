$(function(){
	
	$.get("data.json",function(data){
		htmlLoad(data,0);
		bindDom(data);
	})
	
	function htmlLoad(data,index){
		console.log(data);
		var jsonData=data.list[0];//obj  日用百货
		var p=$('<p class="type"><img src="img/u28.png"><span>'+ jsonData.type+'</span></p>');
		p.appendTo($(".family"));
		var arrList=jsonData.list;//arr
		var ul=$('<ul class="content-ul"><ul>');
		ul.appendTo($(".family"));
		for(var i=0;i<arrList.length;i++){
			var li=$('<li class="content-list"><img src="img/u28.png">'+ arrList[i]+'</li>');
			li.appendTo(ul);
		}
		//加载表格数据
		
		var goodData=jsonData.goods;//arr  里面每个元素也是arr
		var tbody=$("#tbody");
		//for(var j=0;j<goodData.length;j++){
			var arr=goodData[index]
			$(".page dl dt span").html(index+1);
			for(var m=0;m<arr.length;m++){
				var tr=$("<tr></tr>");
			     tr.appendTo(tbody);
				var td=$('<td>'+m+'</td>'+
							'<td>'+arr[m].name+'</td>'+
							'<td>'+arr[m].type+'</td>'+
							'<td>'+arr[m].com+'</td>'+
							'<td>'+arr[m].num+'</td>'+
							'<td>'+arr[m].vcp+'</td>'+
							'<td class="btns">'+
							'<div class="show setBox">'+
								'<button class="del">删除</button>'+
							    '<button class="set">修改</button>'+
							'</div>'+
							'<div class="hide saveBox">'+
								' <button class="save">保存</button>'+
							    ' <button class="cancel">cancel</button>'+
							'</div>'+
							'</td>');
				td.appendTo(tr);			
			}
		//}
	}
	
	
	
	function bindDom(data){
		//点击下一页  显示下一页
		var index=0;
		$(".nextPage").click(function(){
			$("#tbody").html("");
			$(".family").html("");
			index+=1;
			if(index>3){
				index=3;
				alert("已经到最后一页")
			}
			htmlLoad(data,index);
		})
		
		//显示上一页
		$(".prevPage").click(function(){
			$("#tbody").html("");
			$(".family").html("");
			index-=1;
			if(index<0){
				index=0;
				alert("已经到第一页")
			}
			htmlLoad(data,index);
		})
		//首页
		$(".firstPage").click(function(){
			$("#tbody").html("");
			$(".family").html("");
			htmlLoad(data,0);
		})
		//尾页
		$(".lastPage").click(function(){
			$("#tbody").html("");
			$(".family").html("");
			htmlLoad(data,3);
		});
		
	
	
		//商品类目管理收起
		var contentSlide=true;//表示收起
		$(".nav-box .title").click(function(){
			if(contentSlide){
				$(".content").slideUp(500,function(){
					contentSlide=false;
				});
			}else{
				$(".content").slideDown(500,function(){
					contentSlide=true;
				});
			}
		   var html=$(this).find("span").html();
		   $(".from").find("span").html(html);
		})
		//商品类目管理下面的小类收起
		var contentUlSlide=true;//表示收起
		$(".nav-box").on("click",".content .type",function(){
			var texts=$(this).find("span").html();
			$(".goods").html(texts);
			if(contentUlSlide){
				$(this).next().slideUp(500,function(){
					contentUlSlide=false;
				});
			}else{
				$(this).next().slideDown(500,function(){
					contentUlSlide=true;
				});
			}
		})
		//促销活动收起
		var isSlide=true;//表示收起
		$(".del-box .title").click(function(){
			if(isSlide){
				$(".days").slideUp(500,function(){
					isSlide=false;
				});
			}else{
				$(".days").slideDown(500,function(){
					isSlide=true;
				});
			}
			 var html=$(this).find("span").html();
		   $(".from").find("span").html(html);
		})
		
	    //表格操作    修改
	    $("#tbody").on("click",".set",function(){
	   	    var  tr=$(this).parents("tr");
	   	    tr.on("click","td:not(.btns)",function(){
		    	var that=this;
		    	var tdText=$(this).html();
		    	console.log(tdText);
		    	var oIput=$('<input type="text" value="">');
		    	oIput.val(tdText);
		    	$(this).html(oIput);
		    	oIput.focus(function(){//获取焦点
		    		var thatInput=this;
		    		var inputText=$(this).val();
		    		console.log(inputText);
		    		$(this).click(function(){
		    			return false;//阻止冒泡
		    		})
		    	    $(this).blur(function(){//失去焦点
		    	    	$(that).html($(this).val());
		    		    $(".cancel").click(function(){//点击保存
			                $(that).html(inputText);
			                //显示删除 按钮
			                tr.find(".btns").find(".setBox").removeClass("hide").addClass("show");
			                tr.find(".btns").find(".saveBox").removeClass("show").addClass("hide");
			           })
		    	    })
		    	})
			    tr.find(".btns").find(".setBox").removeClass("show").addClass("hide");
			    tr.find(".btns").find(".saveBox").removeClass("hide").addClass("show");
			    $(".save").click(function(){//点击保存
			    	 //显示删除 按钮
			    	tr.find(".btns").find(".setBox").removeClass("hide").addClass("show");
			        tr.find(".btns").find(".saveBox").removeClass("show").addClass("hide");
			    })
	        })
	    })
	    //表格操作    删除
	   $("#tbody").on("click",".del",function(){
	   	     var  tr=$(this).parents("tr");
	   	     tr.remove();
	   })



    }


})
