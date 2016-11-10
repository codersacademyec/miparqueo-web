angular.module('MiParking').factory('indexService', ['$rootScope',indexService]);

function indexService(r) {
    var service = {
        buscarPorDia: getResPorDia,
        login: login
    };

    return service;

    // login con Stamplay
    function login(i){
        Stamplay.User.login(i)
        .then(function(res) {
          r.user = res;
          $('#login-dialog').modal('hide');
          return getResPorDia(res);
        }, function(err) {
          console.log(err);
        })
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

}