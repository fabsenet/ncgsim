/// <reference path="_references.ts" />

    interface INode<TNodePayload> {
        id: number;
        data: TNodePayload;
        connectedEdges: number[];
    }

    interface IGraph<TNodePayload> {
        //Edge manipulations
        hasEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): boolean;
        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): void;
        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>): void;
      
          //Node manipulations
        addNode(payload: TNodePayload, id?:number): INode<TNodePayload>;
        removeNode(node: INode<TNodePayload>);

        //enumeration
        getNodes(): INode<TNodePayload>[];
        getNodeById(id:number):INode<TNodePayload>;

    }

    class GraphFactory {
        static getInstance<TNodePayload>() : IGraph<TNodePayload> {
            return new AdjacencyGraph<TNodePayload>();
        }
    }

    interface IIdToNodeMap<TNodePayload> {
        [id:number]: INode<TNodePayload>;
    }

    class AdjacencyGraph<TNodePayload> implements IGraph<TNodePayload> {
        private nodes: AdjacencyNode<TNodePayload>[] = [];
        private nextNodeId = 1;
        private nodesById: IIdToNodeMap<TNodePayload>={};

        hasEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            return _.contains(startNode.connectedEdges, endNode.id);
        }

        addEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            if (startNode === endNode) {throw new Error("StartNode MUST NOT be the same as the EndNode for this graph implementation");}

            if (!_.contains(startNode.connectedEdges, endNode.id)) {
                startNode.connectedEdges.push(endNode.id);
            }
        }

        removeEdge(startNode: INode<TNodePayload>, endNode: INode<TNodePayload>) {
            __.removeArrayItem(startNode.connectedEdges, endNode.id);
        }


        addNode(payload: TNodePayload, id?: number): INode<TNodePayload> {
            if (id === undefined) {
                //no id defined, use the next one
                id = this.nextNodeId++;
            } else {
                //a specific id is requested, check and use this one
                if (this.nodesById[id] !== undefined) {
                    throw new Error("The requested ID is already used in this graph!");
                }
                if (!isNaN(parseInt(<any>id))) {
                    this.nextNodeId = Math.max(this.nextNodeId + 1, id + 1);
                } else {
                    this.nextNodeId = this.nextNodeId++;
                }
            }
            //construct
            var node = new AdjacencyNode<TNodePayload>();
            node.id = id;
            node.data = payload;

            //save
            this.nodes.push(node);
            this.nodesById[node.id] = node;

            //return
            return node;
        }


        removeNode(node: INode<TNodePayload>) {
            //remove edges to and from this node
            _.forEach(this.nodes, (otherNode) => {
                if (this.hasEdge(otherNode, node)) {
                    this.removeEdge(otherNode, node);
                } else if (this.hasEdge(node, otherNode)) {
                    this.removeEdge(node, otherNode);
                }
            });

            //remove the node itself
            __.removeArrayItem(this.nodes, node);
            delete this.nodesById[node.id];
        }

        getNodes(): INode<TNodePayload>[] {
            return _.clone(this.nodes);
        }

        getNodeById(id: number): INode<TNodePayload> {
            return this.nodesById[id] || null;
        }

    }

    class AdjacencyNode<TNodePayload> implements INode<TNodePayload> {
        id: number;
        connectedEdges: number[] = [];

        data: TNodePayload;
    }
