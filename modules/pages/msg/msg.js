module.exports = {
    url: '/msg',
    template: __inline('./msg.html'),
    controller: ['$scope', '$getData', '$checkLog', 'datacontext',
        function($scope, $getData, $checkLog, datacontext) {
            $checkLog(datacontext);
            $scope.datacontext = datacontext;
            for (var i = 0; i < $scope.datacontext.list.length; i++) {
                $scope.datacontext.list[i].isChecked = false;
            }

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

            $scope.onCheck = function(item){
                item.isChecked = !item.isChecked;
            }

            $(".all-select").on("click", function() {
                $(".msg li .label").addClass("select");
            });
        }
    ],
    resolve: {
        datacontext: function($getData) {
            return $getData('msg_list', {
                page_size: 20,
                page_num: 1
            });
        }
    }
};
