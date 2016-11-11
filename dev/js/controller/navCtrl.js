angular.module('MiParking').controller('navCtrl', ['$scope','$rootScope' , 'navService', 'AccountService', navCtrl]);

function navCtrl($scope, $rootScope, navService){

    var vm = this;

    $.material.init();

    vm.filter = {};
    vm.validatePayphone = false;
    vm.validate = false;

    visibility = function(bool){
      $('#hd').prop('disabled',bool);
      $('#hh').prop('disabled',bool);
      $('#tv').prop('disabled',bool);
      $('#search').collapse(!bool?"show":"hide");
      $('#searchPanel').collapse(!bool?"hide":"show");
    }

    vm.showDisponibilidad = function () {
      vm.filter = {};      
      vm.validatePayphone = false;
      vm.validate = false;
      visibility(false);
      $('#busqueda-dialog').modal();
    };

    vm.buscarDisponibilidad = function () {
      //if($('#searchForm').$valid){
        return navService.getParqueoUsuario($rootScope.user).then(function(res) {
          vm.filter.pId = res.data[0].parqueo;
          var params = {hD: new Date(vm.filter.hD), hH: new Date(vm.filter.hH), tV: vm.filter.tV, pId : vm.filter.pId};
          navService.buscarDisponibilidad(params).then(function(data) {
            if(data){
              console.log(data);
              vm.filter.puesto = data;
              visibility(true);
              vm.validate = true;
              $scope.$digest();
            }
          });
        }, function( err ){
              console.error(err);
        });
      //}
    };

    vm.cambiarModoPago = function(){
      if(vm.filter.tP == '0'){
        $('#pagoPanel').collapse("hide");
        vm.validatePayphone = false;
      }else{
        $('#pagoPanel').collapse("show");
        vm.validatePayphone = true;
      }
    }

    vm.reservar = function(){
      
    };
}