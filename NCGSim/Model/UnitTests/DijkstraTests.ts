/// <reference path="../_references.ts" />
/// <reference path="../../scripts/typings/jasmine/jasmine.d.ts" />

describe("Dijkstra algorithm", () => {

    var graph;
    var node1, node2, node3, node4;

    beforeEach(() => {
        graph = GraphFactory.getInstance<String>();
        node1 = graph.addNode("node1");
        node2 = graph.addNode("node2");
        node3 = graph.addNode("node3");
        node4 = graph.addNode("node4");
    });



    it("returns null if there is no path at all between start and end", () => {
        var shortestPath = Dijkstra.getShortestPath(graph, node1, node2, () => 1);

        expect(shortestPath).toBeNull();
    });

    it("returns an empty array if start equals end", () => {
        var shortestPath = Dijkstra.getShortestPath(graph, node1, node1, () => 1);

        expect(shortestPath).toEqual([]);
    });

    it("returns an empty array if start and end nodes have a direct connection", () => {
        //Graph: 1 => 2
        graph.addEdge(node1, node2);
        var shortestPath = Dijkstra.getShortestPath(graph, node1, node2, () => 1);

        expect(shortestPath).toEqual([]);
    });

    it("returns an array of nodes on the shortest path from start to end excluding start and end nodes themself", () => {
        //Graph: 1 => 2 => 3
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);
        var shortestPath = Dijkstra.getShortestPath(graph, node1, node3, () => 1);

        expect(shortestPath).toEqual([node2]);
    });

    it("follows backward edges", () => {
        //Graph: 1 => 2 <= 3
        graph.addEdge(node1, node2);
        graph.addEdge(node3, node2);
        var shortestPath = Dijkstra.getShortestPath(graph, node1, node3, () => 1);

        expect(shortestPath).toEqual([node2]);
    });

    it("actually finds the shortest path", () => {
        //Graph: 1 => 2 => 3 => 4
        //        \-->-- 2 -->-/
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);
        graph.addEdge(node3, node4);
        graph.addEdge(node2, node4);

        var shortestPath = Dijkstra.getShortestPath(graph, node1, node3, () => 1);

        expect(shortestPath).toEqual([node2]);
    });
});