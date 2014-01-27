/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A SimulatorBase", () => {

    var state: State;

    beforeEach(() => { state = new State(); });

    it("generates no actions if there are no nodes (but does not throw)", () => {
        var possibleActions = SimulatorBase.getPossibleActionForPlayer(null, state);
        expect(possibleActions).toEqual([]);
    });

    it("returns always one NoOpAction", ()=> {
        var node1 = state.graph.addNode(new NodeData(1, 1));

        var possibleActions = SimulatorBase.getPossibleActionForPlayer(node1, state);

        expect(possibleActions.length).toBe(1);
        expect(_.first(possibleActions)).toEqual(new NoOpAction());

    });

    it("generates AddEdgeActions if there is no edge in the graph", () => {
        var node1 = state.graph.addNode(new NodeData(1, 1));
        var node2 = state.graph.addNode(new NodeData(2, 2));

        var possibleActions = SimulatorBase.getPossibleActionForPlayer(node1, state);

        expect(possibleActions).toContain(new BuildEdgeAction(node1, node2));
    });

    it("generates AddEdgeActions only from the starting node", () => {
        var node1 = state.graph.addNode(new NodeData(1, 1));
        var node2 = state.graph.addNode(new NodeData(2, 2));

        var possibleActions = SimulatorBase.getPossibleActionForPlayer(node1, state);

        expect(possibleActions).not.toContain(new BuildEdgeAction(node2, node1));
    });

    it("generates RemoveEdgeActions if there is an edge in the graph", () => {
        var node1 = state.graph.addNode(new NodeData(1, 1));
        var node2 = state.graph.addNode(new NodeData(2, 2));
        state.graph.addEdge(node1, node2);

        var possibleActions = SimulatorBase.getPossibleActionForPlayer(node1, state);

        expect(possibleActions).toContain(new RemoveEdgeAction(node1, node2));
    });

    it("generates RemoveEdgeActions only for edges starting from the starting node", () => {
        var node1 = state.graph.addNode(new NodeData(1, 1));
        var node2 = state.graph.addNode(new NodeData(2, 2));
        state.graph.addEdge(node1, node2);

        var possibleActions = SimulatorBase.getPossibleActionForPlayer(node1, state);

        expect(possibleActions).not.toContain(new RemoveEdgeAction(node2, node1));
    });
});

xdescribe("A SequentialSimulator", () => {

    var simulator: ISimulator;

    beforeEach(()=> {
        simulator = SimulatorFactory.buildInstance(OperationMode.SEQUENTIAL);
    });



});




 