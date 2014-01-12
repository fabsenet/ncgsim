/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("A SimulationHistory", ()=> {

    it("stores the initial state as running state", () => {
        var state = new State.State();
        var simulationHistory = new SimulationHistory.SimulationHistory(state);

        expect(simulationHistory.runningState).toBe(state);
    });

    it("stores a copy of the initial state as the first history step", () => {
        var state = new State.State();
        state.gameSettings = new State.GameSettings();
        var simulationHistory = new SimulationHistory.SimulationHistory(state);

        expect(simulationHistory.states[0]).not.toBe(state);
        expect(simulationHistory.states[0]).toMatch(state);
    });

});