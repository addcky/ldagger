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
		$http.get('view/calendar.php',{
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
	
	wth.city = '广州';
	wth.getWthMs = function(){
		$http.get('view/weather.php',{
			params:{
				city: wth.city				
			}
		}).success(function(res){
			//console.log(res);
			if(res.reason === 'successed!'){
				//console.log(res.result.data);
				$rootScope.wthMore = wth.res = res.result.data;
				//wth.res = res.result.data;
				//wth.arrYMD = wth.res.date.split('-');
				
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
    	$http.get('view/joker.php',{
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
    	$http.get('view/phone.php',{
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
    
    