/// <reference path="_references.ts" />

module State {

    export class State {
        graph: Graph;
        gameSettings: GameSettings;
    }

    export class Graph {
        edges: Edge[];
    }

    export class Edge {
        id: number;
        position: Point;
        connectedEdges: Edge[];
    }

    export class Point {
        x: number;
        y: number;
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