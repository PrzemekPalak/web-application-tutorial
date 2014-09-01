/**
 * Created by ppalak on 2014-08-29.
 */
"use strict";

var app = angular.module('tutorial', ['controllers']);

var controllers = angular.module('controllers', ['services']);

controllers.controller('ClientController', function ($scope, ClientService) {
    $scope.message = '';

    $scope.submitClient = function(){
        var client  = {
            name : $scope.name,
            surname: $scope.surname,
            age: $scope.age
        };
        ClientService.submitClient(client);
        $scope.message = 'Submited client: '+$scope.name+' '+$scope.surname;
    }
});

var services = angular.module('services', []);
services.service('ClientService', function($log){
    var clients = [];
    var submitClient = function(client){
        $log.info('client submited');
        clients.push(client);
    };
    return{
        submitClient: submitClient
    }
});

