/// <reference path="../model/_references.ts" />


interface IEdge {
    startNode: INode<NodeData>;
    endNode: INode<NodeData>;
}

class stateCtrl {

    constructor($scope) {
        $scope.vm = this;

        this.state = new State();
        this.state.graph.addNode(new NodeData(30, 30));
        this.state.graph.addNode(new NodeData(80, 200));
        this.state.graph.addNode(new NodeData(123, 70));

        this.history = new SimulationHistory(this.state);

        this.costs = {
            calculatePartialConnectionCosts: this.state.calculatePartialConnectionCosts.toString(),
            calculatePartialOperatingCosts: this.state.calculatePartialOperatingCosts.toString()
        };

        this.refresh();
        $scope.$watch("vm", this.refresh.bind(this), true);
    }

    replaceState(state: State) {
        console.log("replaceState called", state, this);

        this.state = state;
        this.history = new SimulationHistory(this.state);

        this.costs = {
            calculatePartialConnectionCosts: this.state.calculatePartialConnectionCosts.toString(),
            calculatePartialOperatingCosts: this.state.calculatePartialOperatingCosts.toString()
        };

        this.refresh();
    }

    importStateFromJson(json: string) {
        console.log("importStateFromJson called", json, this);

        var state = JSON.parse(json, State.reviver);

        this.replaceState(state);
    }

    canImportStateFromJson(json: string): boolean {
        if (json == null || json.trim() == "") return false;

        try {
        JSON.parse(json, State.reviver);
            return true;
        }
        catch (e) {
            console.debug("stateCtrl: canImportStateFromJson", { json: json, error: e });
        }
        return false;
    }

    state: State;
    stateAsJson: string;
    history: SimulationHistory;
    nodes: INode<NodeData>[];
    edges: IEdge[];

    costs: {
        calculatePartialConnectionCosts: string;
        calculatePartialOperatingCosts: string;
    };

    selectedNode: INode<NodeData> = null;

    selectNode(node: INode<NodeData>) {
        if (this.selectedNode == node) {
            this.selectedNode = null;
        } else {
            this.selectedNode = node;
        }
    }

    addNode():void {
        this.state.graph.addNode(new NodeData(Math.round(Math.random() * 300) + 1, Math.round(Math.random() * 300) + 1));
        this.refresh();
    }

    removeNode():void {
        var nodes = this.state.graph.getNodes();
        if (nodes.length == 0) return;
        this.state.graph.removeNode(_.last(nodes));
        this.refresh();
    }

    isNotANoOpAction(ratedAction: RatedAction): boolean {
        return ratedAction.action.typename != "NoOpAction";
    }

    private refresh(): void {
        this.nodes = this.state.graph.getNodes();
        this.edges = this.getEdges();

        this.stateAsJson = JSON.stringify(this.state, State.replacer, 2);
    }

    private getEdges(): IEdge[] {
        var edges: IEdge[]=[];

        _.forEach(this.state.graph.getNodes(), (startNode:INode<NodeData>) => {
            _.forEach(startNode.connectedEdges, (endNodeId: number)=> {
                var endNode = this.state.graph.getNodeById(endNodeId);
                edges.push({
                    startNode: startNode,
                    endNode: endNode
                });
            });
        });

        return edges;
    }
}

var app = angular.module('SimulatorApp', ['ui.bootstrap', 'app.directives.graphviz', 'app.directives.ncgversion']);
app.controller("stateCtrl", stateCtrl);