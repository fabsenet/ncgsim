module model {

    class simulator {
        currentState:state;
        constructor(currentState: state) {
            this.currentState = currentState;
        }

        simulate(): state {
            //todo actually simulating here
            var newstate = new state();
            newstate.roundNumber = this.currentState.roundNumber;
            newstate.gameSettings = this.currentState.gameSettings;
            newstate.graph = this.currentState.graph;
            return newstate;
        }
    }

    class simulationHistory {
        states: state[];

        simulateNextStep() {
            var lastState = this.states[this.states.length];

            var sim = new simulator(lastState);
            var nextState = sim.simulate();

            if (nextState != null) {
                this.states.push(nextState);
                return true;
            } else {
                return false;
            }
        }
    }

    class state {

        roundNumber: number;

        graph: graph;

        gameSettings: gameSettings;
    }

    class graph {
    }

    class gameSettings {
    }
}