'use strict';

var index = require('pages/index/index');
var home = require('pages/home/home');

/**
 * Route configuration for the jiketong module.
 */
angular.module('jiketong').config(function ($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', index)
        .state('index.home', home);
});