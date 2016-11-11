angular.module('MiParking').factory('navService', ['$rootScope',navService]);

function navService(root) {
    var service = {
        buscarDisponibilidad: buscarDisponibilidad,
        getParqueoUsuario : getParqueoUsuario,
        reservar : reservar,
        getParqueo : getParqueo
    };

    return service;

    function buscarDisponibilidad(filter){    		
        var codeblock = new Stamplay.Codeblock("consultadisponibilidadparqueo");
        return codeblock.run(filter).then(function (response) {
            return response;
        }, function( err ){
          	console.error(err);
            return null;
        })
    }

    function getParqueoUsuario(user){
        return Stamplay.Object("usuarioparqueo").get({usuario:user.id})
        .then(function(res) {
          return res;
        }, function(err) {
            console.log(err);
        })
    }

    function reservar(reserva){
    	return Stamplay.Object("reservar").save(reserva)
        .then(function(res) {
          return res;
        }, function(err) {
            console.log(err);
        })
    }

    function getParqueo(pId){
    	return Stamplay.Object("parqueos").get({_id:pId})
    	.then(function(res) {
    		return res;
      }, function( err ){
          console.error(err);
      })
    }

}