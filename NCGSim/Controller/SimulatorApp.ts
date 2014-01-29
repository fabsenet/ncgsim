/// <reference path="../model/_references.ts" />

angular.module('SimulatorApp', ['ui.bootstrap']);
var stateCtrl = function($scope:ng.IScope) {
    var state = new State();
    state.graph.addNode(new NodeData(1, 1));
    state.graph.addNode(new NodeData(8, 2));
    state.graph.addNode(new NodeData(3, 7));

    $scope.state = state;

    $scope.vm = {};

    $scope.refresh =() => {
        $scope.vm.nodes = state.graph.getNodes();
    };

    $scope.refresh();

    $scope.vm.addNode = function() {
        state.graph.addNode(new NodeData(Math.round(Math.random() * 19)+1, Math.round(Math.random() * 19)+1));
        $scope.refresh();
    };

    $scope.vm.removeNode = function () {
        var nodes = state.graph.getNodes();
        if (nodes.length == 0) return;
        state.graph.removeNode(_.last(nodes));
        $scope.refresh();
    };

    $scope.costs = {
        calculatePartialConnectionCosts: state.calculatePartialConnectionCosts.toString(),
        calculatePartialOperatingCosts: state.calculatePartialOperatingCosts.toString()
    };

    $scope.settings = {
        gameManipulation: state.gameSettings.gameManipulation == null ? "null" : state.gameSettings.gameManipulation.toString()
    };

    
    $scope.vm.readableOperationMode = state.gameSettings.operationMode == OperationMode.SEQUENTIAL ? "SEQUENTIAL" : "PARALLEL";

    $scope.vm.refreshReadableOperationMode = function(selectedMode: OperationMode) {
        $scope.vm.readableOperationMode = selectedMode == OperationMode.SEQUENTIAL ? "SEQUENTIAL" : "PARALLEL";
    };

}; 