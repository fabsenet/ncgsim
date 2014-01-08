module model {

    interface ISimulator {
        simulateOneRound(state: State):State;
    }
    class SequentialSimulator implements ISimulator {
        
        simulateOneRound(currentState:State): State {
            //todo add actually simulating here
            var newstate = new State();
            newstate.roundNumber = currentState.roundNumber++;
            newstate.gameSettings = currentState.gameSettings;
            newstate.graph = currentState.graph;
            return newstate;
        }

    }

    class ParallelSimulator implements ISimulator {

        simulateOneRound(currentState: State): State {
            //todo add actually simulating here
            var newstate = new State();
            newstate.roundNumber = currentState.roundNumber++;
            newstate.gameSettings = currentState.gameSettings;
            newstate.graph = currentState.graph;
            return newstate;
        }

    }

    class SimulatorFactory {

        buildInstance(operationMode: OperationMode): ISimulator {
            switch (operationMode) {

            case OperationMode.SEQUENTIAL:
                return new SequentialSimulator();

            case OperationMode.PARALLEL:
                return new ParallelSimulator();
            default:
                return null;
            }
        }

    }

    class SimulationHistory {
        states: State[];

        simulateNextStep() {
            var lastState = this.states[this.states.length];

            var sim = new Simulator(lastState);
            var nextState = sim.simulate();

            if (nextState != null) {
                this.states.push(nextState);
                return true;
            } else {
                return false;
            }
        }

    }

    class State {
        roundNumber: number;
        graph: Graph;
        gameSettings: GameSettings;
    }

    class Graph {
        edges : Edge[];
    }

    class Edge {
        id: number;
        position: Point;
        connectedEdges: Edge[];
    }

    class Point {
        x: number;
        y: number;
    }

    class GameSettings {
        operationMode: OperationMode;
        gameManipulation: (state: State)=> State;
    }

    enum OperationMode {
        SEQUENTIAL,
        PARALLEL
    }

}