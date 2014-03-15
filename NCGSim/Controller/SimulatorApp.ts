/// <reference path="../model/_references.ts" />

class StateViewModel {
    nodes: INode<NodeData>[];
    addNode = function () {
        this.state.graph.addNode(new NodeData(Math.round(Math.random() * 19) + 1, Math.round(Math.random() * 19) + 1));
        this.refresh();
    };
    removeNode = function () {
        var nodes = this.state.graph.getNodes();
        if (nodes.length == 0) return;
        this.state.graph.removeNode(_.last(nodes));
        this.refresh();
    };

    refresh = function () {
        this.nodes = this.state.graph.getNodes();
    };

    state: State;

    constructor() {
        this.state = new State();
        this.state.graph.addNode(new NodeData(1, 1));
        this.state.graph.addNode(new NodeData(8, 2));
        this.state.graph.addNode(new NodeData(3, 7));

        this.refresh();
    }
}

interface stateCtrlScope extends ng.IScope {
    state: State;
    vm: StateViewModel;
    refresh: () => void;
}

angular.module('SimulatorApp', ['ui.bootstrap']);
var stateCtrl = function($scope: stateCtrlScope) {

    var vm = new StateViewModel();
    $scope.vm = vm;

    //TODO costs and gameManipulation functions need to done in a proper way too
    $scope.costs = {
        calculatePartialConnectionCosts: vm.state.calculatePartialConnectionCosts.toString(),
        calculatePartialOperatingCosts: vm.state.calculatePartialOperatingCosts.toString()
    };

    $scope.settings = {
        gameManipulation: vm.state.gameSettings.gameManipulation == null ? "null" : vm.state.gameSettings.gameManipulation.toString()
    };
};
