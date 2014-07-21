/// <reference path="../model/_references.ts" />

interface ISampleListItem {
    name: string;
    url: string;
    state: any;
}

class PredefinedGraphsController {

    sampleList: ISampleListItem[] = [];

    constructor($scope, $http) {
        console.log("scope", $scope.vm);
        $scope.samplesvm = this;

        $http({ method: 'GET', url: 'Model/Samples/_list.json' })
            .success((obj) => {
                console.log("received sampleList!", obj);
                this.sampleList = <ISampleListItem[]>obj;

                _.forEach(this.sampleList, (item:ISampleListItem) => {

                    $http({ method: 'GET', url: 'Model/Samples/' + item.url,transformResponse : (stateString)=> { return JSON.parse(stateString, State.reviver); }})
                        .success((graph) => {
                            console.log("received graph for item!", graph, item);
                            item.state = graph;
                        })
                        .error(() => {
                            console.log("failed loading graph data for item.", item);
                        });
                });
            })
            .error(() => {
                console.log("failed getting data.");
            });
    }


}

var app = angular.module('SimulatorApp');
app.controller("PredefinedGraphsController", PredefinedGraphsController);