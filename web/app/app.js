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

controllers.controller('ClientListController', function ($scope, $rootScope, ClientService) {
    $rootScope.activeView = 'clientList';
    ClientService.getClients().then(function (data) {
            $scope.clients = data.clientList;
        },
        function (errorMessage) {
            $scope.message = errorMessage;
        });
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

controllers.controller('NotificationController', function ($scope, $log) {
    var eb = new vertx.EventBus('/eventbus');

    eb.onopen = function () {

        eb.registerHandler('notifications', function (message) {

            $log.info('received a message: ' + JSON.stringify(message));

            $scope.$apply(function(){
                $scope.message = message.msg;
            });

        });

    }

});

var services = angular.module('services', []);

services.service('ClientService', function ($log, $http, $q) {

    var submitClient = function (client) {
        $http.post("/api/client", client).error(function () {
            $log.error('error submitting client');
        });
        $log.info('client submitted');
    };

    var getClients = function () {

        var deferred = $q.defer();

        $http.get("/api/clientList").success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            $log.error('error getting client list');
            deferred.reject("Error getting client list");
        });

        return deferred.promise;
    };

    return {
        submitClient: submitClient,
        getClients: getClients
    }
});

