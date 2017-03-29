module.exports = {
    url: '/feedback',
    template: __inline('./feedback.html'),
    controller: ['$scope', '$getData',
        function($scope, $getData) {
            $scope.onSubmit = function() {
                if ($scope.feedback) {
                    $getData('feedback', {
                        feedback: $scope.feedback
                    }).then(function(res){
                    	if(res.status === 0){
                    		$scope.feedback = '';
                    		alert('感谢您的反馈意见，我们会尽快处理！');
                    	}
                    });
                }
            }
        }
    ]
};
