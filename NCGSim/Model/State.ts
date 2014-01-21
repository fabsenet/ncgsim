/// <reference path="_references.ts" />


class State {
    graph = GraphFactory.getInstance<NodeData>();
    gameSettings: GameSettings = new GameSettings();
    roundCounter = 0;
}

class NodeData {
    position = {x: 0, y:0};
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

