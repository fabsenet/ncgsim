angular.module('app.directives.ncgversion', [])
    .directive('ncgversion', function(): ng.IDirective {
        var directive: ng.IDirective = {
            restrict: 'A',
            scope: {
                graph: "=",
                hasBorder: "=",
                selectedNode: "=",
                nodeClicked: "&"
            },
            templateUrl: "version.txt",
        };

        return directive;
    });