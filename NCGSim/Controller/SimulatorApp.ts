/// <reference path="../model/_references.ts" />

angular.module('SimulatorApp', ['ui.bootstrap']);

class StateController {

    constructor($scope) {
        $scope.vm = this;

        this.state = new State();
        this.state.graph.addNode(new NodeData(1, 1));
        this.state.graph.addNode(new NodeData(8, 2));
        this.state.graph.addNode(new NodeData(3, 7));

        this.costs = {
            calculatePartialConnectionCosts: this.state.calculatePartialConnectionCosts.toString(),
            calculatePartialOperatingCosts: this.state.calculatePartialOperatingCosts.toString()
        };

        this.settings = {
            gameManipulation: this.state.gameSettings.gameManipulation == null ? "null" : this.state.gameSettings.gameManipulation.toString()
        };

        this.refresh();
    }

    state: State;
    nodes: INode<NodeData>[];


    costs: {
        calculatePartialConnectionCosts: string;
        calculatePartialOperatingCosts: string;
    };

    settings: { gameManipulation: string };


    addNode() {
        this.state.graph.addNode(new NodeData(Math.round(Math.random() * 19) + 1, Math.round(Math.random() * 19) + 1));
        this.refresh();
    }

    removeNode() {
        var nodes = this.state.graph.getNodes();
        if (nodes.length == 0) return;
        this.state.graph.removeNode(_.last(nodes));
        this.refresh();
    }

    refresh() {
        this.nodes = this.state.graph.getNodes();
    }

}
