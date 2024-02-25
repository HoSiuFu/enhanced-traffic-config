angular.module('beamng.apps')
.constant('Transit_Options', {
    defaultAggression: 0.3
})
.directive('enhancedTrafficConfig', [function() {
    return {
        templateUrl: '/ui/modules/apps/enhancedTrafficConfig/app.html',
        replace: true,
        restrict: 'EA',
        scope: true,
        controller: ['$log', '$scope', function ($log, $scope) {
            $scope.defaultForm = {
                'baseAggression': Transit_Options.aggression
            }
            $scope.formStatus = angular.copy(defaultForm)

            $scope.submit = function (form) {
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(form)} )`);
            }

            $scope.reset = function () {
                $scope.formStatus = angular.copy($scope.defaultForm)
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua($scope.defaultForm)} )`)
            }
        }]
    }
}])