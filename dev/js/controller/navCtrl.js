angular.module('MiParking').controller('navCtrl', ['$scope', 'navService', 'AccountService', navCtrl]);

function navCtrl($scope, navService){

    var vm = this;

    $.material.init();

    vm.filter = {};
    vm.resultBusq = [];

    vm.showDisponibilidad = function () {
      $('#busqueda-dialog').modal();
    }

    // busca si hay usuario logueado
    AccountService.currentUser()
    .then(function(user) {
        if (user || $scope.user) {
            $scope.user = user ? user : $scope.user;
            Stamplay.Object("usuarios").get({owner: $scope.user._id})
                .then(function(res) {
                    $scope.user.perfil = res.data[0];
                }, function(err) {
                    console.log(err);
                });
        }else{
            console.log('No hay usuario logueado');
            $('#login-dialog').modal();
        }
    });

    vm.buscarDisponibilidad = function () {
      navService.getParqueoUsuario($scope.user).then(function(res) {
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
    }

}