angular.module('MiParking').factory('navService', ['$rootScope',navService]);

function navService(root) {
    var service = {
        buscarDisponibilidad: buscarDisponibilidad,
        getParqueoUsuario : getParqueoUsuario
    };

    return service;

    function buscarDisponibilidad(filter){    		
        var codeblock = new Stamplay.Codeblock("consultadisponibilidadparqueo");
        return codeblock.run(filter).then(function (response) {
            return response;
        }, function( err ){
          	console.error(err);
            return null;
        }); 
    }

    function getParqueoUsuario(user){
        Stamplay.Object("usuarioparqueo").get(user.id)
        .then(function(res) {
          return res;
        }, function(err) {
            console.log(err);
        }) 
    }

}