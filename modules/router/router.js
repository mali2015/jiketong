'use strict';

var index = require('pages/index/index');
var home = require('pages/home/home');
var statement = require('pages/statement/statement');
var tel = require('pages/tel/tel');
var account = require('pages/account/account');

/**
 * Route configuration for the jiketong module.
 */
angular.module('jiketong').config(function ($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', index)
        .state('index.home', home)
        .state('index.statement', statement)
        .state('index.tel', tel)
        .state('index.account', account);
});