function indexService(e){function r(r){Stamplay.User.login(r).then(function(r){return e.user=r,$("#login-dialog").modal("hide"),n(r)},function(e){console.log(e)})}function n(e){if(e){var r={usuario:e},n=new Stamplay.Codeblock("consultarreservas");return n.run(r).then(function(e){return e},function(e){return console.error(e),null})}$("#login-dialog").modal()}var o={buscarPorDia:n,login:r};return o}function indexCtrl(e,r,n,o){var t=this;$.material.init(),$("#search").collapse("show"),e.credenciales={},t.reservas=[],e.percentRes=65,e.percentDis=35,e.options={animate:{duration:1e3,enabled:!0},barColor:"RED",scaleColor:"#e8eff0",lineWidth:10,size:150,lineCap:"butt"},e.labels=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],e.series=["Reservas"],e.data=[],e.onClick=function(e,r){console.log(e,r)},e.datasetOverride=[{yAxisID:"y-axis-1"}],e.optionsLine={responsive:!0,scales:{yAxes:[{id:"y-axis-1",type:"linear",display:!0,position:"left"}]}},o.currentUser().then(function(e){e||r.user?(r.user=e?e:r.user,Stamplay.Object("usuarios").get({owner:r.user._id}).then(function(e){r.user.perfil=e.data[0],t.buscarReservasDia(),t.estadisticasAnual()},function(e){console.log(e)})):(console.log("No hay usuario logueado"),$("#login-dialog").modal())}),t.login=function(){n.login(t.credenciales)},t.buscarReservasDia=function(){n.buscarPorDia(r.user).then(function(r){console.log(r),t.reservas=r,e.$digest()})},t.estadisticasAnual=function(){var r=new Stamplay.Codeblock("reservasanual");r.run({}).then(function(r){e.data=[r]},function(e){console.error(e)})},t.estadia=function(e){var r=new Date(e);return r.getDate()+"/"+r.getMonth()+"/"+r.getFullYear()+" - "+r.getHours()+":"+(0==r.getMinutes()?"00":"30")},$(".hora").bootstrapMaterialDatePicker({format:"DD/MM/YYYY HH:mm",date:!1})}function navService(e){function r(e){var r=new Stamplay.Codeblock("consultadisponibilidadparqueo");return r.run(e).then(function(e){return e},function(e){return console.error(e),null})}function n(e){return Stamplay.Object("usuarioparqueo").get({usuario:e.id}).then(function(e){return e},function(e){console.log(e)})}var o={buscarDisponibilidad:r,getParqueoUsuario:n};return o}function navCtrl(e,r,n){var o=this;$.material.init(),o.filter={},o.resultBusq=[],o.showDisponibilidad=function(){$("#busqueda-dialog").modal()},o.buscarDisponibilidad=function(){return n.getParqueoUsuario(r.user).then(function(r){o.filter.pId=r.data[0].parqueo,o.filter.hD=new Date(o.filter.hD),o.filter.hH=new Date(o.filter.hH),n.buscarDisponibilidad(o.filter).then(function(r){console.log(r),o.filter.puesto=r,$("#search").collapse("hide"),$("#searchPanel").collapse("show"),e.$digest()})})},o.reservar=function(){}}angular.module("MiParking",["ui.router","chart.js","easypiechart"]).factory("AccountService",["$q",function(e){return{currentUser:function(){var r=e.defer();return Stamplay.User.currentUser().then(function(e){void 0===e.user?r.resolve(!1):r.resolve(e.user)},function(e){r.reject()}),r.promise}}}]).config(["$stateProvider","$urlRouterProvider",function(e,r){r.otherwise("/"),e.state("home",{url:"/",sticky:!0,dsr:!0,views:{navView:{templateUrl:"templates/nav.html",controller:"navCtrl as ctrl"},contentView:{templateUrl:"templates/index.html",controller:"indexCtrl as ctrl"}}})}]),angular.module("MiParking").factory("indexService",["$rootScope",indexService]),angular.module("MiParking").controller("indexCtrl",["$scope","$rootScope","indexService","AccountService",indexCtrl]),angular.module("MiParking").factory("navService",["$rootScope",navService]),angular.module("MiParking").controller("navCtrl",["$scope","$rootScope","navService","AccountService",navCtrl]);
//# sourceMappingURL=maps/app.js.map
