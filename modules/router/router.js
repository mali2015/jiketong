'use strict';

var index = require('pages/index/index');
var home = require('pages/home/home');
var statement = require('pages/statement/statement');
var tel = require('pages/tel/tel');
var account = require('pages/account/account');
var msg = require('pages/msg/msg');
var login = require('pages/login/login');
var password = require('pages/password/password');
var feedback = require('pages/feedback/feedback');
var resetpwd = require('pages/resetpwd/resetpwd');
var verify = require('pages/verify/verify');

/**
 * Route configuration for the jiketong module.
 */
angular.module('jiketong').config(function ($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/login');

    // Application routes
    $stateProvider
        .state('index', index)
        .state('index.home', home)
        .state('index.statement', statement)
        .state('index.tel', tel)
        .state('index.account', account)
        .state('msg', msg)
        .state('login', login)
        .state('password', password)
        .state('feedback', feedback)
        .state('resetpwd', resetpwd)
        .state('verify', verify);
});