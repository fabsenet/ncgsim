/// <reference path="_references.ts" />

    interface INode<TNodePayload> {
        id: number;
        data: TNodePayload;
        connectedEdges: INode<TNodePayload>[];
    }

    interface IGraph<TNodePayload> {
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

    class GraphFactory {
        static getInstance<TNodePayload>() : IGraph<TNodePayload> {
            return new AdjacencyGraph<TNodePayload>();
        }
    }

    class AdjacencyGraph<TNodePayload> implements IGraph<TNodePayload> {
        private nodes: AdjacencyNode<TNodePayload>[] = [];
        private nextNodeId = 1;

        hasEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            return _.contains(startNode.connectedEdges, endNode);
        }

        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            if (startNode === endNode) {throw new Error("StartNode MUST NOT be the same as the EndNode for this graph implementation");}

            if (!_.contains(startNode.connectedEdges, endNode)) {
                startNode.connectedEdges.push(endNode);
            }
        }

        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            __.removeArrayItem(startNode.connectedEdges, endNode);
        }


        addNode(payload: TNodePayload): INode<TNodePayload> {
            var node = new AdjacencyNode<TNodePayload>();
            node.id = this.nextNodeId++;
            node.data = payload;
            this.nodes.push(node);
            return node;
        }

        removeNode(node: INode<TNodePayload>) {
            __.removeArrayItem(this.nodes, node);
        }

        getNodes(): INode<TNodePayload>[] {
            return _.clone(this.nodes);
        }

    }

    class AdjacencyNode<TNodePayload> implements INode<TNodePayload> {
        id: number;
        connectedEdges: AdjacencyNode<TNodePayload>[] = [];

        data: TNodePayload;
    }
