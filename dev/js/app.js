angular.module('MiParking', ['ui.router', 'chart.js', 'easypiechart'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
      .state('home', {
        url: '/',
        sticky: true,
        dsr: true,
        views: {
          'navView': {
            templateUrl: 'templates/nav.html'
          },
          'contentView': {
            templateUrl: 'templates/index.html',
            controller: 'indexCtrl'
          }
        }
      });
    }]);