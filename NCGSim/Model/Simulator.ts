/// <reference path="_references.ts" />




    interface ISimulator {
        simulateOneRound(state: State) : IAction[];
    }

    class SequentialSimulator implements ISimulator {

        //TODO write spec for this method
        simulateOneRound(currentState: State): IAction[] {

            var actionsToPerform: IAction[] = [];
            _.each(currentState.graph.getNodes(), playerNode=> {

                var possibleActionsForPlayer: IAction[] = SimulatorBase.getPossibleActionForPlayer(playerNode, currentState);
            });

            //revert all actions to fullfill contract of not permanently modifying  currentState
            _.each(actionsToPerform, action=> action.revert(currentState));
            return actionsToPerform;
        }

    }

    class ParallelSimulator implements ISimulator {

        simulateOneRound(currentState: State): IAction[] {
            //todo add actually simulating here
            throw new Error("Not implemented");
        }

    }

    class SimulatorBase {

        //TODO write SPEC for this method
        static getPossibleActionForPlayer(playerNode: INode<NodeData>, state): IAction[] {
            var possibleActions: IAction[] = [];

            //buildNodeActions and removeNodeActions
            _.each(state.getNodes(), (node: INode<NodeData>) => {
                if (node === playerNode) return;

                if (state.graph.hasEdge(playerNode, node)) {
                    //this edge exists, so a remove edge is possible
                    possibleActions.push(new RemoveEdgeAction(playerNode, node));
                } else {
                    //this edge exists, so building this edge is possible
                    possibleActions.push(new BuildEdgeAction(playerNode, node));
                }
            });
            return possibleActions;
        }

    }

    class SimulatorFactory {

        static simulatorInstance: ISimulator;

        static buildInstance(operationMode: OperationMode): ISimulator {
            switch (operationMode) {

                case OperationMode.SEQUENTIAL:
                return new SequentialSimulator();

                case OperationMode.PARALLEL:
                    return new ParallelSimulator();

                case OperationMode.UNITTEST:
                    return this.simulatorInstance;
            default:
                return null;
            }
        }

    }
