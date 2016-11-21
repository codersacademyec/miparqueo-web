angular.module('MiParking').controller('navCtrl', ['$scope','$rootScope' , 'navService', 'AccountService', navCtrl]);

function navCtrl($scope, $rootScope, navService){

    var vm = this;

    $.material.init();

    vm.filter = {};
    vm.reserva = {};
    vm.validatePayphone = false;
    vm.validate = false;
    vm.montos = [];
    vm.newusuario = {};

    visibility = function(bool){
      $('#hd').prop('disabled',bool);
      $('#hh').prop('disabled',bool);
      $('#tv').prop('disabled',bool);
      $('#search').collapse(!bool?"show":"hide");
      $('#searchPanel').collapse(!bool?"hide":"show");
    }

    vm.showDisponibilidad = function () {
      vm.filter = {};
      vm.reserva = {};
      vm.validatePayphone = false;
      vm.validate = false;
      visibility(false);
      $('#busqueda-dialog').modal();
    };

    // busca disponibilidad para reserva para el parqueo actual
    vm.buscarDisponibilidad = function () {
        navService.getParqueoUsuario($rootScope.user).then(function(res) {
          vm.filter.pId = res.data[0].parqueo;
          var params = {hD: new Date(vm.filter.hD), hH: new Date(vm.filter.hH), tV: vm.reserva.TipoVehiculo, pId : vm.filter.pId};
          navService.buscarDisponibilidad(params).then(function(data) {
            if(data){
              console.log(data);
              vm.reserva.puestoParqueo = data;
              visibility(true);
              vm.validate = true;
              vm.reserva.Monto = calcularMonto();
              $scope.$digest();
            }
          }, function( err ){
              console.error(err);
          });
        }, function( err ){
              console.error(err);
        });
    };

    // calcula el monto del parqueo a reservar
    calcularMonto = function(){
      navService.getParqueo(vm.filter.pId[0]).then(function(res){
          vm.reserva.Parqueo = res.data[0]._id;
          vm.montos = [parseFloat(res.data[0].ValorXHoraL), parseFloat(res.data[0].ValorXHoraP), parseFloat(res.data[0].ValorXHoraM)];
          return (r.formatHora(vm.filter.hH) - r.formatHora(vm.filter.hD)) * vm.montos[vm.reserva.TipoVehiculo];
      }, function(error){
         console.log(error);
      });
    }

    // formato hora
    $rootScope.formatHora = function(hora) {
      hora = hora.split(':');
      return parseFloat(hora[0] + '.' + hora[1].replace('3', '5'));
    };


    // segun modo de pago, visibilidad en pantalla
    vm.cambiarModoPago = function(){
      if(vm.filter.tP == '0'){
        $('#pagoPanel').collapse("hide");
        vm.validatePayphone = false;
      }else{
        $('#pagoPanel').collapse("show");
        vm.validatePayphone = true;
      }
    };

    // reserva un parqueo
    vm.reservar = function(){
      vm.reserva.HoraDesde = new Date(vm.filter.hD);
      vm.reserva.HoraHasta = new Date(vm.filter.hH);
      vm.reserva.Estado = 'P'; //TODO VER FORMA DE PAGO CON CELULAR Y COMO SE VAN A MANEJAR LOS ESTADOS
      vm.reserva.Usuario = $rootScope.user.id; // VER SI PAGA POR PAYPHONE (DE SER ASI SE PUEDE GUARDAR EL USUARIO DEL CLIENTE)
      navService.reservar(vm.reserva).then(function(res) {
        if(res){
          addAlert('La reserva se ha registrado de manera exitosa.');  
        }
      }, function( err ){
          console.error(err);
      });
    };

    // TODO Cancela una reserva
    vm.cancelarReserva = function(reserva){

    };


    // confirma alta de usuario de tipo parqueo
    vm.confirmNewUser = function(){
      navService.altaUserParqueo(vm.newusuario).then(function(res) {
        addAlert('Usuario registrado con éxito.');  
      }, function( err ){
          console.error(err);
      });

      $('user-dialog').modal('hide');
    }

    $rootScope.logout = function(){
        var jwt = window.location.origin + "-jwt";
        window.localStorage.removeItem(jwt);
        $rootScope.user = false;
    }

    vm.clearUserDialog = function(){
      vm.newusuario = {};
    }
}