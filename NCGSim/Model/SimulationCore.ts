/// <reference path="_references.ts" />

interface IAction {
    typename: string;
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

        if (actions == null || actions.length <= 0 || _.all(actions, action=> action instanceof NoOpAction)) {
            //the simulator yielded no actions => simulation is finished
            return false;
        }


        _.each(actions, function(action) {
            action.apply(this.state);
        }, this);

        this.state.roundCounter++;
        this.actionsByRound.push(actions);
        return true;
    }

    canGoOneRoundBackwards(): boolean {
        return this.state.roundCounter > 0;
    }
    canGoOneRoundForward(): boolean {
        return this.actionsByRound.length > this.state.roundCounter;
    }

    goOneRoundBackwards() {
        if (!this.canGoOneRoundBackwards()) throw new Error("Can not go any more backwards.");

        var actionsToRevert = this.actionsByRound[--this.state.roundCounter];

        //TODO Reverse the order of actions?
        _.each(actionsToRevert, function (action) {
            action.revert(this.state);
        }, this);
    }

    goOneRoundForward() {
        if (!this.canGoOneRoundForward()) throw new Error("Can not go any more forward. Maybe you can simulate more rounds?");

        var actionsToReapply = this.actionsByRound[this.state.roundCounter++];

        _.each(actionsToReapply, function (action) {
            action.apply(this.state);
        }, this);
    }

}
