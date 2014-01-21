/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A SimulationCore", ()=> {

    var state;
    var simulationHistory;

    beforeEach(()=> {
        state = new State();
        state.graph.addNode("asd");
        state.gameSettings.operationMode = OperationMode.UNITTEST;
        simulationHistory = new SimulationHistory(state);
    });

    it("stores the initial state as running state", () => {
        expect(simulationHistory.state).toBe(state);
    });

    it("applies returned actions in a simulation round", () => {
        var action: IAction = { apply: state => { }, revert: state => { } };

        spyOn(action, "apply");
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        simulationHistory.simulateNextStep();

        expect(action.apply).toHaveBeenCalledWith(state);
    });

    it("increases the round counter", () => {

        var expected = state.roundCounter + 1;
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [] };

        simulationHistory.simulateNextStep();

        expect(state.roundCounter).toBe(expected);
    });

    it("stores applied actions in a simulation round", () => {
        var action: IAction = { apply: state => { }, revert: state => { } };

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };
        simulationHistory.simulateNextStep();

        expect(_.last(simulationHistory.actionsByRound)).toEqual([action]);
    });

    it("calls revert on action if the last round is reverted", () => {
        var action: IAction = { apply: state => { }, revert: state => { } };

        spyOn(action, "apply");
        spyOn(action, "revert");
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        simulationHistory.simulateNextStep();
        simulationHistory.goOneRoundBack();

        expect(action.apply).toHaveBeenCalledWith(state);
        expect(action.revert).toHaveBeenCalledWith(state);
    });

    it("decrements the roundCounter if the last round is reverted", () => {
        var action: IAction = { apply: state => { }, revert: state => { } };

        var expected = state.roundCounter;
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };
        simulationHistory.simulateNextStep();
        simulationHistory.goOneRoundBack();

        expect(state.roundCounter).toBe(expected);
    });
});