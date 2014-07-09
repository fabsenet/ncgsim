/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("A Point", () => {
    var p0:Point;
    var p1: Point;
    var p3_7: Point;

    beforeEach(()=> {
        p0 = new Point(0, 0);
        p1 = new Point(1, 1);
        p3_7 = new Point(3, -7);
    });

    it("calculates the distance to itself as 0", () => {
        expect(p0.getDistance(p0)).toBe(0);
    });

    it("calculates the correct distance to other points", () => {
        expect(p0.getDistance(p1)).toBeCloseTo(1.414, 3);
        expect(p1.getDistance(p3_7)).toBeCloseTo(8.246211, 3);
        expect(p1.getDistance(p3_7)).toBeCloseTo(p3_7.getDistance(p1), 7);
    });
});

describe("A State", () => {
    var state: State;

    beforeEach(()=> {
        state = new State();
    });

    it("has valid start values", ()=> {
        expect(state).toBeDefined();
        expect(state.graph).toBeDefined();
        expect(state.gameSettings).toBeDefined();

        expect(state.roundCounter).toBe(0);
    });

    it("can be serialized", () => {
        var json: string;
        expect(() => { json = JSON.stringify(state); }).not.toThrow();
        expect(json).toContain("{");
    });

    it("can be deserialized", () => {

        state.gameSettings.operationMode = OperationMode.PARALLEL;

        var n1 = state.graph.addNode(new NodeData(10, 10));
        var n2 = state.graph.addNode(new NodeData(20, 20));
        var n3 = state.graph.addNode(new NodeData(30, 30));

        state.graph.addEdge(n1, n2);

        var json: string;

        console.log("State before", state);
        expect(() => { json = JSON.stringify(state, State.replacer); }).not.toThrow();
        state = null;
        console.log("JSON",json);
        expect(() => { state = JSON.parse(json, State.reviver); }).not.toThrow();// TODO: The class information should not get lost on rehydration
        console.log("State after", state);

        expect(state.gameSettings.operationMode).toEqual(OperationMode.PARALLEL);
        expect(state.graph.addNode).toBeDefined();

        expect(state.graph.getNodes().length).toBe(3);
        expect(state.graph.getNodes()[0].data).toMatch(new NodeData(10, 10));

        expect(state.graph.hasEdge(state.graph.getNodeById(n1.id), state.graph.getNodeById(n2.id))).toBe(true);

    });
});