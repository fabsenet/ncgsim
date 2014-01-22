/// <reference path="_references.ts" />


class BuildNodeAction implements IAction {

     nodeData: NodeData;
     node: INode<NodeData>;

     constructor(nodeData: NodeData) {
         this.nodeData = nodeData;
     }
     

     apply(state: State): void {
        this.node = state.graph.addNode(this.nodeData);
     }

     revert(state: State): void {
         state.graph.removeNode(this.node);
     }

 }

 class BuildEdgeAction implements IAction {

     startNode: INode<NodeData>;
     endNode: INode<NodeData>;

     constructor(startNode: INode<NodeData>, endNode: INode<NodeData>) {
         this.startNode = startNode;
         this.endNode = endNode;
     }


     apply(state: State): void {
         state.graph.addEdge(this.startNode, this.endNode);
     }

     revert(state: State): void {
         state.graph.removeEdge(this.startNode, this.endNode);
     }

 }