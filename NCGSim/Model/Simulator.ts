/// <reference path="_references.ts" />




    interface ISimulator {
        simulateOneRound(state: State) : IAction[];
    }

    class SequentialSimulator implements ISimulator {

        simulateOneRound(currentState: State): IAction[] {
            //todo add actually simulating here
            throw new Error("Not implemented");
        }

    }

    class ParallelSimulator implements ISimulator {

        simulateOneRound(currentState: State): IAction[] {
            //todo add actually simulating here
            throw new Error("Not implemented");
        }

    }

    class SimulatorFactory {

        static simulatorInstance: ISimulator;

        static buildInstance(operationMode: OperationMode): ISimulator {
            switch (operationMode) {

                case OperationMode.SEQUENTIAL:
                return new SequentialSimulator();

                case OperationMode.PARALLEL:
                    return new ParallelSimulator();

                case OperationMode.UNITTEST:
                    return this.simulatorInstance;
            default:
                return null;
            }
        }

    }
