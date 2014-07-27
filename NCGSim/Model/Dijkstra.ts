/// <reference path="_references.ts" />


class DijkstraNodeDetails<TNodePayload>{
    distance: number = Number.MAX_VALUE;
    prevNode: INode<TNodePayload> = null;

    public toString(): string {
        return "DijkstraNodeDetails(distance=" + ((this.distance == Number.MAX_VALUE) ? "infinite" : this.distance.toString()) +
            ", prevNode.id=" + (this.prevNode==null ? "null" : this.prevNode.id.toString()) + ")";
    }
}

class Dijkstra {

    private static debug = (message?: string, ...optionalParams: any[]) => { };

    public static setDebugEnabled(enabled: boolean): void {
        if (enabled) {
            Dijkstra.debug = console.debug;
        } else {
            Dijkstra.debug = () => {};
        }
    }

    /**
     * The weightFunction must return a value >=0 for every existing edge
     * The function returns an array of nodes which build the (or one) shortest path excluding the start and end nodes
     * If the function return null, this means there is no path at all
     * The function returns an empty array if start==end
     */
    public static getShortestPath<TNodePayload>(graph: IGraph<TNodePayload>, startNode: INode<TNodePayload>, endNode: INode<TNodePayload>,
        weightFunction: (startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) => number): INode<TNodePayload>[]{

        if (startNode == endNode) {
            return [];
        }

        //init Dijkstra
        var unvisitedNodes = graph.getNodes();
        Dijkstra.debug("Dijkstra: init: unvisitedNodes", _.map(unvisitedNodes, (node) => { return node.id; }));

        var nodeDetails: DijkstraNodeDetails<TNodePayload>[] = [];

        _.forEach(unvisitedNodes, (node) => {
            nodeDetails[node.id] = new DijkstraNodeDetails<TNodePayload>();

            if (node == startNode) {
                Dijkstra.debug("Dijkstra: init: setting start node distance=0; node.id:", node.id);
                nodeDetails[node.id].distance = 0;
            }
        });

        var currentNode = startNode;

        while (currentNode != null) {
            var currentNodeDetails: DijkstraNodeDetails<TNodePayload> = nodeDetails[currentNode.id];
            Dijkstra.debug("Dijkstra: while: currentNode.id", currentNode.id);
            Dijkstra.debug("Dijkstra: while: currentNodeDetails", currentNodeDetails.toString());

            //"visit" current node
            __.removeArrayItem(unvisitedNodes, currentNode);
            var allConnectedNodes = this.getAllConnectedNodes(graph, currentNode);
            Dijkstra.debug("Dijkstra: while: allConnectedNodes", _.map(allConnectedNodes, (node) => { return node.id; }));

            _.forEach(allConnectedNodes, (connectedNode) => {
                var weight = weightFunction(currentNode, connectedNode);
                Dijkstra.debug("Dijkstra: while: weightFunction: currentNode.id, connectedNode.id, weight", currentNode.id, connectedNode.id, weight);

                var connectedNodeDetail: DijkstraNodeDetails<TNodePayload> = nodeDetails[connectedNode.id];
                if (currentNodeDetails.distance + weight < connectedNodeDetail.distance) {
                    Dijkstra.debug("Dijkstra: while: updating connectedNodeDetail before", connectedNodeDetail.toString());
                    connectedNodeDetail.distance = currentNodeDetails.distance + weight;
                    connectedNodeDetail.prevNode = currentNode;
                    Dijkstra.debug("Dijkstra: while: updating connectedNodeDetail after", connectedNodeDetail.toString());
                }
            });

            //select next node to visit
            Dijkstra.debug("Dijkstra: while: select next node to visit: unvisitedNodes", _.map(unvisitedNodes, (node) => { return node.id; }));
            var nextNode: INode<TNodePayload> = _.first(_.sortBy(unvisitedNodes, (node) => { return nodeDetails[node.id].distance; }));

            if (nextNode != null && nodeDetails[nextNode.id].distance < Number.MAX_VALUE) {
                currentNode = nextNode;
            } else {
                currentNode = null;
            }
            Dijkstra.debug("Dijkstra: while: selected next node to visit", currentNode);

        }

        //build path from start to end
        var nodeDetail: DijkstraNodeDetails<TNodePayload> = nodeDetails[endNode.id];
        if (nodeDetail.distance == Number.MAX_VALUE) {
            //start and end have no connection
            return null;
        } else {

            //walk path backwards
            var path: INode<TNodePayload>[] = [];
            while (nodeDetail.prevNode != startNode) {
                path.push(nodeDetail.prevNode);
                nodeDetail = nodeDetails[nodeDetail.prevNode.id];
            }
            return __.reverse(path);
        }

    }


    private static getAllConnectedNodes<TNodePayload>(graph: IGraph<TNodePayload>, startNode: INode<TNodePayload>): INode<TNodePayload>[] {
        var connectedNodes: INode<TNodePayload>[] = [];

        _.forEach(graph.getNodes(), (node) => {
            if (node != startNode && graph.hasEdge(startNode, node) || graph.hasEdge(node, startNode)) {
                connectedNodes.push(node);
            }
        });

        return connectedNodes;
    }

}