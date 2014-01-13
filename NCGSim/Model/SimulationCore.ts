/// <reference path="_references.ts" />

module SimulationCore {

    export class SimulationHistory {
        actions: any[] = [];
        runningState: State.State;

        constructor(initialState: State.State) {
            this.runningState = initialState;
        }

        simulateNextStep() {
            var sim = Simulator.SimulatorFactory.buildInstance(this.runningState.gameSettings.operationMode);

            sim.simulateOneRound(this.runningState);

        }

    }

}