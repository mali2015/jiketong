module.exports = {
    url: '/account',
    template: __inline('./account.html'),
    controller: ['$scope', '$state', 'datacontext', '$checkLog',
        function($scope, $state, datacontext, $checkLog) {
        	$checkLog(datacontext);
            $scope.datacontext = datacontext;
            $scope.username = localStorage.username;
            $scope.onLogout = function() {
                localStorage.username = '';
                localStorage.userid = '';
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
