module.exports = {
    url: '/account',
    template: __inline('./account.html'),
    controller: ['$scope', '$state', 'datacontext', '$checkLog',
        function($scope, $state, datacontext, $checkLog) {
        	$checkLog(datacontext);
            $scope.datacontext = datacontext;
            $scope.username = sessionStorage.username;
            $scope.onLogout = function() {
                sessionStorage.username = '';
                sessionStorage.userid = '';
                $state.go('login');
            }
        }
    ],
    resolve: {
        datacontext: ['$getData', function($getData) {
            return $getData('plan_list', {});
        }]
    }
};
