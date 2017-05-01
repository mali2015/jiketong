module.exports = {
    url: '/verify/:phone',
    template: __inline('./verify.html'),
    controller: ["$scope", "$stateParams", "$getData",

        function($scope, $stateParams, $getData) {
            $scope.phone = $stateParams.phone;
            countDown();

            var timer;
            var s = 20;

            function sendVerify() {
                $getData('getback_password', {
                    phone: $scope.phone
                }).then(function(res) {
                    $scope.statistical = res.result;
                });
            }

            function countDown() {
                var btn = $('.anew');
                if (btn[0].className.indexOf("on") != -1) {
                    return false;
                }
                btn.addClass("on");
                timer = setInterval(function() {
                    if (s == 0) {
                        clearInterval(timer);
                        btn.removeClass("on");
                        s = 20;
                    }
                    s--;
                    btn.find(".count-down").text("(" + s + "s)");
                }, 1000);
            }
            $(".anew").on("click", function() {
                countDown();
            });
        }
    ]
};
