module.exports = {
    url: '/login',
    template: __inline('./login.html'),
    controller: ["$scope", "$getData", "$userid", "$state",
        function($scope, $getData, $userid, $state) {
            $scope.onLoginClick = function() {
                $getData('login', {
                    name: $scope.name,
                    pwd: $scope.password
                }).then(function(res) {
                    if (res.status === 0) {
                        $userid.id = res.userinfos.id;
                        localStorage.setItem('userid', $userid.id);
                        localStorage.setItem('username', $scope.name)
                        $state.go('board.home');
                    } else {
                        alert(res.desc);
                    }
                });
            }
        }
    ]
};
