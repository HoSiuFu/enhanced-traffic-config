angular.module('beamng.apps')
.directive('enhancedTrafficConfig', [function() {
    return {
        templateUrl: '/ui/modules/apps/enhancedTrafficConfig/app.html',
        replace: true,
        restrict: 'EA',
        require: '^bngApp',
        scope: true,
        link: function (scope, element, attrs, ctrl) {
            const DEFAULT_TRAFFIC_CONFIG = {
                baseAggression: 0.3,
                minRoadDrivability: 0.25,
                aiMode: 'traffic',
                aiAware: 'auto',
                enableRandomEvents: false,
            }

            element.ready(function () {
                ctrl.getSettings().then(function (settings) {
                    if (Object.keys(settings).length !== 0) {
                        scope.formStatus = angular.copy(settings)
                    } else {
                        scope.formStatus = angular.copy(DEFAULT_TRAFFIC_CONFIG)
                        ctrl.saveSettings(DEFAULT_TRAFFIC_CONFIG)
                    }
                })

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
            })
            

            scope.onSubmit = function (form) {
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(form)} )`);
                ctrl.saveSettings(form)
            }

            scope.onReset = function () {
                scope.formStatus = angular.copy(DEFAULT_TRAFFIC_CONFIG)
                bngApi.engineLua(`extensions.gameplay_traffic.setTrafficVars( ${bngApi.serializeToLua(scope.defaultForm)} )`)
            }
        }
    }
}])
