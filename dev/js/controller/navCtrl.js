angular.module('MiParking').controller('navCtrl',['$scope','navService', navCtrl]);

function navCtrl($scope, navService){

    var vm = this;

    $.material.init();

    vm.filter = [];
    vm.resultBusq = [];

    vm.showDisponibilidad = function () {
      $('#busqueda-dialog').modal();
    }

    vm.buscarDisponibilidad = function () {
      console.log(data);
      navService.buscarDisponibilidad(filter).then(function(data) {
        console.log(data);
        vm.resultBusq = data;
        $scope.$digest();
      });
    }

}