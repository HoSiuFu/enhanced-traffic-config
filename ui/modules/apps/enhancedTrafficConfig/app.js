angular.module('beamng.apps')
.constant('DEFAULT_TRAFFIC_CONFIG', {
    baseAggression: 0.3,
    minRoadDrivability: 0.25,
    speedLimit: null,
    aiMode: 'traffic',
    aiAware: 'auto',
    enableRandomEvents: false,
})
.constant('TRAFFIC_OPTIONS', {
    aiMode: [
        { txt: 'Disabled', val: 'disabled'},
        { txt: 'Traffic', val: 'traffic'},
        { txt: 'Random', val: 'random'},
        { txt: 'Span', val:'span' },
        { txt: 'Manual', val:'manual' },
        { txt: 'Chase', val:'chase' },
        { txt: 'Follow', val:'follow' },
        { txt: 'Flee', val:'flee' },
        { txt: 'Chase', val:'chase' },
    ],

    aiAware: [
        { txt: 'Auto', val:'auto' },
        { txt: 'Off', val: 'off' },
        { txt: 'On', val: 'on' },
    ]
})
.directive('enhancedTrafficConfig', ['DEFAULT_TRAFFIC_CONFIG', 'TRAFFIC_OPTIONS',function() {
    return {
        templateUrl: '/ui/modules/apps/enhancedTrafficConfig/app.html',
        replace: true,
        restrict: 'EA',
        scope: true,
        link: function (scope, element, attrs) {
            scope.formStatus = angular.copy(DEFAULT_TRAFFIC_CONFIG)
            scope.formOptions = angular.copy(TRAFFIC_OPTIONS)

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
