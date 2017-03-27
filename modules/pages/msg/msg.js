module.exports = {
    url: '/msg',
    template: __inline('./msg.html'),
    controller: ["$scope",
        function($scope) {
            var showState = false;
            $scope.onEditClick = function(event) {
                if (!showState) {
                    $(event.target).text("取消");
                    $(".bottom-select").show();
                    $(".msg li .label").show();
                    showState = true;
                } else {
                    $(event.target).text("编辑");
                    $(".bottom-select").hide();
                    $(".msg li .label").hide();
                    showState = false;
                }
            }

            $(".msg li .label").on("click", function() {
                if (this.className.indexOf("select") != -1) {
                    $(this).removeClass("select");
                } else {
                    $(this).addClass("select");
                }
            });

            $(".all-select").on("click", function() {
                $(".msg li .label").addClass("select");
            });
        }
    ]
};
