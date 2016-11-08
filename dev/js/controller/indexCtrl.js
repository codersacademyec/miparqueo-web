angular.module('MiParking').controller('indexCtrl',['$scope','indexService','socialProvider', 'AccountService', indexCtrl]);

function indexCtrl($scope, indexService, socialProvider, AccountService){

	var vm = this;

	$.material.init();

  $scope.credenciales = {};

  $scope.percent = 65;
  $scope.options = {
    animate:{duration:1000,
      enabled:true}, barColor:'RED', scaleColor: '#e8eff0', lineWidth:10, size:150, lineCap:'butt' 
    };

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];

  $scope.data = [[65, 59, 80, 81, 56, 55, 40]];

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
      if (user || $scope.user) {
          $scope.user = user ? user : $scope.user;
          Stamplay.Object("usuarios").get({owner: $scope.user._id})
              .then(function(res) {
                  $scope.user.perfil = res.data[0];
                  vm.buscarReservasDia();
              }, function(err) {
                  console.log(err);
              });
      }else{
          console.error('No hay usuario logueado');
          $('#login-dialog').modal();
      }
  });

  // login con Stamplay
  vm.login = function() {
      indexService.login(credenciales);
  };

  // obtiene todas las reserva del dia para el usuario logueado
  vm.buscarReservasDia = function(){
    indexService.buscarPorDia($scope.user);
  }

}
