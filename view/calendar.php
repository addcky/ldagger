<?php
	header('Content-type:text/html;charset=utf-8');
	/*$id = $_GET['id'];*/
	/*$page = $_GET['page'];*/
    $ch = curl_init();
    $url = 'http://japi.juhe.cn/calendar/day?date=2016-8-12&key=23e0cd9ecc6d4183e94de7e7b1fa8130';
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