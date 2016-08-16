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
			scope.enterapp = function(){
				scope.firstSvgShow = false;
			}
			
			//console.log(scope.firstSvgShow)
			
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
	cook.space = true;
	cook.noSpace = false;
	
	/*cook.getCookMs = function(){
		if(cook.name != '' && cook.name != ' '){
			$http.get('view/cookname.php',{
				params:{
					name:cook.name
				}
			}).success(function(res){
				if(res.reason === 'Success'){
					cook.res = res.result.data
					console.log(cook.res.id)
				}
				
			})
		}		
	}
	cook.getCookListMs = function(listName){		
		$http.get('view/cooklistname.php',{
			params:{
				listname:listName
			}
		}).success(function(res){
			if(res.reason === 'Success'){
				cook.res = res.result.data
				//console.log(res.result.data)
			}
			
		})
	}*/
	cook.setCookMs = function(that){
		cook.token = localStorage.getItem('token');
		if(cook.token){
			cook.oldValue = localStorage.getItem('token'+cook.token);
			
			cook.cookieName = 'token-'+cook.token;
			cook.cookieValue = JSON.stringify(that);
			localStorage.setItem(cook.cookieName,cook.cookieValue);
			$rootScope.showAlert('','已成功保存到"我的私房菜"');
		}
		
	}
	cook.enterKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
        	cook.getCookMs();
        }
	}
		
})
.controller('infoController', function($rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	
	})
.controller('cookcontController', function($stateParams,$rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	var cook = $scope.cook = {};
	cook.id = $stateParams.id.split('-')[0];
	cook.title = $stateParams.id.split('-')[1];
	cook.getCookMs = function(){
		$http.get('view/cookid.php',{
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
	cook.setCookMs = function(that){
		cook.cookieName = 'cook-'+that.id;
		cook.cookieValue = JSON.stringify(that);
		localStorage.setItem(cook.cookieName,cook.cookieValue);
		$rootScope.showAlert('','已成功保存到"我的私房菜"');
	}
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
			/^[a-z0-9_-]{3,16}$/.test(reg.uName)?(localStorage.getItem('user-'+reg.uName) !== null?reg.uNameTips = '该用户名已被注册':reg.uNameTips = '该用户名可以注册'):reg.uNameTips = '必须3-16位（a-z,0-9,_）';			
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
		$http.get('view/historyId.php', {
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