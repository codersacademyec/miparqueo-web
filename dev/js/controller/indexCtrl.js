angular.module('MiParking').controller('indexCtrl',['$scope', '$rootScope', 'indexService', 'AccountService', indexCtrl]);

function indexCtrl($scope, $rootScope, indexService, AccountService){

	var vm = this;

	$.material.init();
  $('#search').collapse("show");

  $scope.credenciales = {};
  vm.reservas = [];
  vm.usuariosparqueo = [];

  $scope.percentRes = 65;
  $scope.percentDis = 35;

  $scope.options = {
    animate:{duration:1000,
      enabled:true}, barColor:'RED', scaleColor: '#e8eff0', lineWidth:10, size:150, lineCap:'butt' 
    };

  $scope.labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  $scope.series = ['Reservas'];
  $scope.data = [];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];

  $scope.optionsLine = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };

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
          $('#login-dialog').modal();
      }
  });

  // login con Stamplay
  vm.login = function() {
      indexService.login(vm.credenciales).then(function(res){
        getDatosRole();
      });
  };

  // busca el tipo de rol del usuario logueado
  vm.setRol = function(){
    indexService.setRol({}).then(function(res){
        getDatosRole();
    });
  }

  // obtiene la informacion del usuario segun el rol
  getDatosRole = function(){
    if($rootScope.user.rol == 'admin'){
      vm.buscarUsuariosParqueos();
    }else{
      vm.buscarReservasDia();
      vm.estadisticasAnual();
    }
  }

  // obtiene todas las reserva del dia para el usuario logueado
  vm.buscarReservasDia = function(){
    indexService.buscarPorDia($rootScope.user).then(function(data) {
      console.log(data);
      vm.reservas = data;
      $scope.$digest();
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
        vm.usuariosparqueo = res;
        $scope.$digest();
    }, function( err ){
      console.error(err);
    });
  }

  // elimina usuarios con rol parqueo
  vm.eliminarUsuario = function(user){
    indexService.deleteUser(user).then(function(data) {
      vm.buscarUsuariosParqueos();
    });
  }

  // da formato de fecha hora
  vm.estadia = function(i) {
      var fecha = new Date(i);
      return fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() + " - " + fecha.getHours() + ':' + (fecha.getMinutes() == 0 ? '00' : '30');
  };


  // FLAGS

  $rootScope.esRolAdmin = function(){
    if($rootScope.user){
      return ($rootScope.user.rol == 'admin');
    } else{
      return false;
    }
  }

  $rootScope.esRolParqueo = function(){
    if($rootScope.user){
      return ($rootScope.user.rol == 'parqueo');
    } else{
      return false;
    }
  }

  $('.hora').bootstrapMaterialDatePicker({format : 'DD/MM/YYYY HH:mm', date: false});
}
