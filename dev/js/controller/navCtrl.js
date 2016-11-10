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
      return navService.getParqueoUsuario($rootScope.user).then(function(res) {
        vm.filter.pId = res.data[0].parqueo;
        vm.filter.hD =  new Date(vm.filter.hD);
        vm.filter.hH =  new Date(vm.filter.hH);
        navService.buscarDisponibilidad(vm.filter).then(function(data) {
          console.log(data);
          vm.filter.puesto = data;
          $('#search').collapse("hide");
          $('#searchPanel').collapse("show");
          $scope.$digest();
        });
      });
    };

    vm.reservar = function(){
      
    };
}