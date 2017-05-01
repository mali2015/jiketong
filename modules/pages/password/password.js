module.exports = {
    url: '/password',
    template: __inline('./password.html'),
    controller: ["$scope", "$state", "$getData",
        function($scope, $state, $getData) {
            $scope.onSubmitPhone = function() {
                if ($scope.phone && checkPhone($scope.phone)) {
                    $getData('getback_password', {
                        phone: $scope.phone
                    }).then(function(res) {
                        if (res.status !== 0) {
                            alert("手机号码不存在！");
                        } else {
                            alert("新密码已经短信发送到您的手机上，请注意查收。");
                            $state.go('login');
                        }
                    });
                } else {
                    alert("请输入正确的手机号码！");
                }
            }

            function checkPhone(phone) {
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]
};
