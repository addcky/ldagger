<?php
	header('Content-type:text/html;charset=utf-8');
	$phone = $_GET['phone'];
    $ch = curl_init();
    $url = 'http://apis.juhe.cn/mobile/get?phone='.$phone.'&dtype=&key=44e2dfec4a65144f1cd925b1a15570ac';
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