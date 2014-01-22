/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;
}

class NodeData {
    position;

    constructor(x: number = 0, y: number = 0) {
        this.position = { x: x, y: y };
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

