/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />


describe("A GraphFactory", ()=> {
    it("returns a graph instance", ()=> {
        var graph = Graph.GraphFactory.getInstance<String>();
        expect(graph).not.toBeNull();
    });
});


describe("A Graph", () => {

    var graph;

    beforeEach(()=> {
        graph = Graph.GraphFactory.getInstance<String>();
    });

    it("is initially empty", () => {
        var nodes = graph.getNodes();
        expect(nodes.length).toEqual(0);
    });

    it("can add nodes with payload", () => {
        var node1 = graph.addNode("node 1");
        var nodes = graph.getNodes();
        expect(nodes.length).toBe(1);
        expect(node1.data).toBe("node 1");
        expect(nodes).toContain(node1);
    });

    it("can remove nodes", ()=> {
        var node = graph.addNode("a node");

        var nodes = graph.getNodes();
        expect(nodes).toContain(node);

        graph.removeNode(node);

        nodes = graph.getNodes();
        expect(nodes).not.toContain(node);
    });

    it("has one based ids", () => {
        var node1 = graph.addNode("node 1");
        expect(node1.id).toBe(1);
    });

    it("does not reuse node ids", ()=> {
        graph.removeNode(graph.addNode("abc"));
        graph.removeNode(graph.addNode("abc"));
        graph.removeNode(graph.addNode("abc"));
        graph.removeNode(graph.addNode("abc"));

        var node5 = graph.addNode("Number 5 is alive");
        expect(node5.id).toBe(5);
    });

    it("does add edges", () => {
        var node1 = graph.addNode("1");
        var node2 = graph.addNode("2");

        expect(graph.hasEdge(node1, node2)).toBe(false);

        graph.addEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(true);
        expect(graph.hasEdge(node2, node1)).toBe(false);
    });

    it("does remove edges", () => {
        var node1 = graph.addNode("1");
        var node2 = graph.addNode("2");

        expect(graph.hasEdge(node1, node2)).toBe(false);
        graph.addEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(true);
        graph.removeEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(false);
    });

    it("ignores multiple adds of edges", () => {
        var node1 = graph.addNode("1");
        var node2 = graph.addNode("2");

        expect(graph.hasEdge(node1, node2)).toBe(false);
        graph.addEdge(node1, node2);
        graph.addEdge(node1, node2);
        graph.addEdge(node1, node2);
        graph.addEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(true);
        graph.removeEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(false);
    });

    it("ignores removing of no existant edges", () => {
        var node1 = graph.addNode("1");
        var node2 = graph.addNode("2");

        expect(graph.hasEdge(node1, node2)).toBe(false);
        graph.removeEdge(node1, node2);
        expect(graph.hasEdge(node1, node2)).toBe(false);
    });

    it("throws on adding edges with same start and end node", ()=> {
        var node = graph.addNode(null);
        expect(()=> graph.addEdge(node, node)).toThrowError();
    });
});