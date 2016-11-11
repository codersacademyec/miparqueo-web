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
        var params = {hD: new Date(vm.filter.hD), hH: new Date(vm.filter.hH), tV: vm.filter.tV, pId : vm.filter.pId};
        navService.buscarDisponibilidad(params).then(function(data) {
          console.log(data);
          vm.filter.puesto = data;
          $('#search').collapse("hide");
          $('#searchPanel').collapse("show");
          $scope.$digest();
        });
      });
    };

    vm.cambiarModoPago = function(){
      if(vm.filter.tP == '0'){
        $('#pagoPanel').collapse("hide");
      }else{
        $('#pagoPanel').collapse("show");
      }
    }

    vm.reservar = function(){
      
    };
}