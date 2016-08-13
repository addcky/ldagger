<?php
	header('Content-type:text/html;charset=utf-8');
	/*$year = $_GET['year'];
	$month = $_GET['month'];*/
	$city = $_GET['city'];
    $ch = curl_init();
    $url = 'http://op.juhe.cn/onebox/weather/query?cityname='.$city.'&dtype=&key=9d1a4a1cad38e29e650aabfb8c2606ba';
    /*$header = array(
        '',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);*/
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
    //var_dump(json_decode($res));
	echo $res;
?>