angular.module('MiParking').controller('navCtrl', ['$scope','$rootScope' , 'navService', 'AccountService', navCtrl]);

function navCtrl($scope, $rootScope, navService){

    var vm = this;

    $.material.init();

    vm.filter = {};
    vm.resultBusq = [];

    vm.showDisponibilidad = function () {
      $('#busqueda-dialog').modal();
    };

    vm.buscarDisponibilidad = function () {
      returnnavService.getParqueoUsuario($rootScope.user).then(function(res) {
        vm.filter.pId = res.parqueo;
        vm.filter.hD =  new Date(vm.filter.hD);
        vm.filter.hH =  new Date(vm.filter.hH);
        navService.buscarDisponibilidad(vm.filter).then(function(data) {
          console.log(data);
          vm.resultBusq = data;
          $('#busqueda-dialog').modal('hide');
          $scope.$digest();
        });
      });
    };
}