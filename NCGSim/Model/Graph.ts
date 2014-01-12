/// <reference path="_references.ts" />

module Graph {

    export interface INode<TNodePayload> {
        id: number;
        data: TNodePayload;
    }

    export interface IGraph<TNodePayload> {
        //Edge manipulations
        hasEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): boolean;
        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): void;
        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): void;

        //Node manipulations
        addNode(payload: TNodePayload): INode<TNodePayload>;
        removeNode(node: INode<TNodePayload>);

        //enumeration
        getNodes() : INode<TNodePayload>[];
    }

    export class GraphFactory {
        static getInstance<TNodePayload>() : IGraph<TNodePayload> {
            return new AdjacencyGraph<TNodePayload>();
        }
    }

    class AdjacencyGraph<TNodePayload> implements IGraph<TNodePayload> {
        private edges: Edge<TNodePayload>[] = [];
        private nextNodeId = 1;

        hasEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            var startEdge = <Edge<TNodePayload>> startNode;
            var endEdge = <Edge<TNodePayload>> endNode;
            
            return _.contains(startEdge.connectedEdges, endEdge);
        }

        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            var startEdge = <Edge<TNodePayload>> startNode;
            var endEdge = <Edge<TNodePayload>> endNode;

            if (!_.contains(startEdge.connectedEdges, endEdge)) {
                startEdge.connectedEdges.push(endEdge);
            }
        }

        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            var startEdge = <Edge<TNodePayload>> startNode;
            var endEdge = <Edge<TNodePayload>> endNode;

            ArrayHelper.removeItem(startEdge.connectedEdges, endEdge);
        }


        addNode(payload: TNodePayload): INode<TNodePayload> {
            var node = new Edge<TNodePayload>();
            node.id = this.nextNodeId++;
            node.data = payload;
            this.edges.push(node);
            return node;
        }

        removeNode(node: INode<TNodePayload>) {
            ArrayHelper.removeItem(this.edges, node);
        }

        getNodes(): INode<TNodePayload>[] {
            return this.edges;
        }

    }

    class Edge<TNodePayload> implements INode<TNodePayload> {
        id: number;
        connectedEdges: Edge<TNodePayload>[] = [];

        data: TNodePayload;
    }
}