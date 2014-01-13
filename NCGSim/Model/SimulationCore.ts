/// <reference path="_references.ts" />

module SimulationCore {

    export class SimulationHistory {
        actions: any[] = [];
        state: State.State;
        simulator: Simulator.ISimulator;

        constructor(initialState: State.State) {
            this.state = initialState;
            this.simulator = Simulator.SimulatorFactory.buildInstance(this.state.gameSettings.operationMode);
        }

        simulateNextStep() {

            this.simulator.simulateOneRound(this.state);

        }

    }

}