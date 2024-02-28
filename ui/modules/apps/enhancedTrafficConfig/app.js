angular.module('beamng.apps')
.directive('enhancedTrafficConfig', [function() {
    return {
        templateUrl: '/ui/modules/apps/enhancedTrafficConfig/app.html',
        replace: true,
        restrict: 'EA',
        scope: true,
        link: function (scope, element, attrs) {
            const DEFAULT_TRAFFIC_CONFIG = {
                baseAggression: 0.3,
                minRoadDrivability: 0.25,
                aiMode: 'traffic',
                aiAware: 'auto',
                enableRandomEvents: false,
            }
            scope.formStatus = angular.copy(DEFAULT_TRAFFIC_CONFIG)
            scope.showAggression = true
            scope.formOptions = {
                aiMode: [
                    { txt: 'Disabled', val: 'disabled'},
                    { txt: 'Traffic', val: 'traffic'},
                    { txt: 'Random', val: 'random'},
                    { txt: 'Span', val:'span' },
                    { txt: 'Manual', val:'manual' },
                    { txt: 'Chase', val:'chase' },
                    { txt: 'Follow', val:'follow' },
                    { txt: 'Flee', val:'flee' },
                    { txt: 'Stopping', val:'stop' },
                ],
            
                aiAware: [
                    { txt: 'Auto', val:'auto' },
                    { txt: 'Off', val: 'off' },
                    { txt: 'On', val: 'on' },
                ]
            }

            scope.onChange = function () {
                console.log(formStatus)
            }

            scope.onSubmit = function (form) {
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(form)} )`);
            }

            scope.onReset = function () {
                scope.formStatus = angular.copy(DEFAULT_TRAFFIC_CONFIG)
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(scope.defaultForm)} )`)
            }
        }
    }
}])
