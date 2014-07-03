/// <reference path="_references.ts" />


class DijkstraNodeDetails<TNodePayload>{
    distance: number = Number.MAX_VALUE;
    prevNode: INode<TNodePayload> = null;
}

class Dijkstra {

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

        var nodeDetails: DijkstraNodeDetails<TNodePayload>[] = [];

        _.forEach(unvisitedNodes, (node) => {
            nodeDetails[node.id] = new DijkstraNodeDetails<TNodePayload>();

            if (node == startNode) {
                nodeDetails[node.id].distance = 0;
            }
        });

        var currentNode = startNode;

        while (currentNode != null) {
            var currentNodeDetails: DijkstraNodeDetails<TNodePayload> = nodeDetails[currentNode.id];

            //"visit" current node
            _.forEach(this.getAllConnectedNodes(graph, currentNode), (connectedNode) => {
                var weight = weightFunction(currentNode, connectedNode);
                var connectedNodeDetail: DijkstraNodeDetails<TNodePayload> = nodeDetails[connectedNode.id];
                if (currentNodeDetails.distance + weight < connectedNodeDetail.distance) {
                    connectedNodeDetail.distance = currentNodeDetails.distance + weight;
                    connectedNodeDetail.prevNode = currentNode;
                }
            });

            //select next node to visit
            var nextNode: INode<TNodePayload> = _.first(_.sortBy(unvisitedNodes, "distance"));
            if (nextNode != null && nodeDetails[nextNode.id].distance < Number.MAX_VALUE) {
                currentNode = nextNode;
                __.removeArrayItem(unvisitedNodes, nextNode);
            } else {
                currentNode = null;
            }
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