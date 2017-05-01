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
                id: localStorage.getItem('userid')
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
app.filter('datefilter', function() {
    return function(input) {
        if (input) {
            return input.substring(5, input.length - 3);
        } else {
            return input;
        }
    }
}).filter('timefilter', function() {
    return function(input) {
        var time = new Date(input * 1000);
        time.setHours(0);
        return time.toTimeString().split(' ')[0];
    }
}).filter('callstatefilter', function() {
    return function(input, name) {
        var str = '';
        switch (input) {
            case 0:
                str = '未接通';
                break;
            case 1:
                str = '已接通';
                break;
            case 2:
                var len = name.length;
                if(len > 3){
                    len = 3;
                }
                str = name.substring(0, len) + '留电';
                break;
            default:
                break;
        }
        return str;
    }
});

app.value('$userid', {});
