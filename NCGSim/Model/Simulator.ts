/// <reference path="_references.ts" />




    interface ISimulator {
        simulateOneRound(state: State) : IAction[];
    }

    class RatedAction {
        action: IAction;
        cost: number;

        constructor(action: IAction, cost: number) {
            this.action = action;
            this.cost = cost;
        }

    }

    class SequentialSimulator implements ISimulator {

        //TODO write spec for this method
        simulateOneRound(currentState: State): IAction[] {

            var actionsToPerform: IAction[] = [];

            //for each player
            _.each(currentState.graph.getNodes(), playerNode=> {

                //find all possible actions
                var possibleActionsForPlayer: IAction[] = SimulatorBase.getPossibleActionForPlayer(playerNode, currentState);

                //rate all actions
                var ratedActions:RatedAction[] = [];
                _.each(possibleActionsForPlayer, (action) => { ratedActions.push(SimulatorBase.rateAction(playerNode, action, currentState)); });

                //select the best action
                var bestAction:RatedAction = _.first(_.sortBy(ratedActions, action=> action.cost));

                //remember action
                actionsToPerform.push(bestAction.action);

                //apply action to state (special case for simulating sequential playing)
                bestAction.action.apply(currentState);

            });

            //revert all actions to fullfill contract of not permanently modifying currentState
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

        static getPossibleActionForPlayer(playerNode: INode<NodeData>, state: State): IAction[] {
            if (playerNode == null) {
                return [];
            }

            var possibleActions: IAction[] = [new NoOpAction()];

            //buildNodeActions and removeNodeActions
            _.each(state.graph.getNodes(), (node: INode<NodeData>) => {
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

        static rateAction(playerNode:INode<NodeData>, action:IAction, state:State): RatedAction {
            //temporary apply selected action and calculate cost
            action.apply(state);

            var nodes = state.graph.getNodes();
            __.removeArrayItem(nodes, playerNode);
            var connectionCosts = _.reduce(nodes,
                (costs: number, targetNode: INode<NodeData>)=> costs + state.calculatePartialConnectionCosts(playerNode, targetNode),
                0.0);

            var operatingCosts = _.reduce(playerNode.connectedEdges,
                (costs: number, targetNode: INode<NodeData>)=> costs + state.calculatePartialOperatingCosts(playerNode, targetNode),
                0.0);

            var totalCosts = connectionCosts + operatingCosts;

            action.revert(state);

            return new RatedAction(action, totalCosts);
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
