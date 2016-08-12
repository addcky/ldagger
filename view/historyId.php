<?php
	header('Content-type:text/html;charset=utf-8');
	$id = $_GET['id'];
	/*$page = $_GET['page'];*/
    $ch = curl_init();
    $url = 'http://v.juhe.cn/todayOnhistory/queryDetail.php?e_id='.$id.'&key=676c8739184009314eb721869467778b';
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