/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A NoOpAction", ()=> {

    it("returns the correct typename", () => {
        var action = new NoOpAction();
        expect(action.typename).toBe("NoOpAction");
    });
});

describe("A BuildNodeAction", () => {

    var state: State;
    var simulationHistory;

    beforeEach(() => {
        state = new State();
        state.gameSettings.operationMode = OperationMode.UNITTEST;
        simulationHistory = new SimulationHistory(state);
    });

    it("returns the correct typename", ()=> {
        var nodedata = new NodeData(12, 5);
        var action = new BuildNodeAction(nodedata);
        expect(action.typename).toBe("BuildNodeAction");
    });

    it("builds a node and reverts it", () => {
        var nodedata = new NodeData(12, 5);
        var action = new BuildNodeAction(nodedata);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        expect(state.graph.getNodes().length).toBe(0);
        simulationHistory.simulateNextStep();
        expect(state.graph.getNodes().length).toBe(1);
        expect(_.first(state.graph.getNodes()).data).toBe(nodedata);

        simulationHistory.goOneRoundBackwards();
        expect(state.graph.getNodes().length).toBe(0);
    });

});

describe("A BuildEdgeAction", () => {

    var state: State;
    var simulationHistory;
    var node1;
    var node2;

    beforeEach(() => {
        state = new State();
        node1 = state.graph.addNode(new NodeData(1, 1));
        node2 = state.graph.addNode(new NodeData(1, 2));
        state.gameSettings.operationMode = OperationMode.UNITTEST;
        simulationHistory = new SimulationHistory(state);
    });

    it("returns the correct typename", () => {
        var action = new BuildEdgeAction(node1, node2);
        expect(action.typename).toBe("BuildEdgeAction");
    });

    it("builds an edge and reverts it", () => {
        var action = new BuildEdgeAction(node1, node2);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(false);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        simulationHistory.simulateNextStep();

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(true);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        simulationHistory.goOneRoundBackwards();

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(false);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);
    });

    it("throws if the edge already exists", () => {

        state.graph.addEdge(node1, node2);
        var action = new BuildEdgeAction(node1, node2);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(true);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        expect(() => simulationHistory.simulateNextStep()).toThrow();
    });

    it("throws if the edge disappears between apply and revert", () => {
        var action = new BuildEdgeAction(node1, node2);
        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };
        simulationHistory.simulateNextStep();
        state.graph.removeEdge(node1, node2);
        expect(() => simulationHistory.goOneRoundBackwards()).toThrow();
    });

});

describe("A RemoveEdgeAction", () => {

    var state: State;
    var simulationHistory;
    var node1;
    var node2;

    beforeEach(() => {
        state = new State();
        node1 = state.graph.addNode(new NodeData(1, 1));
        node2 = state.graph.addNode(new NodeData(1, 2));
        state.graph.addEdge(node1, node2);
        state.gameSettings.operationMode = OperationMode.UNITTEST;
        simulationHistory = new SimulationHistory(state);
    });

    it("returns the correct typename", () => {
        var action = new RemoveEdgeAction(node1, node2);
        expect(action.typename).toBe("RemoveEdgeAction");
    });

    it("removes an edge (=apply) and rebuilds it (=revert)", () => {
        var action = new RemoveEdgeAction(node1, node2);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(true);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        simulationHistory.simulateNextStep();

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(false);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        simulationHistory.goOneRoundBackwards();

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(true);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);
    });

    it("throws if there is no edge to remove (apply)", () => {
        state.graph.removeEdge(node1, node2);
        var action = new RemoveEdgeAction(node1, node2);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };

        expect(state.graph.getNodes().length).toBe(2);
        expect(state.graph.hasEdge(node1, node2)).toBe(false);
        expect(state.graph.hasEdge(node2, node1)).toBe(false);

        expect(() => simulationHistory.simulateNextStep()).toThrow();
    });

    it("throws if the specified edge appears between apply and revert", () => {
        var action = new RemoveEdgeAction(node1, node2);

        SimulatorFactory.simulatorInstance = { simulateOneRound: (s: State) => [action] };
        simulationHistory.simulateNextStep();
        state.graph.addEdge(node1, node2); 
        expect(() => simulationHistory.goOneRoundBackwards()).toThrow();
    });

});