angular.module('MiParking').factory('indexService', [indexService]);

function indexService() {
    var service = {
        buscarPorDia: getResPorDia,
        login: login
    };

    return service;

    // login con Stamplay
    function login(i){
        Stamplay.User.socialLogin(socialProvider[i]);    
    }

    // todas las reservas del dia
    function getResPorDia(user){
        if(user){
    		var data = {usuario: user, periodoDesde: new Date()};
    		Stamplay.Object("reservas").get(data)
	        .then(function(res) {
	          // success
	        }, function(err) {
	            console.log(err);
	        }) 
        }else{
        	$('#login-dialog').modal();
        }
    }

}