<?php
	header('Access-Control-Allow-Origin:*');
	header('Content-type:text/html;charset=utf-8');
	$pic = $_GET['joker'];
    $ch = curl_init();
    $url = 'http://v.juhe.cn/joke/randJoke.php?type='.$pic.'&key=c18f7ab110788ccfb81fbeac033dfc1e';
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
	echo $res;
?>