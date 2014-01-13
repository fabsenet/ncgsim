/// <reference path="_references.ts" />

module State {

    export class State {
        graph = Graph.GraphFactory.getInstance<String>();
        gameSettings: GameSettings = new GameSettings();

    }

    export class GameSettings {
        operationMode: OperationMode = OperationMode.SEQUENTIAL;
        gameManipulation: (state: State) => State = null;
    }

    export enum OperationMode {
        SEQUENTIAL,
        PARALLEL
    }

}