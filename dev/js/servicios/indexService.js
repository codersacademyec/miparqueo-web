angular.module('MiParking').factory('indexService', ['$rootScope',indexService]);

function indexService(r) {
    var service = {
        buscarPorDia: getResPorDia,
        login: login,
        deleteUser : deleteUser
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

    function deleteUser(user){
        Stamplay.User.remove(user._id).then(function(res) {
            Stamplay.Object("usuarioparqueo").remove({_id:user.perfil._id}).then(function(res) {
                console.log(res);
            }, function(err) {
                console.log(err);
            })
        }, function(err) {
          console.log(err);
        })
    }

}