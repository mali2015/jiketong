module.exports = {
    url: '/board',
    template: __inline('./board.html'),
    controller: ["$rootScope", "$scope", "$state",
        function($rootScope, $scope, $state) {
            $scope.state = $state.current.name.split('.')[1];
            $rootScope.$on("$stateChangeSuccess",
                function(event, toState, toParams, fromState, fromParams) {
                    $scope.state = toState.name.split('.')[1];
                });
        }
    ]
};
