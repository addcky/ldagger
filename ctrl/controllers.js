angular.module('lifetools.controllers', [])
.directive('firstsvg',[function(){
	return {
		restrict:'E',
		replace:true,
		transclude:true,
		templateUrl:'templates/firstsvg.html',
		link:function(scope,element,attrs){
			if(!localStorage.getItem('firstSvgShow')){
				localStorage.setItem('firstSvgShow',true);
				scope.firstSvgShow = true;
			}
			scope.dayinBox = ['写到最后才发现...','我没有UI美工的设计...','我没有后端数据库...','我没有提要求的产品经理...','罢了罢了...'];
			
			
			scope.slideHasChanged = function(idx){
				if(idx ==3){
					
					scope.dayin = ['','','','',''];
					scope.dayinTag = [1,1,1,1,1];
					
						//逐字打印scope.dayinBox里的内容，仿打印机效果
						clearInterval(scope.st1);
						scope.st1 = setInterval(function(){
							if(scope.dayinTag[0] > scope.dayinBox[0].length){
								clearInterval(scope.st1);
							}else{
								scope.dayin[0] = scope.dayinBox[0].substring(0,scope.dayinTag[0]++);
								scope.$apply();
							}
							
						},500);
						clearInterval(scope.st2);
						clearTimeout(scope.sot2);
						scope.sot2 = setTimeout(function(){
							scope.st2 = setInterval(function(){
								if(scope.dayinTag[1] > scope.dayinBox[1].length){
									clearInterval(scope.st2);
									clearTimeout(scope.sot2);
								}else{
									scope.dayin[1] = scope.dayinBox[1].substring(0,scope.dayinTag[1]++);
									scope.$apply();
								}
							},500);
						},5000);
						clearInterval(scope.st3);
						clearTimeout(scope.sot3);
						scope.sot3 = setTimeout(function(){
							scope.st3 = setInterval(function(){
								if(scope.dayinTag[2] > scope.dayinBox[2].length){
									clearInterval(scope.st3);
									clearTimeout(scope.sot3);
								}else{
									scope.dayin[2] = scope.dayinBox[2].substring(0,scope.dayinTag[2]++);
									scope.$apply();
								}
							},500);
						},11500);
						clearInterval(scope.st4);
						clearTimeout(scope.sot4);
						scope.sot4 = setTimeout(function(){
							scope.st4 = setInterval(function(){
								if(scope.dayinTag[3] > scope.dayinBox[3].length){
									clearInterval(scope.st4);
									clearTimeout(scope.sot4);
								}else{
									scope.dayin[3] = scope.dayinBox[3].substring(0,scope.dayinTag[3]++);
									scope.$apply();
								}
							},500);
						},17000);
						clearInterval(scope.st5);
						clearTimeout(scope.sot5);
						scope.sot5 = setTimeout(function(){
							scope.st5 = setInterval(function(){
								if(scope.dayinTag[4] > scope.dayinBox[4].length){
									clearInterval(scope.st5);
									clearTimeout(scope.sot5);
								}else{
									scope.dayin[4] = scope.dayinBox[4].substring(0,scope.dayinTag[4]++);
									scope.$apply();
								}
							},500);
						},24000);
					
				}else{
					scope.dayin = ['','','','',''];
					
				}
			}
			//scope.firstSvgShow = true;
			scope.enterapp = function(){
				clearInterval(scope.st1);
				clearInterval(scope.st2);
				clearTimeout(scope.sot2);
				clearInterval(scope.st3);
				clearTimeout(scope.sot3);
				clearInterval(scope.st4);
				clearTimeout(scope.sot4);
				clearInterval(scope.st5);
				clearTimeout(scope.sot5);
				scope.firstSvgShow = false;
			}
		}
	}
}])
.controller('cookController', function($rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	//弹窗
	$rootScope.showAlert = function(title,template,text) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			okText: '确定',
			template: '<p style="width:100%;text-align:center;">'+template+'</p>',
		});
		alertPopup.then(function(res) {
			//console.log(text);
		});
	};
	$rootScope.alertRefresh = function(){
		$scope.hide();
		$rootScope.showAlert('网络错误','请刷新···');
	}
	$rootScope.alertCheck = function(){
		$scope.hide();
		$rootScope.showAlert('网络错误','请检查网络···');
	}
	$rootScope.alertNoCity = function(){
		$scope.hide();
		$rootScope.showAlert('日日天气','咱不支持该城市或者输入错误···');
	}
	
	
	var cook = $scope.cook ={};
	cook.noData = '';
	cook.slideChanged = cook.pagerClick = function(idx){
		
		if(idx == 1){
			cook.token = localStorage.getItem('token');
			if(cook.token!== null && cook.token !== ''){
				cook.space = false;
				cook.data = JSON.parse(localStorage.getItem('user-'+cook.token)).data;
				if(cook.data){
					cook.noData = '';
					//console.log(cook.data);
				}else{
					cook.noData = '厨房空空如也。';
				}
				
			}else{
				cook.space = true;
			}
		}
	}
	cook.getCookMs = function(){
 		if(cook.name != '' && cook.name != ' '){
 			$http.get('http://wx.addcky.top/xiaobai/cookname.php',{
 				params:{
 					name:cook.name
 				}
 			}).success(function(res){
 				if(res.reason === 'Success'){
 					cook.res = res.result.data
 				}
 				
 			})
 		}		
 	}
 	cook.getCookListMs = function(listName){		
 		$http.get('http://wx.addcky.top/xiaobai/cooklistname.php',{
  			params:{ 							
 				listname:listName
  			}
  		}).success(function(res){
 			if(res.reason === 'Success'){
 				cook.res = res.result.data;
 				//console.log(res.result.data)
  			}			
 		});
	}
	
	cook.setCookMs = function(that){
		cook.token = localStorage.getItem('token');
		
		if(cook.token!== null && cook.token !== ''){
			cook.oldValue = JSON.parse(localStorage.getItem('user-'+cook.token));
			//console.log(cook.oldValue);
			cook.newObj = {};
			cook.newObj.username = cook.oldValue.username;
			cook.newObj.psw = cook.oldValue.psw;
			if(!cook.oldValue.data){
				cook.newObj.data = [that];
				localStorage.setItem(('user-'+cook.token),JSON.stringify(cook.newObj));
				$rootScope.showAlert('','已成功保存到"我的私房菜"');
			}else{
				cook.bt = true;
				for(var i=0;i<cook.oldValue.data.length;i++){
					if(cook.oldValue.data[i].id === that.id){
						cook.bt = false;
						$rootScope.showAlert('','请勿重复保存同一食谱');
						break;
					}
				}
				if(cook.bt){
					cook.oldValue.data.unshift(that);
					cook.newObj.data = cook.oldValue.data;
					localStorage.setItem(('user-'+cook.token),JSON.stringify(cook.newObj));
					$rootScope.showAlert('','已成功保存到"我的私房菜"');
				}
			}
		}else{
			$rootScope.showAlert('','请先登录');
		}
		
	}
	cook.dele = function(that){
		cook.oldValue = JSON.parse(localStorage.getItem('user-'+cook.token));
		//console.log(cook.oldValue);
		cook.newObj = {};
		cook.newObj.username = cook.oldValue.username;
		cook.newObj.psw = cook.oldValue.psw;
		cook.newObj.data = [];
		for(var i=0; i<cook.oldValue.data.length;i++){
			if(cook.oldValue.data[i].id != that.id){
				cook.newObj.data.push(cook.oldValue.data[i])
			}
		}
		cook.data = cook.newObj.data;
		localStorage.setItem(('user-'+cook.token),JSON.stringify(cook.newObj));
	}
	cook.enterKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
        	cook.getCookMs();
        }
	}
		
})
.controller('infoController', function($rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	//--------------------------info--------------------------------
	
	//获取当前日期
	$scope.getdate = function(){
		$scope.dates = new Date();
		$scope.year = $scope.dates.getFullYear();
		$scope.month = $scope.dates.getMonth()+1;
		$scope.date = $scope.dates.getDate();
	}
	$scope.getdate();
	
	//有请求数据加载时遮罩层显示和隐藏
	$scope.show = function() {
		$ionicLoading.show({
			template: '<i class="icon ion-ios-infinite loadlogo"></i>',//'Loading...'
			noBackdrop:true
		});
	};
	$scope.hide = function() {
		$ionicLoading.hide();
	};
	
	
	
	/*
	 
	 * 今日天气
	 * 
	 * */
	//今日天气变量的集合对象
	
	var wth = $scope.wth = {};
	wth.tag = true;
	//今日历史变量的集合对象
	var datas = $scope.datas = {};
	datas.tag = true;
	//今日助理变量的集合对象
	var siri = $scope.siri = {};
	siri.tag = true;
	//请求今天日历数据
	wth.calenShow = false;
	wth.getDateMs = function(){
		$http.get('http://wx.addcky.top/xiaobai/calendar.php',{
			params:{
				year: $scope.year,
				month: $scope.month,
				date: $scope.date
			}
		}).success(function(res){
			
			if(res.reason === 'Success' || res.reason === 'success'){
				wth.resp = res.result.data;
				wth.arrYMD = wth.resp.date.split('-');
				//console.log(wth.resp);
			}else{
				$rootScope.alertCheck();
			}
		}).error(function(){
			$rootScope.alertRefresh();
		});
	}
	wth.getDateMs();
	wth.calenClick = function(){
		wth.calenShow?wth.calenShow = false:wth.calenShow = true;
		
	}
	if(localStorage.getItem('wthcity')){
		wth.city = localStorage.getItem('wthcity');
	}else{
		wth.city = '广州';
	}
	wth.getWthMs = function(){
		$http.get('http://wx.addcky.top/xiaobai/weather.php',{
			params:{
				city: wth.city				
			}
		}).success(function(res){
			if(res.reason === 'successed!'){
				//console.log(res.result.data);
				$rootScope.wthMore = wth.res = res.result.data;
				localStorage.setItem('wthcity',wth.city);
			}else if(res.reason === '暂不支持该城市'){
				$rootScope.alertNoCity();
			}else{
				$rootScope.alertCheck();
			}
		}).error(function(){
			$rootScope.alertRefresh();
		});
	}
	wth.getWthMs();
	wth.enterKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13 && wth.city != ''){
            //console.log('2');
            wth.getWthMs();
        }
    };
    wth.doRefresh = function(){
    	wth.getDateMs();
		wth.getWthMs();
		$scope.$broadcast('scroll.refreshComplete');
	}
	
	
	
	/*
	 
	 * 今日历史
	 * 
	 * */
	
	//今日历史“查看更多”提示区域默认隐藏
	datas.lookMore = false;
	//今日历史搜索框默认文本值
	datas.txtdate = '';
	
	//今日历史发送请求，获取数据
	$scope.getMs = function(isLoadingShow) {
		if(!isLoadingShow){
			$scope.show();
			//console.log('2')
		}
		$http.get('http://wx.addcky.top/xiaobai/history.php', {
			params: {
				month: $scope.month,
				date: $scope.date
			}
		}).success(function(res) {
			//console.log(res);
			if(res.reason === 'success'){
				$scope.num = 0;
				$scope.rest = [];
				$scope.hitem = [];
				angular.forEach(res.result, function(data, idx, arr) {
					$scope.obj = {};
					$scope.obj.title = data.title;
					$scope.obj.e_id = data.e_id;
					$scope.obj.data = data.date.split("年")[0];
					$scope.rest.unshift($scope.obj);
				});
				$scope.hide();
				for(var i = 0; i < 10; i++) {
					$scope.hitem.push($scope.rest[i]);
				}
				datas.lookMore = true;
				datas.moretxt = '上拉查看更多';
				datas.stopMore = true;
				datas.loadMore = function() {
					//console.log('s:'+$scope.rest.length);
					$scope.hitem = [];
					$scope.num += 10;
					if($scope.num < $scope.rest.length) {
						for(var i = 0; i < $scope.num; i++) {
							$scope.hitem.push($scope.rest[i]);
						}
						//console.log($scope.hitem);
					} else {
						$scope.hitem = $scope.rest;
						datas.stopMore = false;
						datas.moretxt = '没有更多了...'
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');
				};				
			}else{
				$rootScope.alertCheck();
			}
		}).error(function(){
			$rootScope.alertRefresh();
		});
	}
		//----默认加载内容
	$scope.getMs();
	//重置为当前日期
	datas.gotoday = function(){
		$scope.getdate();
		$scope.getMs();
	}
	//下拉刷新
	datas.doRefresh = function(){
		$scope.getMs(true);
		$scope.$broadcast('scroll.refreshComplete');
	}
	//回车获取搜索框文本，发送请求
	datas.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            //console.log('2');
            $scope.dealtxt = /^((([13578]|(1[02]))(\-|\/|\.)([1-9]|([12]\d)|(3[01])))|(([469]|11)(\-|\/|\.)([1-9]|([12]\d)|30))|(2(\-|\/|\.)([1-9]|([12]\d))))$/
			if(datas.txtdate != '') {
				if(!$scope.dealtxt.test(datas.txtdate)){
					$rootScope.showAlert('日期输入错误','参考格式 为三种(月/日)，例如：6/18 or 6-18 or 6.18');				
				}else{				
					$scope.month = datas.txtdate.split(/\-|\/|\./)[0];
					$scope.date = datas.txtdate.split(/\-|\/|\./)[1];
					//console.log($scope.month);
					$scope.getMs();
				}
			}
        }
    };
    /*
	 
	 * 生活小助理
	 * 
	 * */
    siri.getJokerMs = function(joker,opt){
    	$http.get('http://wx.addcky.top/xiaobai/joker.php',{
    		params:{
    			joker:joker
    		}
    	}).success(function(res){
    		if(res.reason === 'success'){
    			if (opt === 'joker'){
    				siri.joker = res.result[0].content;
    				
    			}else{
    				siri.img = res.result[0];
    				//console.log(siri.img);
    			}
    		}else{
				$rootScope.alertCheck();
			}
    	}).error(function(){
			$rootScope.alertRefresh();
		});   	
    }
    siri.getJokerMs('','joker');//getJoker
    siri.getJokerMs('pic','pic');//getPic
    //console.log(siri.joker[0].content);
    siri.getPhoneMs = function(){
    	$http.get('http://wx.addcky.top/xiaobai/phone.php',{
    		params:{
    			phone:siri.phone
    		}
    	}).success(function(res){
    		if(res.reason === 'Return Successd!'){
    			siri.res = ['地区：'+res.result.province+res.result.city,
    			            '类型：'+res.result.company+res.result.card];
    		}else{
    			siri.res = [res.reason,''];
			}
    	}).error(function(){
			$rootScope.alertRefresh();
		});   	
    }
    siri.enterKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13 && siri.phone != ''){
            //console.log('2');
        	siri.getPhoneMs();
        }
    };
    siri.doRefresh = function(){
    	siri.getJokerMs('','joker');//getJoker
        siri.getJokerMs('pic','pic');
		$scope.$broadcast('scroll.refreshComplete');
	}
    
    
	})
.controller('cookcontController', function($stateParams,$rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	var cook = $scope.cook = {};
	cook.id = $stateParams.id.split('-')[0];
	cook.title = $stateParams.id.split('-')[1];
	cook.getCookMs = function(){
		$http.get('http://wx.addcky.top/xiaobai/cookid.php',{
			params:{
				id:cook.id
			}
		}).success(function(res){			
			if(res.reason === 'Success'){
				cook.res = res.result.data[0];			
			}			
		});
	}
	cook.getCookMs();
	cook.doRefresh = function(){
		cook.getCookMs();
		$scope.$broadcast('scroll.refreshComplete');
	}
})

	
	.controller('loginController', function($rootScope,$scope) {
		var sign = $scope.sign = {};
		sign.token = localStorage.getItem('token');
		(sign.token === '' || sign.token === null)?($rootScope.signIn = false):(function(){
			$rootScope.signIn = true;
			$rootScope.signUname = sign.token;
		})();
		sign.signUp = function(){
			localStorage.setItem('token','');
			$rootScope.signIn = false;
		}
	})
	.controller('logincontController', function($rootScope,$scope,$stateParams) {
		var reg = $scope.reg = {},
			log = $scope.log = {};
			reg.uName = '';
			reg.psw = '';
			reg.sPsw = '';
			log.uName = '';
			log.psw = '';
			reg.uNameTips = '';
			reg.pswTips = '';
			reg.vPswTips = '';
		$stateParams.id === 'reg'?reg.view = true : reg.view = false;
		reg.vName = function(){
			/^[a-z0-9_-]{3,16}$/.test(reg.uName)?(localStorage.getItem('user-'+reg.uName) !== null?reg.uNameTips = '该用户名已被注册':reg.uNameTips = ''):reg.uNameTips = '必须3-16位（a-z,0-9,_）';			
		}
		reg.vPsw = function(){
			/^[a-z0-9_-]{6,18}$/.test(reg.psw)?reg.pswTips = '':reg.pswTips = '必须6-18位（a-z,0-9,_）'
		}
		reg.vsPsw = function(){
			reg.psw === reg.sPsw?reg.vPswTips = '':reg.vPswTips = '确认密码不一致';
		}
		reg.sub = function(){
			if(/^[a-z0-9_-]{3,16}$/.test(reg.uName) && localStorage.getItem('user-'+reg.uName) === null && /^[a-z0-9_-]{6,18}$/.test(reg.psw) && reg.psw === reg.sPsw){
				$rootScope.signIn = true;
				$rootScope.signUname = reg.uName;
				localStorage.setItem('token',reg.uName);
				reg.obj = {};
				reg.obj.username = reg.uName;
				reg.obj.psw = reg.psw;
				localStorage.setItem('user-'+reg.uName,JSON.stringify(reg.obj));
				$rootScope.showAlert('','注册成功');
				window.location.href = '#/tab/login';
			}else{
				$rootScope.showAlert('Warm and Sweet remind','请正确填写注册信息');
			}
		}
		log.sub = function(){
			if(localStorage.getItem('user-'+log.uName) === null){
				$rootScope.showAlert('Warm and Sweet remind','该账户未注册');
			}else{
				log.obj = JSON.parse(localStorage.getItem('user-'+log.uName));
				if(log.uName === log.obj.username && log.psw === log.obj.psw){
					$rootScope.signIn = true;
					$rootScope.signUname = log.uName;
					console.log($rootScope.signUname);
					localStorage.setItem('token',log.uName);
					window.location.href = '#/tab/login';
				}else{
					$rootScope.showAlert('Warm and Sweet remind','账号或者密码错误');
				}
			}
			
		}
	})
.controller('wthcontController', function($rootScope,$scope,$stateParams) {
	$scope.wthInfo1 = ['穿衣','紫外线','运动','感冒','洗车','空调','污染'];
	$scope.wthInfo2=[
		$rootScope.wthMore.life.info.chuanyi,
		$rootScope.wthMore.life.info.ziwaixian,
		$rootScope.wthMore.life.info.yundong,
		$rootScope.wthMore.life.info.ganmao,
		$rootScope.wthMore.life.info.xiche,
		$rootScope.wthMore.life.info.kongtiao,
		$rootScope.wthMore.life.info.wuran
	];
})
.controller('hiscontController', function($rootScope,$scope, $stateParams, $http) {
	var datas = $scope.datas ={}
	
	datas.getMs = function(){
		$http.get('http://wx.addcky.top/xiaobai/historyId.php', {
			params: {
				id: $stateParams.id
			}
		}).success(function(res) {
			//console.log(res)
			if(res.reason === 'success'){
				$scope.rest = res.result[0];
				datas.content = [];
				$scope.arr = $scope.rest.content.split('\r\n');//.replace(/\r\n/g, 'adslkjaz').replace(/\s*/g, '')
				angular.forEach($scope.arr, function(data, idx, arr) {
					if(data != '') {
						datas.content.push(data);
					}
				});
				//console.log(datas.content);
			}else{
				if(res.result == null){
					$rootScope.showAlert('','详细内容正在搬运中，敬请谅解...');
				}else{
					$rootScope.alertCheck();
				}
				
			}
		}).error(function(){
			$rootScope.alertRefresh();
		});
	}
	
	datas.getMs();
	datas.doRefresh = function(){
		datas.getMs();
		$scope.$broadcast('scroll.refreshComplete');
	}
	//console.log($stateParams);

})