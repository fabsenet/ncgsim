/// <reference path="../model/_references.ts" />


angular.module('simulatorController', ['ui.bootstrap']);
var ButtonsCtrl = function ($scope) {
    var state = new State();
    $scope.sometext = state.calculatePartialConnectionCosts.toString();
}; 