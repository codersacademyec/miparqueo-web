angular.module('MiParking').factory('indexService', ['$rootScope',indexService]);

function indexService(r) {
    var service = {
        login: login,
        deleteUser : deleteUser,
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

}