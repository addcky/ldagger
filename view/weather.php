<?php
	header('Access-Control-Allow-Origin:*');
	header('Content-type:text/html;charset=utf-8');
	$city = $_GET['city'];
    $ch = curl_init();
    $url = 'http://op.juhe.cn/onebox/weather/query?cityname='.$city.'&dtype=&key=9d1a4a1cad38e29e650aabfb8c2606ba';curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
	echo $res;
?>