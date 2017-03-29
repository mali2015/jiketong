'use strict';

var board = require('pages/board/board');
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
        .state('board', board)
        .state('board.home', home)
        .state('board.statement', statement)
        .state('board.tel', tel)
        .state('board.account', account)
        .state('msg', msg)
        .state('login', login)
        .state('password', password)
        .state('feedback', feedback)
        .state('resetpwd', resetpwd)
        .state('verify', verify);
});