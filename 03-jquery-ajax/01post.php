<?php
  $u=$_POST("uName");
  $p=$_POST("uPwd");
  //admin    123456
  if($u=="admin"&&$p=="123456"){
  	echo "1";//输入正确
  }else{
  	echo "0";//输入错误
  }
?>