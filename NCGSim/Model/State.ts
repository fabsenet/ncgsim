/// <reference path="_references.ts" />

module State {

    export class State {
        graph = Graph.GraphFactory.getInstance<String>();
        gameSettings: GameSettings = new GameSettings();
    }

    export class GameSettings {
        operationMode: OperationMode;
        gameManipulation: (state: State)=> State;
    }

    export enum OperationMode {
        SEQUENTIAL,
        PARALLEL
    }

}