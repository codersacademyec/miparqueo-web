angular.module('MiParking').factory('navService', ['$rootScope',navService]);

function navService(navService) {
    var service = {
        buscarDisponibilidad: buscarDisponibilidad
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

}