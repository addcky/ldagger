angular.module('lifetools.controllers', [])
.controller('dd',function($timeout,$rootScope,$scope, $http, $ionicLoading,$ionicPopup){
	
	//获取当前日期
	$scope.getdate = function(){
		$scope.dates = new Date();
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
	
	
	/*
	 
	 * 今日天气
	 * 
	 * */
	//今日天气变量的集合对象
	var clime = $scope.clime = {};
	clime.tag = true;
	//今日历史变量的集合对象
	var datas = $scope.datas = {};
	datas.tag = true;
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
		$http.get('view/history.php', {
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
					$scope.obj.data = data.date.split("年")[0] + '年';
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
				$scope.hide();
				$rootScope.showAlert('网络错误','请检查网络···');
			}
		}).error(function(){
			$scope.hide();
			$rootScope.showAlert('网络错误','请刷新···');
		});
	}
		//----默认加载内容
	$scope.getMs();
	//重置为当前日期
	datas.gotoday = function(){
		$scope.getdate();
		$scope.getMs();
		window.screenTop();
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

})
.controller('infoController', function($timeout,$rootScope,$scope, $http, $ionicLoading,$ionicPopup) {
	var clime = $scope.clime = {};
	//今日历史变量的集合对象
	var siri = $scope.siri = {};
	siri.tag = true;
	//请求今天日历数据
	clime.getDateMs = function(){
		$http.get('view/calendar.php').success(function(res){
			console.log(res);
		});
	}
	clime.getDateMs();
	/*ionic.DomUtil.ready(function(){
		//console.log(document.querySelectorAll('.sidr'));
		angular.element(document.querySelectorAll('.sidr')).on('click',function(){
			console.log(clime);
		})
	});
	$timeout(function(){
		console.log(document.querySelectorAll('.sidr'));
		var sidr = document.querySelectorAll('.sidr');
		//angular.element(sidr).hasClass('tab-active') && ?
		angular.element(sidr).on('click',function(){
			console.log(this.prototype);
			if(this.textContent == '今日天气'){
				datas.hist=true;
			}else{
				datas.hist=false;
			}
			
			
		})
		
		
	},700)*/
	
	
	
	
			//---上拉加载更多

		/*$scope.$on('stateChangeSuccess', function() {
		  datas.loadMore();
		  console.log('1')

		});*/

	})
	.controller('tab2Controller', function($rootScope,$scope, $http, $ionicLoading,$ionicPopup) {

		
	})
	.controller('tab3Controller', function($scope) {

		$scope.title = 'tab3Controller';

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
			}
			
		}
	});
	}
	
	datas.getMs();
	datas.doRefresh = function(){
		datas.getMs();
		$scope.$broadcast('scroll.refreshComplete');
	}
	//console.log($stateParams);

})