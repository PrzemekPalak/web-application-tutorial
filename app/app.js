/**
 * Created by ppalak on 2014-08-29.
 */
"use strict";

var app = angular.module('tutorial', []);

app.controller('ClientController', function ($scope) {
    $scope.name = 'Albin';
    $scope.surname = 'Kolano';
});

