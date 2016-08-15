// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('lifetools', ['ionic','lifetools.controllers'])


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.tabs.style("standard"); // 参数可以是： standard | striped   
	$ionicConfigProvider.tabs.position("bottom"); //参数可以是：top | bottom
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract:true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.info', {
    url: '/info',
    views:{
        'tab-info':{
            templateUrl: "templates/tab-info.html",
            controller:'infoController'
        }
    }
  })
  .state('tab.cook', {
      url: '/cook',
      views:{
          'tab-cook':{
              templateUrl: "templates/tab-cook.html",
              controller:'cookController'
          }

      }

  })
  .state('tab.login', {
      url: '/login',
      views:{
          'tab-login':{
              templateUrl: "templates/tab-login.html",
              controller:'loginController'
          }

      }

  })
  .state('tab.logincont', {
      url: '/logincont/:id',
      views:{
          'tab-login':{
              templateUrl: "templates/slide-logincont.html",
              controller:'logincontController'
          }

      }

  })
  .state('tab.cookcont', {
      url: '/cookcont/:id',
      views:{
          'tab-cook':{
              templateUrl: "templates/tab-cookcont.html",
              controller:'cookcontController'
          }

      }

  })
  .state('tab.hiscont', {
      url: '/hiscont/:id',
      views:{
          'tab-info':{
              templateUrl: "templates/tab-hiscont.html",
              controller:'hiscontController'
          }

      }

  })
  .state('tab.wthcont', {
      url: '/wthcont/:id',
      views:{
          'tab-info':{
              templateUrl: "templates/slide-wthcont.html",
              controller:'wthcontController'
          }
      }

  })

  .state('news', {
         url: '/news',
        templateUrl: "templates/news.html"

    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/cook');

});
