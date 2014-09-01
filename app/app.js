/**
 * Created by ppalak on 2014-08-29.
 */
"use strict";

var app = angular.module('tutorial', ['ngRoute', 'controllers']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/client', {templateUrl: 'partials/client.html'})
        .when('/clientList', {templateUrl: 'partials/clientList.html'})
        .otherwise({redirectTo: '/client'});
});

var controllers = angular.module('controllers', ['services']);

controllers.controller('ClientController', function ($scope, $rootScope, ClientService) {
    $scope.message = '';
    $rootScope.activeView = 'client';

    $scope.submitClient = function () {
        var client = {
            name: $scope.name,
            surname: $scope.surname,
            age: $scope.age
        };
        ClientService.submitClient(client);
        $scope.message = 'Submited client: ' + $scope.name + ' ' + $scope.surname;
    }
});

controllers.controller('ClientListController', function ($scope, $rootScope) {
    $rootScope.activeView = 'clientList';

});

controllers.controller('MenuController', function ($scope, $rootScope) {

    $scope.getItemClass = function (name) {
        if ($rootScope.activeView == name) {
            return 'active';
        } else {
            return '';
        }
    };

});

var services = angular.module('services', []);

services.service('ClientService', function ($log) {
    var clients = [];
    var submitClient = function (client) {
        $log.info('client submited');
        clients.push(client);
    };
    return{
        submitClient: submitClient
    }
});

