function indexService(e){function o(o){return Stamplay.User.login(o).then(function(o){e.user=o,n(),$("#login-dialog").modal("hide")},function(e){console.log(e)})}function r(e){Stamplay.User.remove(e._id).then(function(o){Stamplay.Object("usuarioparqueo").remove({_id:e.perfil._id}).then(function(e){console.log(e)},function(e){console.log(e)})},function(e){console.log(e)})}function n(){return Stamplay.User.getRoles().then(function(o){for(var r=o.data.length-1;r>=0;r--)o.data[r]._id==e.user.givenRole&&(e.user.rol=o.data[r].name)},function(e){console.error(e)})}var t={login:o,deleteUser:r,setRol:n};return t}function indexCtrl(e,o,r,n){var t=this;$.material.init(),$("#search").collapse("show"),e.credenciales={},t.reservas=[],t.usuariosparqueo=[],e.percentRes=65,e.percentDis=35,e.options={animate:{duration:1e3,enabled:!0},barColor:"RED",scaleColor:"#e8eff0",lineWidth:10,size:150,lineCap:"butt"},e.labels=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],e.series=["Reservas"],e.data=[],e.onClick=function(e,o){console.log(e,o)},e.datasetOverride=[{yAxisID:"y-axis-1"}],e.optionsLine={responsive:!0,scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"}]}},t.buscarReservasDia=function(){r.buscarPorDia(o.user).then(function(o){console.log(o),t.reservas=o,e.$digest()})},t.estadisticasAnual=function(){var o=new Stamplay.Codeblock("reservasanual");o.run({}).then(function(o){e.data=[o],e.$digest()},function(e){console.error(e)})},t.buscarUsuariosParqueos=function(){var o=new Stamplay.Codeblock("usuariosparqueos");o.run({}).then(function(o){console.log(o),t.usuariosparqueo=o,e.$digest()},function(e){console.error(e)})},t.eliminarUsuario=function(e){r.deleteUser(e).then(function(e){t.buscarUsuariosParqueos()})},t.estadia=function(e){var o=new Date(e);return o.getDate()+"/"+o.getMonth()+"/"+o.getFullYear()+" - "+o.getHours()+":"+(0==o.getMinutes()?"00":"30")},o.esRolAdmin=function(){return!!o.user&&"admin"==o.user.rol},o.esRolParqueo=function(){return!!o.user&&"parqueo"==o.user.rol},$(".hora").bootstrapMaterialDatePicker({format:"DD/MM/YYYY HH:mm",date:!1})}function navService(e){function o(e){var o=new Stamplay.Codeblock("consultadisponibilidadparqueo");return o.run(e).then(function(e){return e},function(e){return console.error(e),null})}function r(e){return Stamplay.Object("usuarioparqueo").get({usuario:e.id}).then(function(e){return e},function(e){console.log(e)})}function n(e){return Stamplay.Object("reservar").save(e).then(function(e){return e},function(e){console.log(e)})}function t(e){return Stamplay.Object("parqueos").get({_id:e}).then(function(e){return e},function(e){console.error(e)})}function a(e){return Stamplay.User.signup(e).then(function(o){Stamplay.Object("usuarioparqueo").save(e).then(function(e){return"OK"},function(e){console.log(e)})},function(e){console.log(e)})}var i={buscarDisponibilidad:o,getParqueoUsuario:r,reservar:n,getParqueo:t,altaUserParqueo:a};return i}function navCtrl(e,o,n){var t=this;$.material.init(),t.filter={},t.reserva={},t.validatePayphone=!1,t.validate=!1,t.montos=[],t.newusuario={},visibility=function(e){$("#hd").prop("disabled",e),$("#hh").prop("disabled",e),$("#tv").prop("disabled",e),$("#search").collapse(e?"hide":"show"),$("#searchPanel").collapse(e?"show":"hide")},t.showDisponibilidad=function(){t.filter={},t.reserva={},t.validatePayphone=!1,t.validate=!1,visibility(!1),$("#busqueda-dialog").modal()},t.buscarDisponibilidad=function(){n.getParqueoUsuario(o.user).then(function(o){t.filter.pId=o.data[0].parqueo;var r={hD:new Date(t.filter.hD),hH:new Date(t.filter.hH),tV:t.reserva.TipoVehiculo,pId:t.filter.pId};n.buscarDisponibilidad(r).then(function(o){o&&(console.log(o),t.reserva.puestoParqueo=o,visibility(!0),t.validate=!0,t.reserva.Monto=calcularMonto(),e.$digest())},function(e){console.error(e)})},function(e){console.error(e)})},calcularMonto=function(){n.getParqueo(t.filter.pId[0]).then(function(e){return t.reserva.Parqueo=e.data[0]._id,t.montos=[parseFloat(e.data[0].ValorXHoraL),parseFloat(e.data[0].ValorXHoraP),parseFloat(e.data[0].ValorXHoraM)],(r.formatHora(t.filter.hH)-r.formatHora(t.filter.hD))*t.montos[t.reserva.TipoVehiculo]},function(e){console.log(e)})},o.formatHora=function(e){return e=e.split(":"),parseFloat(e[0]+"."+e[1].replace("3","5"))},t.cambiarModoPago=function(){"0"==t.filter.tP?($("#pagoPanel").collapse("hide"),t.validatePayphone=!1):($("#pagoPanel").collapse("show"),t.validatePayphone=!0)},t.reservar=function(){t.reserva.HoraDesde=new Date(t.filter.hD),t.reserva.HoraHasta=new Date(t.filter.hH),t.reserva.Estado="P",t.reserva.Usuario=o.user.id,n.reservar(t.reserva).then(function(e){e&&addAlert("La reserva se ha registrado de manera exitosa.")},function(e){console.error(e)})},t.cancelarReserva=function(e){},t.confirmNewUser=function(){n.altaUserParqueo(t.newusuario).then(function(e){addAlert("Usuario registrado con éxito.")},function(e){console.error(e)}),$("user-dialog").modal("hide")},o.logout=function(){var e=window.location.origin+"-jwt";window.localStorage.removeItem(e),o.user=!1}}function loginService(e){function o(o){return Stamplay.User.login(o).then(function(o){e.user=o,r(),$("#login-dialog").modal("hide")},function(e){console.log(e)})}function r(){return Stamplay.User.getRoles().then(function(o){for(var r=o.data.length-1;r>=0;r--)o.data[r]._id==e.user.givenRole&&(e.user.rol=o.data[r].name)},function(e){console.error(e)})}function n(e){if(e){var o={usuario:e},r=new Stamplay.Codeblock("consultarreservas");return r.run(o).then(function(e){return e},function(e){return console.error(e),null})}$("#login-dialog").modal()}var t={buscarPorDia:n,login:o,setRol:r};return t}function loginCtrl(e,o,r,n){var t=this;$.material.init(),n.currentUser().then(function(e){e||o.user?(o.user=e?e:o.user,Stamplay.Object("usuarios").get({owner:o.user._id}).then(function(e){o.user.perfil=e.data[0],t.setRol()},function(e){console.log(e)})):console.log("No hay usuario logueado")}),t.login=function(){r.login(t.credenciales).then(function(e){getDatosRole(),o.$digest()})},t.setRol=function(){r.setRol().then(function(e){getDatosRole(),o.$digest()})},getDatosRole=function(){e.$apply(),"admin"==o.user.rol?t.buscarUsuariosParqueos():(t.buscarReservasDia(),t.estadisticasAnual())},t.buscarReservasDia=function(){r.buscarPorDia(o.user).then(function(e){console.log(e),o.reservas=e,o.$digest()})},t.estadisticasAnual=function(){var o=new Stamplay.Codeblock("reservasanual");o.run({}).then(function(o){e.data=[o],e.$digest()},function(e){console.error(e)})},t.buscarUsuariosParqueos=function(){var e=new Stamplay.Codeblock("usuariosparqueos");e.run({}).then(function(e){console.log(e),o.usuariosparqueo=e,o.$digest()},function(e){console.error(e)})}}angular.module("MiParking",["ui.router","chart.js","easypiechart"]).factory("AccountService",["$q",function(e){return{currentUser:function(){var o=e.defer();return Stamplay.User.currentUser().then(function(e){void 0===e.user?o.resolve(!1):o.resolve(e.user)},function(e){o.reject()}),o.promise}}}]).config(["$stateProvider","$urlRouterProvider",function(e,o){o.otherwise("/"),e.state("home",{url:"/",sticky:!0,dsr:!0,views:{loginView:{templateUrl:"templates/login.html",controller:"loginCtrl as ctrl"},navView:{templateUrl:"templates/nav.html",controller:"navCtrl as ctrl"},contentView:{templateUrl:"templates/index.html",controller:"indexCtrl as ctrl"}}})}]),angular.module("MiParking").factory("indexService",["$rootScope",indexService]),angular.module("MiParking").controller("indexCtrl",["$scope","$rootScope","indexService","AccountService",indexCtrl]),angular.module("MiParking").factory("navService",["$rootScope",navService]),angular.module("MiParking").controller("navCtrl",["$scope","$rootScope","navService","AccountService",navCtrl]),angular.module("MiParking").factory("loginService",["$rootScope",loginService]),angular.module("MiParking").controller("loginCtrl",["$scope","$rootScope","loginService","AccountService",loginCtrl]);
//# sourceMappingURL=maps/app.js.map
