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
                  setRol();
                  if($rootScope.user.perfil.rol == 'admin'){
                    vm.buscarUsuariosParqueos();
                  }else{
                    vm.buscarReservasDia();
                    vm.estadisticasAnual();
                  }
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
      indexService.login(vm.credenciales);
      setRol();
  };

  // busca el tipo de rol del usuario logueado
  setRol = function(){
    Stamplay.User.getRoles().then(function(res) {
        for (var i = res.data.length - 1; i >= 0; i--) {
          if(res.data[i]._id == $rootScope.user.perfil.givenRole){
            $rootScope.user.perfil.rol = res.data[i].name;
          }
        }
      }, function(err) {
        console.error(err)
      })
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
      $scope.$digest();
    });
  }

  // da formato de fecha hora
  vm.estadia = function(i) {
      var fecha = new Date(i);
      return fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() + " - " + fecha.getHours() + ':' + (fecha.getMinutes() == 0 ? '00' : '30');
  };


  // FLAGS

  $rootScope.esRolAdmin = function(){
    return ($rootScope.user.perfil.rol == 'admin');
  }

  $rootScope.esRolParqueo = function(){
    return ($rootScope.user.perfil.rol == 'parqueo');
  }

  $('.hora').bootstrapMaterialDatePicker({format : 'DD/MM/YYYY HH:mm', date: false});
}
