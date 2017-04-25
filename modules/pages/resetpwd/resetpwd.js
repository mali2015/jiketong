module.exports = {
    url: '/resetpwd',
    template: __inline('./resetpwd.html'),
    controller: ['$scope', '$getData', '$state',
        function($scope, $getData, $state) {
            $scope.onSubmit = function() {
                if ($scope.newpwd1 === $scope.newpwd2) {
                    $getData('change_password', {
                        name: localStorage.username,
                        pwd: $scope.oldpwd,
                        newpwd: $scope.newpwd1
                    }).then(function(res) {
                        $scope.oldpwd = '';
                        $scope.newpwd1 = '';
                        $scope.newpwd2 = '';
                        if (res.status === 0) {
                            $state.go('board.account');
                        } else {
                            alert(res.desc);
                        }
                    });
                } else {
                    alert('密码不一致');
                }
            }
        }
    ]
};
