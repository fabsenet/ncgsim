/// <reference path="_references.ts" />

module Graph {

    export interface INode<TNodePayload> {
        id: number;
        data: TNodePayload;
        connectedEdges: INode<TNodePayload>[];
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
            return _.contains(startNode.connectedEdges, endNode);
        }

        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            if (!_.contains(startNode.connectedEdges, endNode)) {
                startNode.connectedEdges.push(endNode);
            }
        }

        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            ArrayHelper.removeItem(startNode.connectedEdges, endNode);
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