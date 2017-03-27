module.exports = {
    url: '/login',
    template: __inline('./login.html'),
    controller: ["$scope", "$getData", "$userid", "$state",
        function($scope, $getData, $userid, $state) {
            $scope.onLoginClick = function() {
                $getData('login', {
                    name: $scope.phone,
                    pwd: $scope.password
                }).then(function(res) {
                    if (res.status === 0) {
                        $userid.id = res.userinfos.id;
                        $state.go('index.home');
                    } else {
                        alert(res.desc);
                    }
                });
            }
        }
    ]
};
