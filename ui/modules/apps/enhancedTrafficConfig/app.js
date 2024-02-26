angular.module('beamng.apps')
.constant('Transit_Options', {
    defaultAggression: 0.3
})
.directive('enhancedTrafficConfig', ['Transit_Options',function() {
    return {
        templateUrl: '/ui/modules/apps/enhancedTrafficConfig/app.html',
        replace: true,
        restrict: 'EA',
        scope: true,
        link: function (scope, element, attrs) {
            scope.defaultForm = {
                'baseAggression': Transit_Options.aggression
            }
            scope.formStatus = angular.copy(defaultForm)

            scope.onSubmit = function (form) {
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(form)} )`);
            }

            scope.onReset = function () {
                scope.formStatus = angular.copy(scope.defaultForm)
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(scope.defaultForm)} )`)
            }
        }
    }
}])
