<?php
	header('Access-Control-Allow-Origin:*');
	header('Content-type:text/html;charset=utf-8');
	$name = $_GET['name'];
    $ch = curl_init();
    $url = 'http://apis.juhe.cn/cook/query.php?menu='.$name.'&dtype=&pn=&rn=&albums=&key=3f83155cac7154759c2776d7362f5068';
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
	echo $res;
?>