angular.module('MiParking').controller('loginCtrl',['$scope', '$rootScope', 'loginService', 'AccountService', loginCtrl]);

function loginCtrl($scope, $rootScope, loginService, AccountService){

	var vm = this;
	$.material.init();
	  // busca si hay usuario logueado
  AccountService.currentUser()
  .then(function(user) {
      if (user || $rootScope.user) {
          $rootScope.user = user ? user : $rootScope.user;
          Stamplay.Object("usuarios").get({owner: $rootScope.user._id})
              .then(function(res) {
                  $rootScope.user.perfil = res.data[0];
                  vm.setRol();
              }, function(err) {
                  console.log(err);
              });
      }else{
          console.log('No hay usuario logueado');
      }
  });

  // login con Stamplay
  vm.login = function() {
      loginService.login(vm.credenciales).then(function(res){
        getDatosRole();
        $rootScope.$digest();
      });
  };

  // busca el tipo de rol del usuario logueado
  vm.setRol = function(){
    loginService.setRol().then(function(res){
        getDatosRole();
        $rootScope.$digest();
    });
  };

  // obtiene la informacion del usuario segun el rol
  getDatosRole = function(){
    $scope.$apply();
    if($rootScope.user.rol == 'admin'){
      vm.buscarUsuariosParqueos();
    }else{
      vm.buscarReservasDia();
      vm.estadisticasAnual();
    }
  };

// obtiene todas las reserva del dia para el usuario logueado
  vm.buscarReservasDia = function(){
    loginService.buscarPorDia($rootScope.user).then(function(data) {
      console.log(data);
      $rootScope.reservas = data;
      $rootScope.$digest();
    });
  };

  // busca estadísticas del año actual
  vm.estadisticasAnual = function(){
    var codeblock = new Stamplay.Codeblock("reservasanual");
    codeblock.run({}).then(function (response) {
        $scope.data=[response];
        $scope.$digest();
    }, function( err ){
      console.error(err);
    });
  };

  // busca usuarios con rol parqueo
  vm.buscarUsuariosParqueos = function(){
    var codeblock = new Stamplay.Codeblock("usuariosparqueos");
    codeblock.run({}).then(function (res) {
        console.log(res);
        $rootScope.usuariosparqueo = res;
        $rootScope.$digest();
    }, function( err ){
      console.error(err);
    });
  }

}