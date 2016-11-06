angular.module('MiParking').controller('indexCtrl',['$scope', indexCtrl]);
function indexCtrl($scope){
	var vm = this;
	$.material.init();
    $scope.percent = 65;
    $scope.options = {
      animate:{duration:1000,
        enabled:true}, barColor:'RED', scaleColor: '#e8eff0', lineWidth:10, size:150, lineCap:'butt' 
      };
       $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.optionsLine = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
}
