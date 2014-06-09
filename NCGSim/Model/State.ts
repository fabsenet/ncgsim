/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;

    alpha: number = 1.3;

    calculatePartialOperatingCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {
        return this.alpha;
    }

    calculatePartialConnectionCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {

        var path = Dijkstra.getShortestPath(this.graph, startNode, endNode, () => 1);

        if (this.graph.hasEdge(startNode, endNode) || this.graph.hasEdge(endNode, startNode)) {
            return startNode.data.position.getDistance(endNode.data.position);
        } else {
            return 99999;
        }
    }
}

class NodeData {
    position : Point;

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

