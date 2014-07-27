/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;

    alpha: number = 0.81;


    private static debug = (message?: string, ...optionalParams: any[]) => { };

    public static setDebugEnabled(enabled: boolean): void {
        if (enabled) {
            State.debug = console.debug;
        } else {
            State.debug = () => { };
        }
    }


    calculatePartialOperatingCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {
        return this.alpha;
    }

    calculatePartialConnectionCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {


        var path = Dijkstra.getShortestPath(this.graph, startNode, endNode, () => 1);

        console.log("calculatePartialConnectionCosts: startnode.id, endnode.id, path", startNode.id, endNode.id, path);

        if (path == null) {
            //start and end have no connection
            return 1000;
        } else if (path.length == 0) {
            //start and end have a direct connection
            return 1;
        } else {
            //there is a shortest path with >1 edges
            return 1 + path.length;
        }
    }

    static replacer(key, value) {
        State.debug("State: replacer", key, value);

        var graph: IGraph<NodeData>;
        var nodes: INode<NodeData>[];

        switch (key) {
        case "gameSettings":
            var gameSettings = <GameSettings>value;
            switch (gameSettings.operationMode) {
            case OperationMode.PARALLEL:
                return "Parallel";
            case OperationMode.SEQUENTIAL:
                return "Sequential";
            case OperationMode.UNITTEST:
                return "Unittest";
            default:
                throw new Error("unsupported GameSetting: '" + value + "'");
            }

        case "graph":
            graph = <IGraph<NodeData>>value;
            return { nodes: graph.getNodes(), edges: graph };

        case "nodes":
            nodes = <INode<NodeData>[]>value;
            var simpleNodes = [];
            _.forEach(nodes, (node) => { simpleNodes.push({ id: node.id, x: node.data.position.x, y: node.data.position.y }); });
            return simpleNodes;

        case "edges":
            graph = <IGraph<NodeData>>value;
            nodes = graph.getNodes();
            var simpleEdges = [];
            _.forEach(nodes, (startNode) => {
                _.forEach(startNode.connectedEdges, (endNodeId) => {
                    simpleEdges.push({ from: startNode.id, to: endNodeId });
                });
            });
            return simpleEdges;
        default:
            return value;
        }
    }

    static reviver(key, value) {
        State.debug("State: reviver", key, value);
        switch (key) {
        case "gameSettings":
            var gameSettings = new GameSettings();
            switch (value) {
            case "Parallel":
                gameSettings.operationMode = OperationMode.PARALLEL;
                break;
            case "Sequential":
                gameSettings.operationMode = OperationMode.SEQUENTIAL;
                break;
            case "Unittest":
                gameSettings.operationMode = OperationMode.UNITTEST;
                break;

            default:
                throw new Error("unsupported GameSetting: '" + value + "'");
            }
            return gameSettings;

        case "graph":
            var graph = GraphFactory.getInstance<NodeData>();

            _.each(value.nodes, (simpleNode: any) => {
                var node = graph.addNode(new NodeData(simpleNode.x, simpleNode.y));
                if (node.id != simpleNode.id) {
                    throw new Error("ID mismatch. Expected id to be " + simpleNode.id + " but got " + node.id);
                }
            });
            _.each(value.edges, (simpleEdge: any) => {
                var startNode = graph.getNodeById(simpleEdge.from);
                var endNode = graph.getNodeById(simpleEdge.to);
                graph.addEdge(startNode, endNode);
                if (startNode == null || endNode == null) {
                    throw new Error("ID mismatch. Could not find start or end for an edge.");
                }
            });
            return graph;

        case "":
            var state = new State();
            state.gameSettings = value.gameSettings;
            state.graph = value.graph;
            state.roundCounter = value.roundCounter;
            state.alpha = value.alpha;
            return state;
        default:
            return value;
        }
    }
}

class NodeData {
    position: Point;

    constructor(x: number = 0, y: number = 0) {
        this.position = new Point(x, y);
    }
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getDistance(otherPoint: Point): number {
        return Math.sqrt(Math.pow(this.x - otherPoint.x, 2) + Math.pow(this.y - otherPoint.y, 2));
    }
}

class GameSettings {
    operationMode: OperationMode = OperationMode.SEQUENTIAL;
}

enum OperationMode {
    SEQUENTIAL,
    PARALLEL,
    UNITTEST
}