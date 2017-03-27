var api = 'http://www.data03.com/api/jkt/';
var app = angular.module('jiketong', ['ui.router', 'ngCookies']);
require('router');

/**
 * Master Controller
 */

app.controller('MasterCtrl', function($scope, $cookieStore) {

});

app.factory('$getData', function($http, $q, $userid) {
    return function(method, params) {
        var defer = $q.defer();
        $http.get(api + method, {
            params: angular.extend(params, {
                id: $userid.id
            })
        }).success(function(data, status, headers, congfig) {
            defer.resolve(data);
        }).error(function(data, status, headers, congfig) {
            defer.reject(data);
        });
        return defer.promise
    }
});

app.value('$userid', {});
