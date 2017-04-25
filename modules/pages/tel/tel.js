module.exports = {
    url: '/tel/:id',
    template: __inline('./tel.html'),
    controller: ['$scope', '$getData', '$checkLog', '$stateParams', 'datacontext',
        function($scope, $getData, $checkLog, $stateParams, datacontext) {
            $checkLog(datacontext);
            $scope.curpage = 1;
            $scope.isSort = false;
            checkHasMore(datacontext);
            $scope.tel_list = datacontext.list;
            $scope.username = localStorage.username;

            // $scope.onExpandClick = function($event){
            //  var $element = $($event.target);
            //  var selfTel = $element.parents("li").find(".tel-details");
            //  $(".tel-list li p i").removeClass("up").addClass("down");
            //     if (selfTel.css("display") == "none") {
            //         $(".tel-list li .tel-details").hide();
            //         selfTel.css("display", "block");
            //         $element.removeClass("down").addClass("up");
            //     } else {
            //         $element.removeClass("up").addClass("down");
            //         $(".tel-list li .tel-details").hide();
            //         selfTel.css("display", "none")
            //     }
            // }

            $scope.loadMore = function() {
                $scope.curpage++;
                $getData('call_list', {
                    page_size: 20,
                    page_num: $scope.curpage,
                    sort_type: $scope.isSort ? 'ORDER_BY_CALL_TIME' : '',
                    plan_id: $stateParams.id
                }).then(function(res) {
                    $scope.tel_list = $scope.tel_list.concat(res.list);
                    checkHasMore(res);
                });
            }

            $scope.onSortByTime = function() {
                $scope.isSort = true;
                $scope.curpage = 1;
                $getData('call_list', {
                    page_size: 20,
                    page_num: 1,
                    sort_type: 'ORDER_BY_CALL_TIME',
                    plan_id: $stateParams.id
                }).then(function(res) {
                    $scope.tel_list = res.list;
                    checkHasMore(res);
                });
            }

            function checkHasMore(res) {
                if (res.page_count === res.page_num) {
                    $scope.isHasMore = false;
                } else {
                    $scope.isHasMore = true;
                }
            }
        }
    ],
    resolve: {
        datacontext: ['$getData', '$stateParams', function($getData, $stateParams) {
            return $getData('call_list', {
                page_size: 20,
                page_num: 1,
                plan_id: $stateParams.id
            });
        }]
    }
};
