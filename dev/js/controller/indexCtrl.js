angular.module('MiParking').controller('indexCtrl',['$scope', '$rootScope', 'indexService', 'AccountService', indexCtrl]);

function indexCtrl($scope, $rootScope, indexService, AccountService){

	var vm = this;

	$.material.init();

  $scope.credenciales = {};
  vm.reservas = [];

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
                  vm.buscarReservasDia();
                  vm.estadisticasAnual();
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
  };

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


  vm.estadia = function(i) {
      var fecha = new Date(i);
      return fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear() + " - " + fecha.getHours() + ':' + (fecha.getMinutes() == 0 ? '00' : '30');
  };

  $('.hora').bootstrapMaterialDatePicker({format : 'DD/MM/YYYY HH:mm', date: false});
}
