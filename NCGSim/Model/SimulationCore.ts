/// <reference path="_references.ts" />

interface IAction {
    apply(state: State): void;
    revert(state: State): void;
}

class SimulationHistory {
    actionsByRound: IAction[][] = [];
    state: State;
    simulator: ISimulator;

    constructor(initialState: State) {
        this.state = initialState;
    }

    simulateNextStep() {
        this.simulator = SimulatorFactory.buildInstance(this.state.gameSettings.operationMode);

        var actions = this.simulator.simulateOneRound(this.state);

        if (actions == null || actions.length <= 0) {
            actions = [];
        }

        _.each(actions, function (action) {
            action.apply(this.state);
        }, this);

        this.state.roundCounter++;
        this.actionsByRound.push(actions);
    }

    goOneRoundBack() {
        var actionsToRevert = this.actionsByRound[--this.state.roundCounter];

        _.each(actionsToRevert, function (action) {
            action.revert(this.state);
        }, this);
    }

}
