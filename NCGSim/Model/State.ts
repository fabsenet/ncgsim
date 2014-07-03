/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;

    alpha: number = 0.81;

    calculatePartialOperatingCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {
        return this.alpha;
    }

    calculatePartialConnectionCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {

        var path = Dijkstra.getShortestPath(this.graph, startNode, endNode, () => 1);

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

