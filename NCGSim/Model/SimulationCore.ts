/// <reference path="_references.ts" />

interface IAction {
    typename: string;
    apply(state: State): void;
    revert(state: State): void;
}

class SimulationHistory {
    ratedActionsByRound: RatedAction[][] = [];
    state: State;
    simulator: ISimulator;

    constructor(initialState: State) {
        this.state = initialState;
    }

    simulateNextStep() {
        this.simulator = SimulatorFactory.buildInstance(this.state.gameSettings.operationMode);

        var ratedActions:RatedAction[] = this.simulator.simulateOneRound(this.state);

        if (ratedActions == null || ratedActions.length <= 0 || _.all(ratedActions, (ratedAction:RatedAction) => (ratedAction.action) instanceof NoOpAction)) {
            //the simulator yielded no actions => simulation is finished
            return false;
        }


        _.each(ratedActions, function(ratedAction) {
            ratedAction.action.apply(this.state);
        }, this);

        this.state.roundCounter++;
        this.ratedActionsByRound.push(ratedActions);
        return true;
    }

    canGoOneRoundBackwards(): boolean {
        return this.state.roundCounter > 0;
    }
    canGoOneRoundForward(): boolean {
        return this.ratedActionsByRound.length > this.state.roundCounter;
    }

    goOneRoundBackwards() {
        if (!this.canGoOneRoundBackwards()) throw new Error("Can not go any more backwards.");

        var actionsToRevert = this.ratedActionsByRound[--this.state.roundCounter];

        //TODO Reverse the order of actions?
        _.each(actionsToRevert, function (ratedAction) {
            ratedAction.action.revert(this.state);
        }, this);
    }

    goOneRoundForward() {
        if (!this.canGoOneRoundForward()) throw new Error("Can not go any more forward. Maybe you can simulate more rounds?");

        var actionsToReapply = this.ratedActionsByRound[this.state.roundCounter++];

        _.each(actionsToReapply, function (ratedAction) {
            ratedAction.action.apply(this.state);
        }, this);
    }

}
