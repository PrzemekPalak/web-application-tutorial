/**
 * Created by ppalak on 2014-08-29.
 */
"use strict";

var app = angular.module('tutorial', []);

app.controller('ClientController', function ($scope, ClientService) {
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

app.service('ClientService', function(){
    var clients = [];
    var submitClient = function(client){
        clients.push(client);
    };
    return{
        submitClient: submitClient
    }
});

