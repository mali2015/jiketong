module.exports = {
    url: '/tel/:id',
    template: __inline('./tel.html'),
    controller: ['$scope', '$checkLog', 'datacontext', 
    function($scope, $checkLog, datacontext) {
    	$checkLog(datacontext);
        $scope.datacontext = datacontext;
        $scope.username = sessionStorage.username;

        $scope.onExpandClick = function($event){
        	var $element = $($event.target);
        	var selfTel = $element.parents("li").find(".tel-details");
        	$(".tel-list li p i").removeClass("up").addClass("down");
            if (selfTel.css("display") == "none") {
                $(".tel-list li .tel-details").hide();
                selfTel.css("display", "block");
                $element.removeClass("down").addClass("up");
            } else {
                $element.removeClass("up").addClass("down");
                $(".tel-list li .tel-details").hide();
                selfTel.css("display", "none")
            }
        }
    }],
    resolve: {
        datacontext: function($getData, $stateParams) {
            return $getData('call_list', {
                page_size: 20,
                page_num: 1,
                sort_type: 'ORDER_BY_CALL_TIME',
                plan_id: $stateParams.id
            });
        }
    }
};
