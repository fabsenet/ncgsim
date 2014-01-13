/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("A SimulationCore", ()=> {

    it("stores the initial state as running state", () => {
        var state = new State.State();
        var simulationHistory = new SimulationCore.SimulationHistory(state);

        expect(simulationHistory.state).toBe(state);
    });

});