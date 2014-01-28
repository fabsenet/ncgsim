/// <reference path="../model/_references.ts" />


angular.module('SimulatorApp', ['ui.bootstrap']);
var stateCtrl = function ($scope) {
    var state = new State();

    $scope.calculatePartialConnectionCosts = state.calculatePartialConnectionCosts.toString();
    $scope.calculatePartialOperatingCosts = state.calculatePartialOperatingCosts.toString();

    $scope.operationMode = state.gameSettings.operationMode;
    $scope.readableOperationMode = () => {
        console.log("computing readableOperationMode. Mode in $scope= '" + $scope.operationMode+"' Mode in model = " + state.gameSettings.operationMode);
        return state.gameSettings.operationMode == OperationMode.SEQUENTIAL ? "SEQUENTIAL" : "PARALLEL";
    };

    $scope.gameManipulation = state.gameSettings.gameManipulation == null? "null" : state.gameSettings.gameManipulation.toString();
}; 