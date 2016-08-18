<?php
	header('Access-Control-Allow-Origin:*');
	header('Content-type:text/html;charset=utf-8');
	$year = $_GET['year'];
	$month = $_GET['month'];
	$date = $_GET['date'];
    $ch = curl_init();
    $url = 'http://japi.juhe.cn/calendar/day?date='.$year.'-'.$month.'-'.$date.'&key=23e0cd9ecc6d4183e94de7e7b1fa8130';
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
	echo $res;
?>