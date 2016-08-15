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

	
	.controller('loginController', function($scope) {

		$scope.title = 'loginController';

	})
	.controller('logincontController', function($scope,$stateParams) {

		$scope.title = 'loginController';

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