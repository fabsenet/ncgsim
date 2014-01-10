/// <reference path="_references.ts" />


module Simulator {


    export interface ISimulator {
        simulateOneRound(state: State.State);
    }

    class SequentialSimulator implements ISimulator {

        simulateOneRound(currentState: State.State) {
            //todo add actually simulating here
            throw new Error("Not implemented");
        }

    }

    class ParallelSimulator implements ISimulator {

        simulateOneRound(currentState: State.State) {
            //todo add actually simulating here
            throw new Error("Not implemented");
        }

    }

    export class SimulatorFactory {

        static buildInstance(operationMode: State.OperationMode): ISimulator {
            switch (operationMode) {

                case State.OperationMode.SEQUENTIAL:
                return new SequentialSimulator();

                case State.OperationMode.PARALLEL:
                return new ParallelSimulator();
            default:
                return null;
            }
        }

    }
}