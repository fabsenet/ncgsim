angular.module('app.directives.graphviz', [])

    .directive('graphviz', function (): ng.IDirective {
        var directive: ng.IDirective = {
            restrict: 'A',
            scope: {
                graph: "=",
                hasBorder: "=",
                selectedNode: "=",
                nodeClicked: "&"
            },
            templateUrl: "Templates/Directives/graphviz.html",
        };

    return directive;
    }).directive('vbox', function () {
        return {
            link: function (scope, element, attrs) {
                attrs.$observe('vbox', function(value) {
                    element[0].setAttribute('viewBox', value);
                });
            }
        };
    });

interface ILine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    hasStartArrow?: boolean;
    hasEndArrow?: boolean;
}

class graphvizCtrl {

    graph: IGraph<NodeData>;

    width = 300;
    height = 300;
    radius = 10;

    minx: number = null;
    miny: number = null;
    maxx: number = null;
    maxy: number = null;

    lines:ILine[] = [];

    private buildLines() {
        var nodes = this.graph.getNodes();

        this.minx = this.miny = this.maxx = this.maxy = null;

        this.lines = [];
        nodes.forEach((startNode: INode<NodeData>)=> {
            startNode.connectedEdges.forEach((endNodeId: number) => {
                var endNode = this.graph.getNodeById(endNodeId);
                var currentline = {
                    x1: startNode.data.position.x,
                    y1: startNode.data.position.y,
                    x2: endNode.data.position.x,
                    y2: endNode.data.position.y,
                    hasEndArrow: true
            };

                var currentlineReversed = _.findWhere(this.lines, {
                    x1: endNode.data.position.x,
                    y1: endNode.data.position.y,
                    x2: startNode.data.position.x,
                    y2: startNode.data.position.y
                });

                if (currentlineReversed == null) {
                    this.lines.push(currentline);
                } else {
                    //the reversed edge exist, add marker
                    currentlineReversed.hasStartArrow = true;
                }
                
            });

            //search dimension of node area
            var pos = startNode.data.position;
            this.minx = this.minx == null ? pos.x : Math.min(this.minx, pos.x);
            this.miny = this.miny == null ? pos.y : Math.min(this.miny, pos.y);
            this.maxx = this.maxx == null ? pos.x : Math.max(this.maxx, pos.x);
            this.maxy = this.maxy == null ? pos.y : Math.max(this.maxy, pos.y);

        });
    }

    selectNode(node: INode<NodeData>) {
        this.scope.nodeClicked({ node: node });
    }

    tscope: ng.IScope;
    scope: any;

    constructor($scope) {
        this.scope = $scope;
        this.tscope = <ng.IScope>$scope;

        //whenever the graph changes, we have to build the lines abstraction again
        this.tscope.$watch('graph', this.buildLines.bind(this), true);
        this.tscope.$watch('selectedNode', function() {
            this.selectedNode = $scope.selectedNode;
        }, true);

        $scope.vm = this;
        this.graph = $scope.graph;
        this.buildLines();
    }

}
