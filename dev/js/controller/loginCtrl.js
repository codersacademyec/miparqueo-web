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
      });
  };

  // busca el tipo de rol del usuario logueado
  vm.setRol = function(){
    loginService.setRol().then(function(res){
        getDatosRole();
    });
  };

  // obtiene la informacion del usuario segun el rol
  getDatosRole = function(){
    if($rootScope.user.rol == 'admin'){
      vm.buscarUsuariosParqueos();
    }else{
      vm.buscarReservasDia();
      vm.estadisticasAnual();
    }
  };
}