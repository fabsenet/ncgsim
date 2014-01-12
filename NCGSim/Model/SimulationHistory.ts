/// <reference path="_references.ts" />

module SimulationHistory {

    export class SimulationHistory {
        jsonStates: string[] = [];
        states: State.State[] = [];
        runningState: State.State;

        constructor(initialState: State.State) {
            this.runningState = initialState;
            this.saveToHistory(initialState);
        }

        saveToHistory(state: State.State) {
            //TODO the graph has circular references which will break the json
            var jsonStateCopy = JSON.stringify(state);
            this.jsonStates.push(jsonStateCopy);

            var stateCopy = <State.State> JSON.parse(jsonStateCopy);
            this.states.push(stateCopy);
        }

        simulateNextStep() {
            var sim = Simulator.SimulatorFactory.buildInstance(this.runningState.gameSettings.operationMode);

            sim.simulateOneRound(this.runningState);

            this.saveToHistory(this.runningState);
        }

    }

}