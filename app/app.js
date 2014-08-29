/**
 * Created by ppalak on 2014-08-29.
 */
"use strict";

var app = angular.module('tutorial', []);

app.controller('ClientController', function ($scope) {
    $scope.message = '';

    $scope.submitClient = function(){
        $scope.message = 'Submited client: '+$scope.name+' '+$scope.surname;
    }
});

