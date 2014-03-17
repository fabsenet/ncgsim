angular.module('app.directives.graphviz', [])
    .directive('graphviz', function (): ng.IDirective {
        var directive: ng.IDirective = {
            restrict: 'A',
            scope: {
                graph: "="
            },
            templateUrl: "Templates/Directives/graphviz.html",
        };

    return directive;
});

interface ILine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

class graphvizCtrl {

    graph: IGraph<NodeData>;
    width = 300;
    height = 300;
    radius = 10;

    lines:ILine[] = [];

    private buildLines() {
        var nodes = this.graph.getNodes();

        this.lines = [];
        nodes.forEach((startNode: INode<NodeData>)=> {
            startNode.connectedEdges.forEach((endNode: INode<NodeData>)=> {
                this.lines.push({
                    x1: startNode.data.position.x,
                    y1: startNode.data.position.y,
                    x2: endNode.data.position.x,
                    y2: endNode.data.position.y
                });
            });
        });
    }

    constructor($scope) {
        var tscope = <ng.IScope>$scope;

        //whenever the graph changes, we have to build the lines abstraction again
        tscope.$watch('graph', this.buildLines.bind(this), true);

        $scope.vm = this;
        this.graph = $scope.graph;
        this.buildLines();
    }

}