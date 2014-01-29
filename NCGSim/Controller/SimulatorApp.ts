/// <reference path="../model/_references.ts" />

class StateViewModel {
    nodes: INode<NodeData>[];
    addNode = function () {
        this.state.graph.addNode(new NodeData(Math.round(Math.random() * 19) + 1, Math.round(Math.random() * 19) + 1));
        this.$scope.refresh();
    };
    removeNode = function () {
        var nodes = this.state.graph.getNodes();
        if (nodes.length == 0) return;
        this.state.graph.removeNode(_.last(nodes));
        this.$scope.refresh();
    };

    refresh = function () {
        this.$scope.vm.nodes = this.state.graph.getNodes();
    };

    private $scope: stateCtrlScope;
    private state:State;
    constructor(scope: stateCtrlScope, state:State) {
        this.$scope = scope;
        this.state = state;

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
    var state = new State();
    state.graph.addNode(new NodeData(1, 1));
    state.graph.addNode(new NodeData(8, 2));
    state.graph.addNode(new NodeData(3, 7));

    $scope.state = state;
    $scope.vm = new StateViewModel($scope, state);


    $scope.costs = {
        calculatePartialConnectionCosts: state.calculatePartialConnectionCosts.toString(),
        calculatePartialOperatingCosts: state.calculatePartialOperatingCosts.toString()
    };

    $scope.settings = {
        gameManipulation: state.gameSettings.gameManipulation == null ? "null" : state.gameSettings.gameManipulation.toString()
    };
};
