angular.module('MiParking', ['ui.router', 'chart.js', 'easypiechart'])
    .factory('AccountService', ["$q", function($q) {
        return {
            currentUser: function() {
                var def = $q.defer();
                Stamplay.User.currentUser()
                    .then(function(response) {
                        if (response.user === undefined) {
                            def.resolve(false);
                        } else {
                            def.resolve(response.user);
                        }
                    }, function(error) {
                        def.reject();
                    });
                return def.promise;
            }
        };
    }])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
      .state('home', {
        url: '/',
        sticky: true,
        dsr: true,
        views: {
          'loginView': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl as ctrl'
          },
          'navView': {
            templateUrl: 'templates/nav.html',
            controller: 'navCtrl as ctrl'
          },
          'contentView': {
            templateUrl: 'templates/index.html',
            controller: 'indexCtrl as ctrl'
          }
        }
      });
    }]);