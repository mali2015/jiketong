var api = 'http://www.data03.com/api/jkt/';
var app = angular.module('jiketong', ['ui.router', 'ngCookies']);
require('router');

/**
 * Master Controller
 */

app.controller('MasterCtrl', function($scope, $cookieStore) {

});


//定义共同方法
app.factory('$getData', function($http, $q, $userid) {
    return function(method, params) {
        var defer = $q.defer();
        $http.get(api + method, {
            params: angular.extend(params, {
                id: sessionStorage.getItem('userid')
            })
        }).success(function(data, status, headers, congfig) {
            defer.resolve(data);
        }).error(function(data, status, headers, congfig) {
            defer.reject(data);
        });
        return defer.promise;
    }
}).factory('$checkLog', function($state) {
    return function(res) {
        if (res.status === 1) {
            $state.go('login');
        }
    }
});

//定义过滤器
app.filter('datefilter', function(){
    return function(input){
        return input.replace(/-/g, '.');
    }
}).filter('timefilter', function(){
    return function(input){
        var time = new Date(input * 1000);
        time.setHours(0);
        return time.toTimeString().split(' ')[0];
    }
});

app.value('$userid', {});
