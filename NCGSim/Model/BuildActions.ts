/// <reference path="_references.ts" />


class NoOpAction implements  IAction {

    apply(state: State): void {}

    revert(state: State): void {}

}

 class BuildEdgeAction implements IAction {

     startNode: INode<NodeData>;
     endNode: INode<NodeData>;

     constructor(startNode: INode<NodeData>, endNode: INode<NodeData>) {
         this.startNode = startNode;
         this.endNode = endNode;
     }


     apply(state: State): void {
         if (state.graph.hasEdge(this.startNode, this.endNode)) throw new Error("The edge already existed.");
         state.graph.addEdge(this.startNode, this.endNode);
     }

     revert(state: State): void {
         if (!state.graph.hasEdge(this.startNode, this.endNode)) throw new Error("There is no edge to remove. Check the order of your actions!");
         state.graph.removeEdge(this.startNode, this.endNode);
     }

 }

class RemoveEdgeAction implements IAction {

     startNode: INode<NodeData>;
     endNode: INode<NodeData>;

     constructor(startNode: INode<NodeData>, endNode: INode<NodeData>) {
         this.startNode = startNode;
         this.endNode = endNode;
     }


     apply(state: State): void {
         if (!state.graph.hasEdge(this.startNode, this.endNode)) throw new Error("The specified edge does not exist.");
         state.graph.removeEdge(this.startNode, this.endNode);
     }

     revert(state: State): void {
         if (state.graph.hasEdge(this.startNode, this.endNode)) throw new Error("There is already an edge. Check the order of your actions!");
         state.graph.addEdge(this.startNode, this.endNode);
     }

 }

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

         //TODO add check: there should be no edges to and from the node at this moment

         state.graph.removeNode(this.node);
     }

 }