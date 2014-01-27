/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;

    calculatePartialOperatingCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {
        //TODO implementation is part of the actual scenario
        return startNode.data.position.getDistance(endNode.data.position);
    }
    calculatePartialConnectionCosts(startNode: INode<NodeData>, endNode: INode<NodeData>): number {
        //TODO implementation is part of the actual scenario
        if (this.graph.hasEdge(startNode, endNode)) {
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
    gameManipulation: (state: State) => State = null;
}

enum OperationMode {
    SEQUENTIAL,
    PARALLEL,
    UNITTEST
}

