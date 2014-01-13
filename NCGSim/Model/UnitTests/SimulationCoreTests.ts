/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("A SimulationCore", ()=> {

    it("stores the initial state as running state", () => {
        var state = new State.State();
        var simulationHistory = new SimulationCore.SimulationHistory(state);

        expect(simulationHistory.runningState).toBe(state);
    });

    it("stores a copy of the initial state as the first history step", () => {
        var state = new State.State();
        var simulationHistory = new SimulationCore.SimulationHistory(state);

        expect(simulationHistory.states[0]).not.toBe(state);
        expect(simulationHistory.states[0]).toMatch(state);
    });

    it("can store a graph with a circular reference", ()=> {
        var state = new State.State();
        var node1 = state.graph.addNode(null);
        var node2 = state.graph.addNode(null);
        state.graph.addEdge(node1, node2);
        state.graph.addEdge(node2, node1);

        var history = new SimulationCore.SimulationHistory(state);

        var graph1 = history.states[0].graph;

        expect(graph1.getNodes().length).toBe(2);

        node1 = graph1.getNodes()[0];
        node2 = graph1.getNodes()[1];

        expect(graph1.hasEdge(node1, node2)).toBe(true);
        expect(graph1.hasEdge(node2, node1)).toBe(true);
    });

});