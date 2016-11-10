angular.module('MiParking').controller('navCtrl', ['$scope', 'navService', navCtrl]);

function navCtrl($scope, navService){

    var vm = this;

    $.material.init();

    vm.filter = {};
    vm.resultBusq = [];

    vm.showDisponibilidad = function () {
      $('#hD').bootstrapMaterialDatePicker({ date: true });
      $('#hH').bootstrapMaterialDatePicker({ date: true });
      $('#busqueda-dialog').modal();
    }

    vm.buscarDisponibilidad = function () {

      navService.buscarDisponibilidad(vm.filter).then(function(data) {
        console.log(data);
        vm.resultBusq = data;
        $('#busqueda-dialog').modal('hide');
        $scope.$digest();
      });
    }
}