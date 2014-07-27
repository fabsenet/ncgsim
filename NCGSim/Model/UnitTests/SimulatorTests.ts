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

    it("rates correctly for a given graph (issue #12)", () => {
        //this graph has 5 nodes connected in a circle by 5 edges
        var jsonString = '{"graph":{"nodes":[{"id":1,"x":100,"y":100},{"id":2,"x":140,"y":130},{"id":3,"x":120,"y":170},{"id":4,"x":80,"y":170},{"id":5,"x":60,"y":130}],"edges":[{"from":1,"to":2},{"from":2,"to":3},{"from":3,"to":4},{"from":4,"to":5},{"from":5,"to":1}]},"gameSettings":"Sequential","roundCounter":0,"alpha":1.5}';
        state = JSON.parse(jsonString, State.reviver);
        var node3 = state.graph.getNodeById(3);
        var costs = SimulatorBase.rateState(node3, state);
        console.log("Rated costs for node 3", costs);

        //all nodes are connected, so there should be a "no connection" penalty
        expect(costs.totalCosts).toBeLessThan(1000);

        //each node operates exactly one edge
        expect(costs.operatingCosts).toBe(1 * state.alpha);

        //connection costs should be 2 nodes at distance one and two nodes at distance 2
        expect(costs.connectionCosts).toBe(2 * 1 + 2 * 2);

    });
});

xdescribe("A SequentialSimulator", () => {

    var simulator: ISimulator;

    beforeEach(()=> {
        simulator = SimulatorFactory.buildInstance(OperationMode.SEQUENTIAL);
    });



});




 