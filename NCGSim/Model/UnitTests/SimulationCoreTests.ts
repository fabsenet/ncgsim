/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A SimulationCore", ()=> {

    var state;
    var simulationHistory;

    beforeEach(()=> {
        state = new State();
        state.graph.addNode(new NodeData(10, 10));
        state.graph.addNode(new NodeData(20, 20));
        state.graph.addNode(new NodeData(30, 30));
        state.gameSettings.operationMode = OperationMode.UNITTEST;
        simulationHistory = new SimulationHistory(state);
    });

    it("stores the initial state as running state", ()=> {
        expect(simulationHistory.state).toBe(state);
    });

    it("applies returned actions in a simulation round", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        spyOn(action, "apply");
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };

        simulationHistory.simulateNextStep();

        expect(action.apply).toHaveBeenCalledWith(state);
    });

    it("increases the round counter", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        var expected = state.roundCounter + 1;
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };

        simulationHistory.simulateNextStep();

        expect(state.roundCounter).toBe(expected);
    });

    it("stores applied actions in a simulation round", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };
        simulationHistory.simulateNextStep();

        expect(_.last(simulationHistory.actionsByRound)).toEqual([action]);
    });

    it("calls revert on action if the last round is reverted", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        spyOn(action, "apply");
        spyOn(action, "revert");
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };

        simulationHistory.simulateNextStep();
        simulationHistory.goOneRoundBackwards();

        expect(action.apply).toHaveBeenCalledWith(state);
        expect(action.revert).toHaveBeenCalledWith(state);
    });

    it("decrements the roundCounter if the last round is reverted", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        var expected = state.roundCounter;
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };
        simulationHistory.simulateNextStep();
        simulationHistory.goOneRoundBackwards();

        expect(state.roundCounter).toBe(expected);
    });

    it("cannot go forward or backward without simulating", ()=> {
        expect(simulationHistory.canGoOneRoundBackwards()).toBe(false);
        expect(simulationHistory.canGoOneRoundForward()).toBe(false);
    });

    it("throws if you try to go backward or forward beyond the known actions", ()=> {
        expect(()=> simulationHistory.goOneRoundBackwards()).toThrow();
        expect(()=> simulationHistory.goOneRoundForward()).toThrow();
    });

    it("calls reapplies actions if you go forward (after going backward)", ()=> {
        var action: IAction = { apply: state=> {}, revert: state=> {}, typename: "n/a" };

        var applySpy = spyOn(action, "apply");
        var revertSpy = spyOn(action, "revert");
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State)=> [action] };

        expect(applySpy.calls.count()).toBe(0);
        expect(revertSpy.calls.count()).toBe(0);

        simulationHistory.simulateNextStep();

        expect(applySpy.calls.count()).toBe(1);
        expect(revertSpy.calls.count()).toBe(0);

        simulationHistory.goOneRoundBackwards();

        expect(applySpy.calls.count()).toBe(1);
        expect(revertSpy.calls.count()).toBe(1);

        simulationHistory.goOneRoundForward();

        expect(applySpy.calls.count()).toBe(2);
        expect(revertSpy.calls.count()).toBe(1);
    });

});