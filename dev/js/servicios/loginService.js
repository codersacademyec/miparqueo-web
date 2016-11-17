angular.module('MiParking').factory('loginService', ['$rootScope',loginService]);

function loginService(r) {
    var service = {
        buscarPorDia: getResPorDia,
        login: login,
        setRol : setRol
    };
     return service;

    // login con Stamplay
    function login(i){
        return Stamplay.User.login(i)
        .then(function(res) {
          r.user = res;
          setRol();
          $('#login-dialog').modal('hide');        
        }, function(err) {
          console.log(err);
        });
    }
    
    function setRol(){
        return Stamplay.User.getRoles().then(function(res) {
        for (var i = res.data.length - 1; i >= 0; i--) {
          if(res.data[i]._id == r.user.givenRole){
            r.user.rol = res.data[i].name;
          }
        }
      }, function(err) {
        console.error(err);
      });
    }

    // todas las reservas del dia
    function getResPorDia(user){
        if(user){
        var data = {usuario: user};
        
            var codeblock = new Stamplay.Codeblock("consultarreservas");
            return codeblock.run(data).then(function (response) {
                return response;
            }, function( err ){
              console.error(err);
                return null;
            });
        }else{
          $('#login-dialog').modal();
        }
    }

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
}